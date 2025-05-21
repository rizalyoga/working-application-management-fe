import { useState } from "react";
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
import { capitalizeFirstChar, formatDate } from "@/lib/utils";
import {
  JobApplication,
  JobApplicationTableProps,
} from "@/types/job-application-types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  ArrowDownIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
  ExternalLink,
  MoreVerticalIcon,
} from "lucide-react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel, // Tambahkan ini
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";
import { getStatusVariant, STATUS_OPTIONS } from "@/lib/helper-table";
import JobApplicationForm from "../forms/AppllicationForm";
import DeleteModal from "../modals/DeleteModal";
import DetailApplicationModal from "../modals/DetailApplicationModal";
import EditJobApplicationForm from "../forms/EditApplicationForm";
import { Link } from "react-router";

// Komponen utama
const JobApplicationTable = ({
  data,
  statusFilter,
  onStatusChange,
}: JobApplicationTableProps) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [detailApplicationModalOpen, setdetailApplicationModalOpen] =
    useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [sorting, setSorting] = useState<SortingState>([
    { id: "application_date", desc: true }, // Default: terbaru pertama
  ]);

  const columns: ColumnDef<JobApplication>[] = [
    {
      accessorKey: "index",
      header: "No",
      cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
      enableGlobalFilter: false,
    },
    {
      accessorKey: "application_date",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="mx-auto"
        >
          Application Date
          {column.getIsSorted() === "asc" ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDownIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-center">
          {formatDate(row.getValue("application_date"))}
        </div>
      ),
      enableSorting: true,
      sortingFn: "datetime",
    },
    {
      accessorKey: "job_position",
      header: "Job Position",
      cell: ({ row }) => (
        <div className="w-[150px] text-wrap">
          {row.getValue("job_position")}
        </div>
      ),
    },
    {
      accessorKey: "company_name",
      header: "Company",
      cell: ({ row }) => (
        <div className="w-[150px] text-center text-wrap">
          {row.getValue("company_name")}
        </div>
      ),
    },
    {
      accessorKey: "job_portal",
      header: "Job Portal",
      enableGlobalFilter: true,
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("job_portal")}</div>
      ),
    },
    {
      accessorKey: "job_url",
      header: "Job Link",
      cell: ({ row }) => (
        <div className="overflow-hidden text-center">
          {row.getValue("job_url") ? (
            <Link
              target="_blank"
              to={row.getValue("job_url")}
              className="text-blue-600 hover:text-blue-400"
            >
              <ExternalLink className="mx-auto" size={20} />
            </Link>
          ) : (
            "-"
          )}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="text-center">
          <Badge
            className={`rounded-sm ${getStatusVariant(row.getValue("status"))}`}
          >
            {capitalizeFirstChar(row.getValue("status"))}
          </Badge>
        </div>
      ),
    },
    {
      accessorKey: "notes",
      header: "Notes",
      cell: ({ row }) => (
        <div className="w-[100px] text-center overflow-hidden truncate">
          {row.getValue("notes")}
        </div>
      ),
    },
    {
      id: "id",
      accessorKey: "id",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex justify-center items-center">
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
              <DropdownMenuItem
                onSelect={() => {
                  setSelectedJobId(row.getValue("id"));
                  setdetailApplicationModalOpen(true);
                }}
              >
                Detail
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => {
                  setSelectedJobId(row.getValue("id"));
                  setEditModalOpen(true);
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={() => {
                  setSelectedJobId(row.getValue("id"));
                  setDeleteModalOpen(true);
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
      enableGlobalFilter: false,
    },
  ];

  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      globalFilter,
      sorting,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(), // Tambahkan ini
    onGlobalFilterChange: setGlobalFilter,
    initialState: {
      pagination: {
        pageSize: 15,
      },
    },
  });

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Job Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex justify-between items-center flex-col gap-4 md:flex-row">
            <Input
              placeholder="Search by job position / job portal..."
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="md:max-w-sm"
            />
            <span className="flex gap-2 justify-between w-full md:justify-end">
              <JobApplicationForm />
              <Select value={statusFilter} onValueChange={onStatusChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((status, idx) => {
                    const key = Object.keys(status)[0];
                    const value = Object.values(status)[0];
                    return (
                      <SelectItem key={idx} value={value.toString()}>
                        {key === "All" ? "All Statuses" : key}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </span>
          </div>
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-muted">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="text-center">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {data?.length === 0 && (
            <div className="text-center py-4">No applications found</div>
          )}
          {data && data.length > 0 && (
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium">Rows per page</p>
                <Select
                  value={`${table.getState().pagination.pageSize}`}
                  onValueChange={(value) => {
                    table.setPageSize(Number(value));
                  }}
                >
                  <SelectTrigger className="h-8 w-[70px]">
                    <SelectValue
                      placeholder={table.getState().pagination.pageSize}
                    />
                  </SelectTrigger>
                  <SelectContent side="top">
                    {[5, 10, 15, 20, 25].map((pageSize) => (
                      <SelectItem key={pageSize} value={`${pageSize}`}>
                        {pageSize}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  className="hidden size-8 p-0 lg:flex"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className="sr-only">Go to first page</span>
                  <RxDoubleArrowLeft className="size-4" />
                </Button>
                <Button
                  variant="outline"
                  className="size-8 p-0"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className="sr-only">Go to previous page</span>
                  <ChevronLeftIcon className="size-4" />
                </Button>
                <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                  Page {table.getState().pagination.pageIndex + 1} of{" "}
                  {table.getPageCount()}
                </div>
                <Button
                  variant="outline"
                  className="size-8 p-0"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <span className="sr-only">Go to next page</span>
                  <ChevronRightIcon className="size-4" />
                </Button>
                <Button
                  variant="outline"
                  className="hidden size-8 p-0 lg:flex"
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                >
                  <span className="sr-only">Go to last page</span>
                  <RxDoubleArrowRight className="size-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      {selectedJobId && (
        <DeleteModal
          jobApplicationId={selectedJobId}
          isOpen={deleteModalOpen}
          onClose={() => {
            setDeleteModalOpen(false);
            setSelectedJobId(null);
          }}
        />
      )}
      {selectedJobId && (
        <DetailApplicationModal
          jobApplicationId={selectedJobId}
          isOpen={detailApplicationModalOpen}
          onClose={() => {
            setdetailApplicationModalOpen(false);
            setSelectedJobId(null);
          }}
        />
      )}
      {selectedJobId && (
        <EditJobApplicationForm
          jobApplicationId={selectedJobId}
          isOpen={editModalOpen}
          onClose={() => {
            setEditModalOpen(false);
            setSelectedJobId(null);
          }}
        />
      )}
    </>
  );
};

export default JobApplicationTable;
