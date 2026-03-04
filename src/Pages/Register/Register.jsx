import { Button, Label, Radio, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { schema } from "../../../schemaValidation";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, UserPlus } from "lucide-react";
import { useState } from "react";




export default function Register() {
const navigate = useNavigate();
const [isLoading, setIsLoading] = useState(false);

async function sendData(userData){
  setIsLoading(true);
  try{
    const {data} = await axios.post("https://route-posts.routemisr.com/users/signup",userData,{
      headers:{
        'Content-Type':'application/json'
      }
    });
    
    if(data.success){
      toast.success("Registered Successfully , Redirecting to Login Page");
      setTimeout(()=>{
        navigate("/login");
      },3000);
      reset();
    }
  }catch(err){

    throw err
  }finally{
    setIsLoading(false);
  }
}

  const {register,handleSubmit,reset,formState:{errors}} = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: zodResolver(schema),
    defaultValues:{
    name: "",
    username:"",
    email:"",
    password:"",
    rePassword:"",
    dateOfBirth:"",
    gender:""
    }
  })
  const inputStyle = (error) => `
    block w-full px-4 py-2.5 bg-gray-50 border rounded-xl transition-all outline-none text-sm
    ${error ? "border-red-500 ring-red-100" : "border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"}
  `;
  
  
  return <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8">
        
        <div className="text-center mb-8">
          <div className="mx-auto h-12 w-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 mb-4">
            <UserPlus className="text-white" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
          <p className="text-sm text-gray-500 mt-1">
            Already have an account? <Link to="/login" className="text-blue-600 font-semibold hover:underline">Log in</Link>
          </p>
        </div>

        <form onSubmit={handleSubmit(sendData)} className="space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-700 uppercase ml-1 mb-1 block">Full Name</label>
              <input {...register('name')} type="text" placeholder="John Doe" className={inputStyle(errors.name)} />
              {errors.name && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="text-xs font-bold text-gray-700 uppercase ml-1 mb-1 block">Username</label>
              <input {...register('username')} type="text" placeholder="johndoe123" className={inputStyle(errors.username)} />
              {errors.username && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.username.message}</p>}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 uppercase ml-1 mb-1 block">Email Address</label>
            <input {...register('email')} type="email" placeholder="example@mail.com" className={inputStyle(errors.email)} />
            {errors.email && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.email.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-700 uppercase ml-1 mb-1 block">Password</label>
              <input {...register('password')} type="password" placeholder="••••••••" className={inputStyle(errors.password)} />
              {errors.password && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.password.message}</p>}
            </div>
            <div>
              <label className="text-xs font-bold text-gray-700 uppercase ml-1 mb-1 block">Confirm Password</label>
              <input {...register('rePassword')} type="password" placeholder="••••••••" className={inputStyle(errors.rePassword)} />
              {errors.rePassword && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.rePassword.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-700 uppercase ml-1 mb-1 block">Date of Birth</label>
              <input {...register('dateOfBirth')} type="date" className={inputStyle(errors.dateOfBirth)} />
              {errors.dateOfBirth && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.dateOfBirth.message}</p>}
            </div>
            <div>
              <label className="text-xs font-bold text-gray-700 uppercase ml-1 mb-1 block">Gender</label>
              <div className="flex gap-4 mt-2">
                <label className="flex flex-1 items-center justify-center gap-2 p-2.5 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors has-[:checked]:bg-blue-50 has-[:checked]:border-blue-200 group">
                  <input {...register('gender')} type="radio" value="male" className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                  <span className="text-sm font-medium text-gray-600 group-has-[:checked]:text-blue-700">Male</span>
                </label>
                <label className="flex flex-1 items-center justify-center gap-2 p-2.5 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors has-[:checked]:bg-blue-50 has-[:checked]:border-blue-200 group">
                  <input {...register('gender')} type="radio" value="female" className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                  <span className="text-sm font-medium text-gray-600 group-has-[:checked]:text-blue-700">Female</span>
                </label>
              </div>
              {errors.gender && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.gender.message}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-blue-200 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : "Create Account"}
          </button>
        </form>
      </div>
    </div>
}
