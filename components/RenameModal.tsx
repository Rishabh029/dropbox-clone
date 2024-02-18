"use client"

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { db, storage } from "@/firebase";
import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

import { useState } from "react";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
// import { Label } from "@/Components/ui/label"

export function RenameModel() {

    const { user } = useUser();
    const [input, setInput] = useState<string>("");
    const [isRenameModalOpen, setIsRenameModalOpen, fileId, filename] =
        useAppStore((state) => [
            state.isRenameModalOpen,
            state.setIsRenameModalOpen,
            state.fileId,
            state.filename,
        ]);


    const renameFile = async() => {
        if (!user || !fileId) return;
        if (!input) return;

        const toastId = toast.loading("Remaining...")

        const fileRef = ref(storage, `users/${user.id}/files/${filename}`);
        try {

            await updateDoc(doc(db, "users", user.id, "files", fileId), {
                filename: input,
            }).finally(() => {
                setInput("");
                setIsRenameModalOpen(false);
                toast.success("File renamed successfully", {
                    id: toastId,
                })
            })
            
        } catch (error) {
            console.error("Error renaming the file:", error);
        }
    }

    return (
        <Dialog
            open={isRenameModalOpen}
            onOpenChange={(isOpen) => setIsRenameModalOpen(isOpen)}
        >

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Rename the file</DialogTitle>
                    <Input defaultValue={filename} id="link" onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                renameFile();
                            }
                        }}
                    />
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <Button size="sm" className="px-3 flex-1" type="submit" variant="ghost" onClick={() => setIsRenameModalOpen(false)}>
                        <span className="sr-only">Cancel</span>
                        <span>Cancel</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="px-3 flex-1 bg-blue-500 bg-blend-color-burn" onClick={() => renameFile()}   >
                        <span className="sr-only">Done</span>
                        <span>Done</span>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
