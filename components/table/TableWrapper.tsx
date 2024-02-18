'use client'

import { Filetype } from '@/typings'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/table/Table'
import { columns } from '@/components/table/Columns'
import { useUser } from '@clerk/nextjs'
import { collection, orderBy, query } from 'firebase/firestore'
import { db } from '@/firebase'
import { useCollection } from 'react-firebase-hooks/firestore';
import { Skeleton } from '@/components/ui/skeleton'

function TableWrapper({ skeletonFiles }: { skeletonFiles: Filetype[] }) {

    const { user } = useUser();
    const [initialFiles, setInitalFiles] = useState<Filetype[]>([]);
    const [sort, useSort] = useState<"asc" | "desc">("desc");

    const [docs, loading, error] = useCollection(
        user && query(
            collection(db, "users", user.id, "files"),
            orderBy("timestamp", sort)
        )
    )

    useEffect(() => {
        if (!docs) return;

        const files: Filetype[] = docs.docs.map((doc) => ({
            id: doc.id,
            filename: doc.data().filename || doc.id,
            fullName: doc.data().fullName,
            timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
            downloadURL: doc.data().downloadURL,
            type: doc.data().type,
            size: doc.data().size
        }));

        setInitalFiles(files);
    }, [docs])

    if (docs?.docs.length === undefined) {
        return (
            <div className='flex flex-col'>
                <Button variant={'outline'} className='ml-auto w-36 h-10 mb-5'>
                    <Skeleton className='h-5 w-full'></Skeleton>
                </Button>

                <div className='border rounded-lg'>
                    <div className='border-b h-12'>
                        {skeletonFiles.map((file) => (
                            <div key={file.id} className='flex items-center space-x-4 p-5 w-full'>
                                <Skeleton className='h-12 w-12 mt-16'></Skeleton>
                                <Skeleton className='h-12 w-full'></Skeleton>
                            </div>
                        ))}
                        {skeletonFiles.length === 0 && (
                            <div className='flex space-x-4 p-5 w-full items-center'>
                                <Skeleton className='h-12 w-12'></Skeleton>
                                <Skeleton className='h-12 w-full'></Skeleton>
                                <Skeleton className='h-12 w-full'></Skeleton>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className='flex flex-col space-y-5 pb-10'>
            <Button variant={'outline'} className='w-fit ml-auto'
                onClick={() => {
                    useSort(sort === "desc" ? "asc" : "desc")
                }}
            >Sort By {sort === "desc" ? "Newest" : "Oldest"}</Button>
            <DataTable columns={columns} data={initialFiles} />
        </div>
    )
}

export default TableWrapper