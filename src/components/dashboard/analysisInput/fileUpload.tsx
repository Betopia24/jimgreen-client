'use client';

import React, { useState, useRef } from 'react';
import { Upload, FileText } from 'lucide-react';

export default function FileUpload() {
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            handleFile(files[0]);
        }
    };

    const handleFile = (file: File) => {
        const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
        const maxSize = 10 * 1024 * 1024; // 10MB

        if (!validTypes.includes(file.type)) {
            alert('Please upload a PDF, JPG, or PNG file');
            return;
        }

        if (file.size > maxSize) {
            alert('File size should not exceed 10MB');
            return;
        }

        setSelectedFile(file);
        console.log('File selected:', file.name);
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div>
            <div className="bg-white rounded-xl hover:shadow-sm p-6 border border-[#EBEBEB]">
                <h2 className="text-3xl font-medium text-[#101828] mb-6">
                    Import via OCR
                </h2>

                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`
              relative border-2 border-[#EBEBEB] rounded-xl p-12 text-center transition-all
              ${isDragging
                            ? 'border-blue-500 bg-[#F9FAFB]'
                            : 'border-gray-300 bg-[#F9FAFB]'
                        }
            `}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileSelect}
                        className="hidden"
                    />

                    <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-[#0058DD1A] rounded-full flex items-center justify-center">
                            <FileText className="w-8 h-8 text-[#0058DD]" />
                        </div>

                        <div>
                            <p className="text-2xl text-[#101828] font-medium mb-1">
                                Drop files here or click to upload
                            </p>
                            <p className="text-[16px] text-[#4A5565]">
                                Supports PDF, JPG, PNG up to 10MB
                            </p>
                        </div>

                        <button
                            onClick={handleUploadClick}
                            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#004AAD] hover:bg-[#004AAD] text-white text-[16px] font-medium rounded-lg cursor-pointer"
                        >
                            <Upload className="w-4 h-4" />
                            Upload File
                        </button>

                        {selectedFile && (
                            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                                <p className="text-sm text-green-700 font-medium">
                                    Selected: {selectedFile.name}
                                </p>
                                <p className="text-xs text-green-600 mt-1">
                                    Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}