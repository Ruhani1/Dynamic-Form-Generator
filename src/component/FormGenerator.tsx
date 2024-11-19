import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface Field {
  id: string;
  type: string;
  label: string;
  required: boolean;
  placeholder?: string;
  validation?: {
    pattern: string;
    message: string;
  };
  options?: { value: string; label: string }[];
}

interface FormSchema {
  formTitle: string;
  formDescription: string;
  fields: Field[];
}

const sampleSchema: FormSchema = {
  formTitle: "Project Requirements Survey",
  formDescription: "Please fill out this survey about your project needs",
  fields: [
    {
      id: "name",
      type: "text",
      label: "Full Name",
      required: true,
      placeholder: "Enter your full name",
    },
    {
      id: "email",
      type: "email",
      label: "Email Address",
      required: true,
      placeholder: "you@example.com",
      validation: {
        pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
        message: "Please enter a valid email address",
      },
    },
    {
      id: "companySize",
      type: "select",
      label: "Company Size",
      required: true,
      options: [
        { value: "1-50", label: "1-50 employees" },
        { value: "51-200", label: "51-200 employees" },
        { value: "201-1000", label: "201-1000 employees" },
        { value: "1000+", label: "1000+ employees" },
      ],
    },
    {
      id: "comments",
      type: "textarea",
      label: "Additional Comments",
      required: false,
      placeholder: "Any other details you'd like to share...",
    },
  ],
};

type FormValues = Record<string, string>;

const FormGenerator: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    alert('Form submitted successfully!');
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">{sampleSchema.formTitle}</h2>
      <p className="text-gray-600 mb-4">{sampleSchema.formDescription}</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {sampleSchema.fields.map((field) => (
          <div key={field.id} className="flex flex-col">
            <label htmlFor={field.id} className="font-medium">
              {field.label}
            </label>
            {field.type === 'select' ? (
              <select
                id={field.id}
                {...register(field.id, { required: field.required })}
                className="border p-2 rounded"
              >
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : field.type === 'textarea' ? (
              <textarea
                id={field.id}
                {...register(field.id, { required: field.required })}
                placeholder={field.placeholder}
                className="border p-2 rounded"
              />
            ) : (
              <input
                id={field.id}
                type={field.type}
                {...register(field.id, {
                  required: field.required,
                  pattern: field.validation?.pattern
                    ? {
                        value: new RegExp(field.validation.pattern),
                        message: field.validation.message,
                      }
                    : undefined,
                })}
                placeholder={field.placeholder}
                className="border p-2 rounded"
              />
            )}
            {errors[field.id] && (
              <span className="text-red-500 text-sm">
                {errors[field.id]?.message || `${field.label} is required`}
              </span>
            )}
          </div>
        ))}
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormGenerator;
