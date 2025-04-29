import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { JobApplication } from "@/types/API-types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVerticalIcon } from "lucide-react";

const JobApplicationTable = ({
  data,
}: {
  data: JobApplication[] | undefined;
}) => {
  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "apply":
        return "bg-lime-500";
      case "screening":
        return "bg-blue-400";
      case "interview hr":
        return "bg-sky-400";
      case "interview hr ii":
        return "bg-sky-400";
      case "interview user":
        return "bg-purple-400";
      case "interview user ii":
        return "bg-purple-400";
      case "interview C Level":
        return "bg-orange-400";
      case "interview C Level II":
        return "bg-orange-500";
      case "reject":
        return "bg-red-400";
      case "success":
        return "bg-emerald-500";
      default:
        return "outline";
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Applications</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-muted">
            <TableRow>
              <TableHead className="text-center">No</TableHead>
              <TableHead className="text-center">Application Date</TableHead>
              <TableHead className="text-center">Job Position</TableHead>
              <TableHead className="text-center">Company</TableHead>
              <TableHead className="text-center">Job Portal</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Notes</TableHead>
              <TableHead className="text-center"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((application, idx) => (
              <TableRow key={application.id}>
                <TableCell className="text-center">{idx + 1}</TableCell>
                <TableCell className="text-center">
                  {formatDate(application.application_date)}
                </TableCell>
                <TableCell>{application.job_position}</TableCell>
                <TableCell>{application.company_name}</TableCell>
                <TableCell className="text-center">
                  {application.job_portal}
                </TableCell>
                <TableCell className="text-center">
                  <Badge className={getStatusVariant(application.status)}>
                    {application.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  {application.notes}
                </TableCell>
                <TableCell className="text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
                        size="icon"
                      >
                        <MoreVerticalIcon />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-32">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Make a copy</DropdownMenuItem>
                      <DropdownMenuItem>Favorite</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {data?.length === 0 && (
          <div className="text-center py-4">No applications found</div>
        )}
      </CardContent>
    </Card>
  );
};

export default JobApplicationTable;
