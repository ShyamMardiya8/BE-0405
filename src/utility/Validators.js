const z = require("zod");

const staffValidatorSchema = z.object({
    name: z.string().min(1, "Name is required"),

    email: z.string().email({
        message: "Please enter valid email"
    }),

    phoneNumber: z
        .string()
        .regex(/^\d{10}$/, {
            message: "Please enter valid phone number"
        }),

    role: z.enum(["Super Admin", "Admin", "Employee"], {
        errorMap: () => ({
            message: "Please select a valid user role."
        })
    }),

    tasks: z.array(z.string(), {
        message: "Invalid Tasks"
    })
});

module.exports = { staffValidatorSchema };