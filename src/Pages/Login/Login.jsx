import { Button, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserData } from "../../Context/UserDataContext";
import { useContext } from "react";





export default function Login() {
const navigate = useNavigate();
const {setToken} = useContext(UserData);
async function login(userData){
  try{
    const {data} = await axios.post(`https://linked-posts.routemisr.com/users/signin`,userData);
      if(data.message == 'success'){
        localStorage.setItem("userToken",data.token);
        setToken(data.token);
        toast.success("Login Successfully , Redirecting to Home Page");
        
        setTimeout(() => {
          navigate('/');
        }, 2500);
        reset();
      }
  }
  catch(err){
    console.log(err,"error");
    toast.error(err.response.data.error);
  }
    
}

  const {register,handleSubmit,reset,formState} = useForm({
    defaultValues:{
    email:"",
    password:"",
    }
  })
  
  
  return <div className="mt-25">
    <title>Login</title>
    <form onSubmit={handleSubmit(login)}  className="flex rounded p-7 mx-auto bg-slate-800 max-w-md md:my-10 justify-center flex-col gap-4 shadow-2xl">
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
      <Button type="submit"  >Submit</Button>
    </form>
  </div>
}
