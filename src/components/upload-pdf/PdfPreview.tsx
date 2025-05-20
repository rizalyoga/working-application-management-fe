import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  FileWarning,
  RefreshCcw,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import useProfileUserStore from "@/stores/useProfileStore";

// IMPORTANT: Fix for PDF.js worker
// 1. Import the worker directly
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

// 2. Set up worker correctly with explicit version - use EXACT same version as in your package.json
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js`;

interface PdfPreviewProps {
  className?: string;
}

const PdfPreview: React.FC<PdfPreviewProps> = ({ className }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [useDirectEmbed, setUseDirectEmbed] = useState<boolean>(false);
  const userProfileStore = useProfileUserStore();
  const { resume_url } = userProfileStore;

  useEffect(() => {
    // Reset states when URL changes
    if (resume_url) {
      setIsLoading(true);
      setError(null);

      // For Supabase URLs, make sure to add download=true
      let processedUrl = resume_url;
      if (
        processedUrl.includes("supabase") &&
        !processedUrl.includes("download=")
      ) {
        const separator = processedUrl.includes("?") ? "&" : "?";
        processedUrl = `${processedUrl}${separator}download=true`;
      }

      setPdfUrl(processedUrl);

      // Log for debugging
      console.log("Processing PDF URL:", processedUrl);
    }
  }, [resume_url]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false);
    setError(null);
    console.log("PDF loaded successfully with", numPages, "pages");
  };

  const onDocumentLoadError = (error: Error) => {
    console.error("Error loading PDF:", error);
    setIsLoading(false);
    setError(
      `Unable to load PDF: ${error.message}. Please ensure the file is accessible.`
    );

    // Automatically switch to direct embed on error
    if (!useDirectEmbed) {
      console.log("Switching to direct embed mode");
      setUseDirectEmbed(true);
    }
  };

  const goToPreviousPage = () => {
    setPageNumber((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber((prevPage) => Math.min(prevPage + 1, numPages));
  };

  const handleRetry = () => {
    setIsLoading(true);
    setError(null);
    setUseDirectEmbed(false);

    // Force a cache reset by adding timestamp
    const timestamp = new Date().getTime();
    const separator = resume_url.includes("?") ? "&" : "?";
    const urlWithTimestamp = `${resume_url}${separator}t=${timestamp}`;

    setPdfUrl(urlWithTimestamp);
    console.log("Retrying with URL:", urlWithTimestamp);
  };

  const toggleViewMode = () => {
    setUseDirectEmbed(!useDirectEmbed);
    setError(null);
  };

  // Open PDF in new tab
  const openPdfInNewTab = () => {
    if (resume_url) {
      window.open(resume_url, "_blank");
    }
  };

  if (!resume_url) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center p-8 bg-gray-100 rounded-lg mx-5",
          className
        )}
      >
        <FileWarning className="h-12 w-12 text-gray-400 mb-4 " />
        <p className="text-gray-600">No PDF file available.</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center space-y-4 mx-2 md:mx-0",
        className
      )}
    >
      {/* PDF Viewer Options */}
      <div className="w-full max-w-6xl flex justify-between items-center mb-2 ">
        <Button
          onClick={openPdfInNewTab}
          variant="ghost"
          size="sm"
          className="flex items-center gap-1 text-blue-600"
        >
          <ExternalLink className="h-4 w-4" /> Open in New Tab
        </Button>

        <Button onClick={toggleViewMode} variant="outline" size="sm">
          {useDirectEmbed ? "Use PDF.js Viewer" : "Use Browser Embed"}
        </Button>
      </div>

      {/* PDF Container */}
      <div className="relative w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden">
        {isLoading && !useDirectEmbed && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50 rounded-lg z-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {error && !useDirectEmbed ? (
          <div className="p-4 text-center">
            <FileWarning className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-500 mb-4">{error}</p>
            <div className="flex flex-col gap-2 items-center">
              <Button
                onClick={handleRetry}
                variant="outline"
                className="flex items-center gap-2"
              >
                <RefreshCcw className="h-4 w-4" />
                Try Again
              </Button>

              <Button
                onClick={toggleViewMode}
                variant="secondary"
                className="flex items-center gap-2"
              >
                Try Browser Embed
              </Button>

              <Button
                onClick={openPdfInNewTab}
                variant="link"
                className="text-blue-600"
              >
                Open PDF Directly
              </Button>
            </div>
          </div>
        ) : useDirectEmbed ? (
          // Direct browser embedding using object tag for better PDF handling
          <object
            data={resume_url}
            type="application/pdf"
            className="w-full md:h-[900px] lg:h-[1024px]"
            // style={{ height: "1024px" }}
          >
            <p className="text-center mt-[50%]">
              Your browser does not support embedded PDFs.
              <a
                href={resume_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 ml-1"
              >
                Click here to open the PDF
              </a>
            </p>
          </object>
        ) : (
          // React-PDF viewer
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            className="flex justify-center"
            options={{
              cMapUrl:
                "https://cdnjs.cloudflare.com/ajax/libs/pdfjs-dist/3.4.120/cmaps/",
              cMapPacked: true,
              standardFontDataUrl:
                "https://cdnjs.cloudflare.com/ajax/libs/pdfjs-dist/3.4.120/standard_fonts/",
            }}
          >
            <Page
              pageNumber={pageNumber}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className="max-w-full"
              scale={1}
            />
          </Document>
        )}
      </div>

      {/* Page Navigation */}
      {numPages > 1 && !error && !useDirectEmbed && (
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={goToPreviousPage}
            disabled={pageNumber <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <span className="text-sm">
            Page {pageNumber} of {numPages}
          </span>

          <Button
            variant="outline"
            size="icon"
            onClick={goToNextPage}
            disabled={pageNumber >= numPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default PdfPreview;
