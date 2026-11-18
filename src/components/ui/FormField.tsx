
import React from "react";

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  error?: string;
  required?: boolean;
  className?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  children,
  error,
  required = false,
  className = "",
}) => {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      <label className="flex gap-1 text-body text-fg">
        {label}
        {required && <span className="text-danger">*</span>}
      </label>

      <div className="w-full">
        {children}
      </div>

      {error && (
        <span className="text-small text-danger">{error}</span>
      )}
    </div>
  );
};

export default FormField;
