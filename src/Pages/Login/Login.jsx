import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../Context/UserDataContext";
import { useContext, useState } from "react";
import { Mail, Lock, LogIn, Loader2 } from "lucide-react";




export default function Login() {
const navigate = useNavigate();
const {setToken} = useContext(UserData);
const [isLoading, setIsLoading] = useState(false);

async function login(userData){
  setIsLoading(true);
  try{
    const {data} = await axios.post(`https://route-posts.routemisr.com/users/signin`,userData);
      
      if(data.success){
        localStorage.setItem("userToken",data.data.token);
        setToken(data.data.token);
        toast.success("Login Successfully , Redirecting to Home Page");
        
        setTimeout(() => {
          navigate('/');
        }, 2500);
        reset();
      }
  }
  catch(err){
    console.log(err,"error");
    toast.error(err.response.data.error ||'email or password is incorrect');
  }finally{
    setIsLoading(false);
  }
    
}

  const {register,handleSubmit,reset,formState:{errors}} = useForm({
    defaultValues:{
    email:"",
    password:"",
    }
  })
  
  
  return <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 mb-4">
            <LogIn className="text-white" size={24} />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit(login)} className="mt-8 space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                {...register("email", { required: "Email is required" })}
                type="email"
                className={`block w-full pl-10 pr-3 py-2.5 border ${
                  errors.email ? "border-red-500 ring-red-100" : "border-gray-200 focus:ring-blue-100 focus:border-blue-500"
                } rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-4 transition-all sm:text-sm`}
                placeholder="name@company.com"
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                {...register("password", { required: "Password is required" })}
                type="password"
                className={`block w-full pl-10 pr-3 py-2.5 border ${
                  errors.password ? "border-red-500 ring-red-100" : "border-gray-200 focus:ring-blue-100 focus:border-blue-500"
                } rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-4 transition-all sm:text-sm`}
                placeholder="••••••••"
              />
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : (
              "Sign In"
            )}
          </button>
        </form>

      </div>
    </div>
  
}
