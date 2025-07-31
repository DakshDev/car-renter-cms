import React from "react";
import CreateAdminAccount from "../forms/CreateAdminModal";
import LoginAdminAccount from "../forms/loginAdminModal";

const Header = () => {
  return (
    <header className='w-full flex items-center justify-between p-2.5 bg-primary fixed left-0 top-0 border-b border-border z-50'>
      <div>
        <h1 className='priText capitalize font-semibold'>Admin Panel</h1>
      </div>
      <div className='flex gap-4 items-center'>
        <div className='text-sm text-white flex gap-2'>
          <LoginAdminAccount />
          <CreateAdminAccount />
        </div>
        <div className='cursor-pointer flex items-center gap-2.5 bg-secondary rounded-md p-2 px-2.5'>
          <div className='rounded-full size-8 outline-2 outline-border uppercase flex items-center justify-center text-sm font-semibold'>
            UN
          </div>
          <div className='grid text-sm'>
            <span className='capitalize leading-4'>User Name</span>
            <span className='lowercase leading-4'>username@gmail.com</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
