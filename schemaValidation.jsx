import {z} from "zod";

export const schema = z.object({
    name:z.string().min(3,"Minimum 3 chars").max(10,"Maximum 10 cahrs") ,
    username:z.string().min(3,"Minimum 3 chars").max(10,"Maximum 10 cahrs") ,
    email:z.string().email(),
    password:z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,'requires a mix of uppercase letters, lowercase letters, numbers, and special characters'),
    rePassword:z.string(),
    dateOfBirth:z.string().refine((data)=> new Date(data)<=new Date(),"Date Must be in Past"),
    gender:z.enum(['male','female'])
}).refine((values)=> values.password == values.rePassword,{
    message:"RePassword Not Matched",
    path:['rePassword']
})


export const AddCommentSchema = z.object({
    content:z.string().nonempty(),
})
