
import * as z from "zod";

// Common fields for all user types
const commonFields = {
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  phoneNumber: z.string().min(10, { message: "Please enter a valid phone number" }),
  location: z.string().min(2, { message: "Please enter your location" }),
};

export const loginSchema = z.object({
  email: commonFields.email,
  password: commonFields.password,
  rememberMe: z.boolean().default(false)
});

export const studentSchema = z.object({
  ...commonFields,
  role: z.literal("student"),
  age: z.coerce.number().min(5).max(100),
  grade: z.string().min(1, { message: "Please select your grade" }),
  schoolName: z.string().min(2, { message: "Please enter your school name" }),
});

export const teacherSchema = z.object({
  ...commonFields,
  role: z.literal("teacher"),
  teachingGrades: z.array(z.string()).min(1, { message: "Please select at least one grade you teach" }),
  teachingSchool: z.string().min(2, { message: "Please enter your school name" }),
});

export const schoolSchema = z.object({
  ...commonFields,
  role: z.literal("school"),
  ceoName: z.string().min(2, { message: "Please enter the CEO's name" }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type StudentFormValues = z.infer<typeof studentSchema>;
export type TeacherFormValues = z.infer<typeof teacherSchema>;
export type SchoolFormValues = z.infer<typeof schoolSchema>;
