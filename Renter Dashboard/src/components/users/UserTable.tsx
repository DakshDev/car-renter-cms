"use client";

import React, { JSX, useEffect, useState } from "react";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { userColumns } from "./columns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { ChevronDown, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { UserType } from "@/types/User";

export default function RenterTable() {
  const [data, setData] = useState<UserType[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [tableLoading, setTableLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setTableLoading(true);
      try {
        const response = await axios.get("http://localhost:3001/api/users");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setTableLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const table = useReactTable({
    data,
    columns: userColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  const handleRowClick = async (renter: UserType): Promise<void> => {
    setIsModalOpen(true);
    setLoading(true);

    try {
      const resp = await axios.get(`http://localhost:3001/api/users/${renter._id}`);
      setUserDetails(resp.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
      setUserDetails(renter); // fallback
    } finally {
      setLoading(false);
    }
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
    setUserDetails(null);
  };

  const renderUserDetail = (
    label: string,
    value: string
  ): JSX.Element | null => {
    if (!value) return null;
    return (
      <div className='mb-3'>
        <dt className='text-sm font-medium text-gray-500 mb-1'>{label}</dt>
        <dd className='text-sm text-gray-900'>{value}</dd>
      </div>
    );
  };

  return (
    <>
      <div className='flex items-center justify-between py-4'>
        <div className='flex items-center space-x-2'>
          <Input
            placeholder='Filter by email...'
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={(e) =>
              table.getColumn("email")?.setFilterValue(e.target.value)
            }
            className='max-w-sm border'
          />
          <Input
            placeholder='Filter by name...'
            value={(table.getColumn("fullName")?.getFilterValue() as string) ?? ""}
            onChange={(e) =>
              table.getColumn("fullName")?.setFilterValue(e.target.value)
            }
            className='max-w-sm border'
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline'>
              Columns <ChevronDown className='ml-2 h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {table
              .getAllColumns()
              .filter((col) => col.getCanHide())
              .map((col) => (
                <DropdownMenuCheckboxItem
                  key={col.id}
                  checked={col.getIsVisible()}
                  onCheckedChange={(val) => col.toggleVisibility(!!val)}
                >
                  {col.id === "fullName"
                    ? "Full Name"
                    : col.id === "phoneNumber"
                    ? "Phone Number"
                    : col.id === "shopName"
                    ? "Shop Name"
                    : col.id === "createdAt"
                    ? "Created"
                    : col.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className='w-full overflow-auto rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
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
            {tableLoading ? (
              <TableRow>
                <TableCell colSpan={userColumns.length} className='text-center py-10'>
                  Loading users...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  onClick={() => handleRowClick(row.original)}
                  key={row.id}
                  className='cursor-pointer hover:bg-gray-50'
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={userColumns.length}
                  className='h-24 text-center'
                >
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className='flex items-center justify-between py-4'>
        <div className='text-sm text-gray-500'>
          Showing {table.getRowModel().rows.length} of {data.length} Users
        </div>
        <div className='flex items-center space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>

      <Dialog
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      >
        <DialogContent className='max-w-2xl max-h-[80vh] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle className='text-xl font-semibold'>
              User Details
            </DialogTitle>
            <DialogClose
              onClick={closeModal}
              className='absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground'
            >
              <X className='h-4 w-4' />
              <span className='sr-only'>Close</span>
            </DialogClose>
          </DialogHeader>

          <div className='mt-4'>
            {loading ? (
              <div className='flex items-center justify-center py-8'>
                <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900'></div>
                <span className='ml-2'>Loading user details...</span>
              </div>
            ) : userDetails ? (
              <dl className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {renderUserDetail("Full Name", userDetails.fullName)}
                {renderUserDetail("Email", userDetails.email)}
                {renderUserDetail("Phone Number", userDetails.phoneNumber)}
                {renderUserDetail("Area", userDetails.area)}
                {renderUserDetail("Role", userDetails.role)}
                {renderUserDetail("Identity Number", userDetails.cnic)}
                {renderUserDetail("User ID", userDetails._id)}
                {Object.entries(userDetails).map(([key, value]) => {
                  const renderedFields = [
                    "fullName",
                    "email",
                    "password",
                    "phoneNumber",
                    "shopName",
                    "shopAddress",
                    "cnic",
                    "area",
                    "role",
                    "_id",
                  ];
                  if (renderedFields.includes(key) || !value) return null;

                  return (
                    <div
                      key={key}
                      className='mb-3'
                    >
                      <dt className='text-sm font-medium text-gray-500 mb-1 capitalize'>
                        {key.replace(/([A-Z])/g, " $1").replace(/^./, (str: string) => str.toUpperCase())}
                      </dt>
                      <dd className='text-sm text-gray-900'>
                        {typeof value === "object"
                          ? JSON.stringify(value, null, 2)
                          : String(value)}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            ) : (
              <div className='text-center py-8 text-gray-500'>
                No user details available
              </div>
            )}
          </div>

          <div className='flex justify-end mt-6 pt-4 border-t'>
            <Button
              onClick={closeModal}
              variant='outline'
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
