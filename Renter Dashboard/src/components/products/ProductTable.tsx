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
import { productColumns } from "./columns";
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
import { ProductType } from "@/types/Product";

export default function ProductTable() {
  const [data, setData] = useState<ProductType[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [productDetails, setProductDetails] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [tableLoading, setTableLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setTableLoading(true);
      try {
        const response = await axios.get("http://localhost:3001/api/products");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setTableLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const table = useReactTable({
    data,
    columns: productColumns,
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

  const handleRowClick = (product: ProductType): void => {
    setProductDetails(product);
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
    setProductDetails(null);
  };

  const renderDetail = (label: string, value?: string): JSX.Element | null => {
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
            placeholder='Filter by name...'
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(e) => table.getColumn("name")?.setFilterValue(e.target.value)}
            className='max-w-sm border'
          />
          <Input
            placeholder='Filter by location...'
            value={(table.getColumn("location")?.getFilterValue() as string) ?? ""}
            onChange={(e) => table.getColumn("location")?.setFilterValue(e.target.value)}
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
                  {col.id}
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
                <TableCell colSpan={productColumns.length} className='text-center py-10'>
                  Loading products...
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
                <TableCell colSpan={productColumns.length} className='h-24 text-center'>
                  No products found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className='flex items-center justify-between py-4'>
        <div className='text-sm text-gray-500'>
          Showing {table.getRowModel().rows.length} of {data.length} Products
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

      <Dialog open={isModalOpen} onOpenChange={closeModal}>
        <DialogContent className='sm:max-w-2xl'>
          <DialogHeader>
            <DialogTitle className='text-xl font-semibold'>
              Product Details
            </DialogTitle>
            <DialogClose asChild>
              <button className='absolute top-4 right-4'><X className='h-5 w-5' /></button>
            </DialogClose>
          </DialogHeader>
          {productDetails && (
            <div className='mt-4'>
              <dl className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {renderDetail("Product Name", productDetails.name)}
                {renderDetail("Category", productDetails.category)}
                {renderDetail("Description", productDetails.description)}
                {renderDetail("Location", productDetails.location)}
                {renderDetail("Time Period", productDetails.timePeriod)}
                {renderDetail("Price", productDetails.price.toString())}
                {renderDetail("Created", new Date(productDetails.createdAt).toLocaleString())}
                {renderDetail("Product ID", productDetails._id)}
              </dl>
              {productDetails.image && (
                <div className='mt-4'>
                  <img
                    src={`http://localhost:3001/uploads/${productDetails.image}`}
                    alt='product'
                    className='w-full h-auto rounded-md border'
                  />
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
