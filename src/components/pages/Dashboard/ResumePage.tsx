import DashboardLayout from "@/components/layout/DashboarLayout";
import { Card } from "@/components/ui/card";
import PdfPreview from "@/components/upload-pdf/PdfPreview";
import { UserPdfUploader } from "@/components/upload-pdf/UserPdfUploader";

const ResumePage = () => {
  return (
    <DashboardLayout>
      <div className="mt-8 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Card>
          <h3 className="font-bold ml-6">Resume</h3>
          <UserPdfUploader />
          <span className="mt-8">
            <PdfPreview />
          </span>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ResumePage;
