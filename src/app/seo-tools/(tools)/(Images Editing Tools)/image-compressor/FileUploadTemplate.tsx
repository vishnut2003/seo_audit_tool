'use client';

import { Button } from "@/Components/ui/button";
import {
    FileUpload,
    FileUploadDropzone,
    FileUploadItem,
    FileUploadItemDelete,
    FileUploadItemMetadata,
    FileUploadItemPreview,
    FileUploadList,
    FileUploadTrigger,
} from "@/Components/ui/file-upload";
import { Upload, X } from "lucide-react";
import * as React from "react";

export function FileUploadTemplate({
    files,
    setError,
    setFiles,
}: {
    files: File[],
    setFiles: React.Dispatch<React.SetStateAction<File[]>>,
    setError: React.Dispatch<React.SetStateAction<string | null>>,
}) {

    const onFileReject = React.useCallback((file: File, message: string) => {
        setError(`${message} - "${file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name }" has been rejected`)
    }, [setError]);

    return (
        <FileUpload
            maxFiles={2}
            maxSize={5 * 1024 * 1024}
            value={files}
            onValueChange={setFiles}
            onFileReject={onFileReject}
            multiple
        >
            <FileUploadDropzone>
                <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center justify-center rounded-full border p-2.5">
                        <Upload className="size-6 text-muted-foreground" />
                    </div>
                    <p className="font-medium text-sm">Drag & drop files here</p>
                    <p className="text-muted-foreground text-xs">
                        Or click to browse (max 2 files, up to 5MB each)
                    </p>
                </div>
                <FileUploadTrigger asChild>
                    <Button variant="outline" size="sm" className="mt-2 w-fit">
                        Browse files
                    </Button>
                </FileUploadTrigger>
            </FileUploadDropzone>
            <FileUploadList>
                {files.map((file, index) => (
                    <FileUploadItem key={index} value={file}>
                        <FileUploadItemPreview />
                        <FileUploadItemMetadata />
                        <FileUploadItemDelete asChild>
                            <Button variant="ghost" size="icon" className="size-7">
                                <X />
                            </Button>
                        </FileUploadItemDelete>
                    </FileUploadItem>
                ))}
            </FileUploadList>
        </FileUpload>
    );
}