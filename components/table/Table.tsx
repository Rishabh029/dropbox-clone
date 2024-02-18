"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { FileType, PencilIcon, TrashIcon } from "lucide-react"
import { Filetype } from "@/typings"
import { useAppStore } from "@/store/store"
import { DeleteModal } from '@/components/DeleteModal'
import { RenameModel } from "../RenameModal"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })


    const [setIsDeleteModalOpen, setFileId, setFilename, setIsRenameModalOpen] =
    useAppStore((state) => [
      state.setIsDeleteModalOpen,
      state.setFileId,
      state.setFilename,
      state.setIsRenameModalOpen,
    ]);

    const openDeleteModal = (fileId: string) => {
        setFileId(fileId);
        setIsDeleteModalOpen(true);
    }

    const openRenameModal = (fileId: string , filename : string) => {
        setFileId(fileId);
        setFilename(filename);
        setIsRenameModalOpen(true);
    }

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                <DeleteModal/>
                                <RenameModel/>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {cell.column.id === "timestamp" ? (
                                            <div className="fex flex-col">
                                                <div className="text-sm font-medium">
                                                    {(cell.getValue() as Date).toLocaleDateString()}
                                                </div>
                                                <div className="text-xs font-medium text-gray-900 dark:text-gray-300">
                                                    {(cell.getValue() as Date).toLocaleTimeString()}
                                                </div>
                                            </div>
                                        ) : cell.column.id === "filename" ? (
                                            <p
                                            onClick={
                                                () => {
                                                    openRenameModal((row.original as Filetype).id, (row.original as Filetype).filename)
                                                }
                                            }
                                            className="underline flex items-center text-blue-500 hover:text-blue-600 transition-all duration-150 hover:cursor-pointer">
                                                {cell.getValue() as string}{""}
                                                <PencilIcon size={15} className="ml-2 w-full" />
                                            </p>
                                        )
                                        : (
                                            flexRender(cell.column.columnDef.cell, cell.getContext())
                                        )}
                                    </TableCell>
                                ))}

                                <TableCell key={(row.original as Filetype).id}>
                                    <Button variant={'outline'}
                                        onClick={() => {
                                            openDeleteModal((row.original as Filetype).id);
                                        }}>
                                        <TrashIcon size={20}></TrashIcon>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                You have no files.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
