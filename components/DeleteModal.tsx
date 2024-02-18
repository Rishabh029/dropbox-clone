"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { db, storage } from "@/firebase";
import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import toast from "react-hot-toast";
// import { Input } from "@/Components/ui/input"
// import { Label } from "@/Components/ui/label"

export function DeleteModal() {

    const { user } = useUser();
    const [isDeleteModalOpen, setIsDeleteModalOpen, fileId, setFileId] =
        useAppStore((state) => [
            state.isDeleteModalOpen,
            state.setIsDeleteModalOpen,
            state.fileId,
            state.setFileId,
        ]);
    async function deleteFile() {
        if (!user || !fileId) return;

        const toastId = toast.loading("Remaining...")
        const fileRef = ref(storage, `users/${user.id}/files/${fileId}`);
        try {
            deleteObject(fileRef).then(async () => {
                console.log("File deleted successfully");
                deleteDoc(doc(db, "users", user.id, "files", fileId))
                .finally(() => {
                    setIsDeleteModalOpen(false);
                    toast.success("File Deleted successfully", {
                        id: toastId,
                    })
                })
                
            })
        } catch (error) {
            console.error("Error deleting file:", error);
        }

        // setIsDeleteModalOpen(false);
    }

    return (
        <Dialog
            open={isDeleteModalOpen}
            onOpenChange={(isOpen) => setIsDeleteModalOpen(isOpen)}
        >
           
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Are You Sure Want To Delete It?</DialogTitle>
                    <DialogDescription>
                        Be Careful - This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <Button size="sm" className="px-3 flex-1" type="submit" variant="destructive" onClick={() => deleteFile()}>
                        <span className="sr-only">Delete</span>
                        <span>Delete</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="px-3 flex-1" onClick={() => setIsDeleteModalOpen(false)}   >
                        <span className="sr-only">Cancel</span>
                        <span>Cancel</span>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
