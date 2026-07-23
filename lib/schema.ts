import { z } from 'zod';

export const opportunitySchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  organization: z.string().min(2, "Organization name is required"),
  category: z.enum(["Job", "Internship", "Scholarship", "Online course", "Remote work", "Training program", "Volunteer work"]),
  location: z.string().min(2, "Location is required"),
  type: z.enum(["Remote", "On-site", "Hybrid"]),
  deadline: z.string().refine((date) => {
    // Ensure the deadline is today or in the future
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(date) >= today;
  }, { message: "Deadline must be today or in the future" }),
  description: z.string().min(20, "Description must be at least 20 characters"),
  // We treat requirements as a string in the form, but we'll split it by commas in the component
  requirements: z.string().min(10, "Please list some requirements (e.g. React, HTML, CSS)"),
  applyLink: z.string().url("Must be a valid URL (include https://)"),
  // Tags are optional
  tags: z.string().optional(),
});

export type OpportunityFormValues = z.infer<typeof opportunitySchema>;
///


export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;