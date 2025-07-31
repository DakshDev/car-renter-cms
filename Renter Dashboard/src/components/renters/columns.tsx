"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RenterType } from "@/types/Renters";
export const userColumns: ColumnDef<RenterType>[] = [
  {
    accessorKey: "fullName",
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Full Name
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
    cell: ({ row }) => (
      <div className='font-medium'>{row.getValue("fullName")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
    cell: ({ row }) => <div className='lowercase'>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
    cell: ({ row }) => (
      <div className='font-mono'>{row.getValue("phoneNumber")}</div>
    ),
  },
  {
    accessorKey: "shopName",
    header: "Shop Name",
    cell: ({ row }) => (
      <div className='max-w-[200px] truncate'>{row.getValue("shopName")}</div>
    ),
  },
  {
    accessorKey: "cnic",
    header: "CNIC",
    cell: ({ row }) => (
      <div className='font-mono text-sm'>{row.getValue("cnic")}</div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <div className='capitalize bg-gray-100 px-2 py-1 rounded-full text-xs inline-block'>
        {row.getValue("role")}
      </div>
    ),
  },
];
