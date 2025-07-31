"use client";

import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface InputFieldProps {
  type?: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  label?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputField({
  type,
  placeholder,
  value,
  disabled,
  label,
  name,
  onChange,
}: InputFieldProps) {
  return (
    <div className="grid gap-1.5">
      {label && <label className="text-sm">{label}</label>}
      <Input
        className="bg-secondary/50"
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  );
}

export default function CreateAdminAccount() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const createdAt = new Date().toLocaleString();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/api/admin/createAdmin", formData);
      alert("Admin created successfully");
      setFormData({ email: "", password: "" });
    } catch (error) {
      console.error("Error creating admin:", error);
      alert("Failed to create admin.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-foreground">
          Create Admin
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="my-2">
          <DialogTitle className="priText font-semibold">
            Create Admin
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          <div className="grid gap-4">
            <InputField
              name="email"
              type="email"
              label="Email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
            />
            <InputField
              name="password"
              type="password"
              label="Password"
              placeholder="Create Password"
              value={formData.password}
              onChange={handleChange}
            />
            <InputField
              label="Role"
              type="text"
              value="admin"
              disabled
            />
            <InputField
              label="Created at"
              type="text"
              value={createdAt}
              disabled
            />
          </div>
          <button
            type="submit"
            className="mt-2 px-3 py-2 font-medium bg-emerald-600 text-white rounded-md hover:bg-emerald-500 active:bg-emerald-600"
          >
            Create New Admin
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
