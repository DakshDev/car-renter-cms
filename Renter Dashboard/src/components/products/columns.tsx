"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductType } from "@/types/Product";

export const productColumns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
    cell: ({ row }) => <div className='font-medium'>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Category
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
    cell: ({ row }) => <div className='capitalize'>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => (
      <div className='font-mono'>{row.getValue("location")}</div>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <div className='font-mono text-sm'>Rs. {row.getValue("price")}</div>
    ),
  },
  {
    accessorKey: "timePeriod",
    header: "Duration",
    cell: ({ row }) => (
      <div className='bg-gray-100 px-2 py-1 rounded-full text-xs inline-block'>
        {row.getValue("timePeriod")}
      </div>
    ),
  },
];
