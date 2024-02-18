"use client"

import { Filetype } from "@/typings"
import { ColumnDef } from "@tanstack/react-table"
import { FileIcon , FileIconProps, defaultStyles } from "react-file-icon"
import prettyBytes from "pretty-bytes"
import { COLOR_EXTENSION_MAP } from "@/constant"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export const columns: ColumnDef<Filetype>[] = [
    {
        accessorKey: "type",
        header: "Type",
        cell: ({ renderValue, ...props }) => {
            const type = renderValue() as string;
            const extension:string = type.split("/")[1];

            return <div className="w-12">
                <FileIcon
                    
                    extension={extension}
                    labelColor={COLOR_EXTENSION_MAP[extension]}
                    //@ts-ignore
                    {...defaultStyles[extension]}

                />
            </div>
        }
    },
    {
        accessorKey: "filename",
        header: "File Name",
    },
    {
        accessorKey: "timestamp",
        header: "Date Added",
    },
    {
        accessorKey: "size",
        header: "Size",
        cell: ({ renderValue, ...props }) => {
            return <span>{prettyBytes(renderValue() as number)}</span>
        }
    },
    {
        accessorKey: "downloadURL",
        header: "Link",
        cell: ({ renderValue, ...props }) => {
            return <a
                href={renderValue() as string}
                target='_blank'
                className="underline text-blue-500 hover:text-blue-600 transition-all duration-150"
            >Download</a>
        }
    },
]
