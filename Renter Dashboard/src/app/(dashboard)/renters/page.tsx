import RenterTable from "@/components/renters/RenterTable";

const Renter = () => {
  return (
    <div className='max-w-7xl mx-auto p-4'>
      <div className='mb-4 flex justify-between'>
        <div>
          <h1 className='text-2xl font-bold'>Renter Management</h1>
          <p className='text-gray-600'>Manage and view all registered renters</p>
        </div>
        <button className='px-2 py-1 bg-secondary rounded-md text-sm'>
          Create New Renter
        </button>
      </div>

      <RenterTable />
    </div>
  );
};

export default Renter;
