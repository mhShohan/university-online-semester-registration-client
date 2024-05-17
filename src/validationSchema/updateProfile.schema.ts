import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string({ required_error: 'Name is required' }),
  studentId: z.string({ required_error: 'Student ID is required' }),
  email: z.string({ required_error: 'Email is required' }),
  session: z.string({ required_error: 'Session is required' }),
  dateOfBirth: z.date({ required_error: 'Date of Birth is required' }),
  phone: z.string({ required_error: 'Phone number is required' }),
  fatherName: z.string({ required_error: 'Father name is required' }),
  motherName: z.string({ required_error: 'Mother name is required' }),
  nationality: z.string({ required_error: 'Nationality is required' }),
  religion: z.string({ required_error: 'Religion is required' }),
  presentAddress: z.object({
    village: z.string({ required_error: 'Village is required' }),
    subDistrict: z.string({ required_error: 'Sub District is required' }),
    postOffice: z.string({ required_error: 'Post Office is required' }),
    district: z.string({ required_error: 'District is required' }),
    zipCode: z.string({ required_error: 'Zip Code is required' })
  }),
  permanentAddress: z.object({
    village: z.string({ required_error: 'Village is required' }),
    subDistrict: z.string({ required_error: 'Sub District is required' }),
    postOffice: z.string({ required_error: 'Post Office is required' }),
    district: z.string({ required_error: 'District is required' }),
    zipCode: z.string({ required_error: 'Zip Code is required' })
  }),
  hsc: z.object({
    institute: z.string({ required_error: 'Institute is required' }),
    board: z.string({ required_error: 'Board is required' }),
    passingYear: z.string({ required_error: 'Passing Year is required' }),
    roll: z.string({ required_error: 'Roll is required' }),
    GPA: z.string({ required_error: 'GPA is required' })
  }),
  ssc: z.object({
    institute: z.string({ required_error: 'Institute is required' }),
    board: z.string({ required_error: 'Board is required' }),
    passingYear: z.string({ required_error: 'Passing Year is required' }),
    roll: z.string({ required_error: 'Roll is required' }),
    GPA: z.string({ required_error: 'GPA is required' })
  })
});