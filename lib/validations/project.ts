import * as z from 'zod';

export const ProjectValidation = z.object({
    name: z.string().min(3, { message: 'Minimun 3 characters required' }).max(50),
    tags: z.string().min(3, { message: 'Minimun 3 characters required' }).max(50),
    bio: z.string().min(5, { message: 'Minimun 5 characters required' }).max(5000),
})