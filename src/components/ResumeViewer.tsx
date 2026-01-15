'use client';

import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface ResumeViewerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ResumeViewer({ isOpen, onClose }: ResumeViewerProps) {
    const [numPages, setNumPages] = useState<number | null>(null);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
    }

    if (!isOpen) return null;

    return (
        <div className="h-full flex flex-col bg-card">
            <div className="flex items-center justify-between p-4 border-b border-border bg-background flex-shrink-0">
                <div className="flex items-center gap-3">
                    <h2 className="text-lg font-semibold">Resume</h2>
                    <a href="/resume.pdf" download className="text-xs text-primary hover:underline">Download PDF</a>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 rounded-md hover:bg-muted/10 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Close resume"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>

            <div className="flex-1 bg-muted/20 p-4 overflow-y-auto flex justify-center">
                <Document
                    file="/resume.pdf"
                    onLoadSuccess={onDocumentLoadSuccess}
                    className="flex flex-col gap-4"
                    loading={<div className="text-sm text-muted-foreground">Loading Resume...</div>}
                >
                    {Array.from(new Array(numPages), (el, index) => (
                        <Page
                            key={`page_${index + 1}`}
                            pageNumber={index + 1}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                            className="shadow-lg rounded-sm overflow-hidden border border-border/50"
                            width={600} // Fixed width or dynamic? Let's start with reasonable desktop width
                        />
                    ))}
                </Document>
            </div>
        </div>
    );
}
