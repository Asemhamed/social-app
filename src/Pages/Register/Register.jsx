import { Button, Label, Radio, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { schema } from "../../../schemaValidation";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";




export default function Register() {
const navigate = useNavigate();

async function sendData(userData){
  try{
    const {data} = await axios.post("https://linked-posts.routemisr.com/users/signup",userData);
    if(data.message=="success"){
      toast.success("Registered Successfully , Redirecting to Login Page");

      setTimeout(()=>{
        navigate("/login");
      },3000);
      reset();
    }
  }catch(err){
    console.log(err,"error");
  }
}

  const {register,handleSubmit,reset,formState} = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: zodResolver(schema),
    defaultValues:{
    name: "",
    email:"",
    password:"",
    rePassword:"",
    dateOfBirth:"",
    gender:""
    }
  })
  
  
  return <div className="mt-20">
    <form onSubmit={handleSubmit(sendData)}  className="flex rounded p-7 mx-auto bg-slate-800 max-w-md md:my-10 justify-center flex-col gap-4 shadow-2xl">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="name">Your Name</Label>
        </div>
        <TextInput {...register('name')} id="name" type="text" placeholder="Enter your Name" />
        {formState.errors.name && <p className="text-red-600">{formState.errors.name.message}</p>}
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email1">Your email</Label>
        </div>
        <TextInput {...register('email')} id="email1" type="email" placeholder="name@***.com"/>
        {formState.errors.email && <p className="text-red-600">{formState.errors.email.message}</p>}
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password1">Your password</Label>
        </div>
        <TextInput {...register('password')} id="password1" type="password"  />
        {formState.errors.password && <p className="text-red-600">{formState.errors.password.message}</p>}
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="repassword">Re-Password</Label>
        </div>
        <TextInput {...register('rePassword')} id="repassword" type="password" />
        {formState.errors.rePassword && <p className="text-red-600">{formState.errors.rePassword.message}</p>}
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="dob">Date Of Birth</Label>
        </div>
        <TextInput {...register('dateOfBirth')} id="dob" type="date" />
        {formState.errors.dateOfBirth && <p className="text-red-600">{formState.errors.dateOfBirth.message}</p>}
      </div>

      <div className="flex items-center gap-2">
        <Radio {...register('gender')} id="male" value='male' />
        <Label htmlFor="male">Male</Label>
      </div>
      <div className="flex items-center gap-2">
        <Radio {...register('gender')} id="female" value='female' />
        <Label htmlFor="female">Female</Label>
      </div>

      <Button type="submit"  >Submit</Button>
    </form>
  </div>
}
