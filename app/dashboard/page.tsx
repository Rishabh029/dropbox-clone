
import Dropzone from '@/components/Dropzone';
import TableWrapper from '@/components/table/TableWrapper';
import { db } from '@/firebase';
import { Filetype } from '@/typings';
import { auth } from '@clerk/nextjs'
import { collection, getDocs } from 'firebase/firestore';
import React from 'react'

async function Dashboard() {

    const { userId } = auth();

    const docsResult = await getDocs(collection(db, "users", userId!, "files"))

    const skeletonFiles: Filetype[] = docsResult.docs.map((doc) => ({
        id: doc.id,
        filename: doc.data().filename || doc.id,
        fullName: doc.data().fullName,
        timestamp: new Date (doc.data().timestamp?.seconds * 1000) || undefined, 
        downloadURL: doc.data().downloadURL,
        type: doc.data().type,
        size: doc.data().size
    }))

    return (
        <div className='border-t'>
            <Dropzone />

            <section className='container space-y-2'>
                <h2 className='font-bold'>All Files</h2>
                <div>
                    <TableWrapper skeletonFiles={skeletonFiles} />
                </div>
            </section>
        </div>
    )
}

export default Dashboard