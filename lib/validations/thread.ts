import * as z from 'zod';

export const ThreadValidation = z.object({
    thread: z.string().min(3, { message: 'Minimun 3 characters required' }).nonempty(),
    accountId: z.string(),

})

export const CommentValidation = z.object({
    thread: z.string().min(3, { message: 'Minimun 3 characters required' }).nonempty()
})



