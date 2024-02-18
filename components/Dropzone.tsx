'use client'

import { db, storage } from '@/firebase';
import { cn } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';
import { addDoc, collection, doc, serverTimestamp, snapshotEqual, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react'
import DropzoneComponent from 'react-dropzone'
import toast from 'react-hot-toast';

function Dropzone() {

  const [loading, setLoading] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();
  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader()
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = async () => {
        await uploadPost(file);
      }
      reader.readAsArrayBuffer(file)
    })

  }

  const uploadPost = async (selectedFile: File) => {
    if (loading) return;
    if (!user) return;

    const toastId = toast.loading("Uploading...")
    setLoading(true);

    const docRef = await addDoc(collection(db, "users", user.id, "files"), {
      userId: user.id,
      filename: selectedFile.name,
      fullName: user.fullName,
      type: selectedFile.type,
      timestamp: serverTimestamp(),
      size: selectedFile.size,
      profileImg: user.imageUrl,
    })


    const imageRef = ref(storage, `users/${user.id}/files/${docRef.id}`);


    await uploadBytes(imageRef, selectedFile).then(async (snapshot) => {
      const downloadURL = await getDownloadURL(imageRef);

      await updateDoc(doc(db, "users", user.id, "files", docRef.id), {
        downloadURL: downloadURL,
      });
    })


    setLoading(false);
    toast.success("File uploaded successfully", {
      id: toastId,
  })

  }
  const maxSize = 20971520;

  return (
    <DropzoneComponent minSize={0} maxSize={maxSize} onDrop={onDrop}>
      {({ getRootProps, getInputProps, isDragActive, isDragReject, fileRejections }) => {
        const isFileTooLarge = fileRejections.length > 0 && fileRejections[0].file.size > maxSize;
        return (
          <section className='m-4'>
            <div {...getRootProps()} className={cn(
              'w-full h-32 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center',
              isDragActive ? 'bg-blue-500 animate-pulse' : 'bg-slate-200/50 text-slate-600 dark:bg-slate-800/80 dark:text-slate-200',
            )}>
              <input {...getInputProps()} />
              {!isDragActive && 'Click here or drop files here to upload'}
              {isDragActive && !isDragReject && 'Drop to Upload the file here'}
              {isDragReject && 'File type is not accepted'}
              {isFileTooLarge && 'Click here or drop files here to upload'}

            </div>
          </section>
        )
      }}
    </DropzoneComponent>
  )
}

export default Dropzone