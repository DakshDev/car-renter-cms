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
}

export function InputField({
  type,
  placeholder,
  value,
  disabled,
  label,
}: InputFieldProps) {
  return (
    <div className="grid gap-1.5">
      {label && <label className="text-sm">{label}</label>}
      <Input
        className="bg-secondary/50"
        type={type}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
      />
    </div>
  );
}

export default function LoginModal() {
  const inputs = [
    { label: "Email", type: "email", placeholder: "Enter Email" },
    { label: "Password", type: "password", placeholder: "Enter Password" },
  ];

  return (
    <Dialog>
      <form method="post" action="/login">
        <DialogTrigger asChild>
          <Button variant="outline" className="text-foreground">
            Login
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="my-2">
            <DialogTitle className="priText font-semibold">Login</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4">
            {inputs.map((each, index) => (
              <InputField
                key={index}
                type={each.type}
                placeholder={each.placeholder}
                label={each.label}
              />
            ))}
          </div>

          <button
            type="submit"
            className="mt-2 px-3 py-2 font-medium bg-emerald-600 text-white rounded-md hover:bg-emerald-500 active:bg-emerald-600"
          >
            Login
          </button>
        </DialogContent>
      </form>
    </Dialog>
  );
}
