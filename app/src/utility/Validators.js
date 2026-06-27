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

  location: z.array(
    z.object({
      date: z.string(),
      timeline: z.array(
        z.object({
          time: z.string(),
          activity: z.string(),
          lat: z.number(),
          lng: z.number(),
          clientName: z.string().optional(),
          duration: z.string().optional(),
        })
      ),
    })
  ).optional(),
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

  location: z.array(
    z.object({
      date: z.string(),
      timeline: z.array(
        z.object({
          time: z.string(),
          activity: z.string(),
          lat: z.number(),
          lng: z.number(),
          clientName: z.string().optional(),
          duration: z.string().optional(),
        })
      ),
    })
  ).optional(),
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

export const attendanceCreateSchema = z.object({
  staffId: z.string({
    required_error: "Staff ID is required",
    invalid_type_error: "Staff ID must be a string",
  }),
  date: z.string({
    required_error: "Date is required",
  }),
  status: z.enum(["Present", "Absent", "Late", "On Leave"]).optional(),
  checkIn: z.object({
    time: z.string({ required_error: "Check-in time is required" }),
    lat: z.number({ required_error: "Check-in latitude is required" }),
    lng: z.number({ required_error: "Check-in longitude is required" }),
  }),
  notes: z.string().optional(),
});

export const attendanceUpdateSchema = z.object({
  status: z.enum(["Present", "Absent", "Late", "On Leave"]).optional(),
  checkOut: z.object({
    time: z.string({ required_error: "Check-out time is required" }),
    lat: z.number({ required_error: "Check-out latitude is required" }),
    lng: z.number({ required_error: "Check-out longitude is required" }),
  }).optional(),
  notes: z.string().optional(),
});

export const visitCreateSchema = z.object({
  staffId: z.string().optional(),
  clientId: z.string({
    required_error: "Client ID is required",
  }),
  time: z.string({
    required_error: "Time is required",
  }),
  subject: z.string({
    required_error: "Subject is required",
  }),
  status: z.enum(["Pending", "Completed", "Canceled"]).optional(),
});

export const visitUpdateSchema = z.object({
  staffId: z.string().optional(),
  clientId: z.string().optional(),
  time: z.string().optional(),
  subject: z.string().optional(),
  status: z.enum(["Pending", "Completed", "Canceled"]).optional(),
});

export const taskCreateSchema = z.object({
  staffId: z.string().optional(),
  clientId: z.string({
    required_error: "Client ID is required",
  }),
  time: z.string({
    required_error: "Time is required",
  }),
  subject: z.string({
    required_error: "Subject is required",
  }),
  status: z.enum(["Pending", "Completed", "Canceled"]).optional(),
  createdBy: z.string({
    required_error: "Created By is required",
  }),
  type: z.string({
    required_error: "Type is required",
  }),
});

export const taskUpdateSchema = z.object({
  staffId: z.string().optional(),
  clientId: z.string().optional(),
  time: z.string().optional(),
  subject: z.string().optional(),
  status: z.enum(["Pending", "Completed", "Canceled"]).optional(),
  createdBy: z.string().optional(),
  type: z.string().optional(),
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

