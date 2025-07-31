import React from "react";
import ProductTable from "@/components/products/ProductTable";

const Products = () => {
  return (
    <div className='max-w-7xl mx-auto p-4'>
      <div className='mb-4'>
        <h1 className='text-2xl font-bold'>Product Management</h1>
        <p className='text-gray-600'>Manage and view all registered products</p>
      </div>

      <ProductTable/>
    </div>
  );
};

export default Products;
