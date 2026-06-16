import z from "zod";
import ApiErrorHandler from "./ApiErrorHandler";

export const staffValidatorSchema = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }),

  email: z.string().email({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string",
  }),

  password: z.number({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  }),

  phoneNumber: z.number({
    required_error: "phoneNumber is required",
    invalid_type_error: "Password must be a Number",
  }),

  role: z.enum(["Super Admin", "Admin", "Employee"], {
    errorMap: () => ({
      required_error: "Please select a valid user role",
      invalid_type_error: "Role must be a Number",
    }),
  }),

  tasks: z.array(z.string(), {
    message: "Invalid Tasks",
  }),
});

export const clientValidationSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .trim(),

  email: z.string().email("Please enter a valid email"),

  phoneNumber: z.number({
    required_error: "Phone Number is required",
    invalid_type_error: "Phone Number must be a string",
  }),
  location: z.string({
    required_error: "location is required",
    invalid_type_error: "location must be a string",
  }),
  website: z.string({
    required_error: "location is required",
    invalid_type_error: "website must be a string",
  }),
});

export const authValidation = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }),

  email: z.string().email({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string",
  }),

  password: z.number({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  }),

  phoneNumber: z.number({
    required_error: "phoneNumber is required",
    invalid_type_error: "Password must be a Number",
  }),

  role: z.enum(["Super Admin", "Admin", "Employee"], {
    errorMap: () => ({
      required_error: "Please select a valid user role",
      invalid_type_error: "Role must be a String",
    }),
  }),

  tasks: z.array(z.string(), {
    message: "Invalid Tasks",
  }),
});

export const formBuilderValidation = z.object({
  staffId: z.string({
      required_error: "StaffId is required",
      invalid_type_error: "StaffId must be a String",
  }),
  title: z.string({
      required_error: "title is required",
      invalid_type_error: "title must be a String",
  }),
  fields: z.array(
    z.object({
    label: z.string({
      required_error: "label is required",
      invalid_type_error: "label must be a String",
    }),
    fieldType: z.enum(["text", "number", "email", "checkbox", "radio", "file", "date"], {
      errorMap: () => ({
      required_error: "Please select a valid field type",
      invalid_type_error: "fieldType must be a String",
      })
    })
  })
  )
});

export function validateBody(body, schema) {
  const validation = schema.safeParse(body);
  if (!validation.success) {
    const errors = JSON.parse(validation.error.message);
    const error = new ApiErrorHandler("validation error", 400);
    error.errors = errors;
    throw error;
  }
  return validation.data;
}
