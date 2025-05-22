import DashboardLayout from "@/components/layout/DashboarLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PdfPreview from "@/components/upload-pdf/PdfPreview";
import { UserPdfUploader } from "@/components/upload-pdf/UserPdfUploader";

const ResumePage = () => {
  return (
    <DashboardLayout>
      <div className="mt-8 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>
              <h3 className="font-bold">Resume</h3>
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-8 flex flex-col gap-8">
            <UserPdfUploader />
            <PdfPreview />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ResumePage;
