const z = require("zod");

const staffValidatorSchema = z.object({
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

const clientValidationSchema = z.object({
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

const authValidation = z.object({
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
module.exports = {
  staffValidatorSchema,
  clientValidationSchema,
  authValidation,
};
