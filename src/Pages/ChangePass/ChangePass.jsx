import { useContext, useState } from 'react';
import { Eye, EyeOff, Lock, ShieldCheck } from 'lucide-react';

import React from 'react'
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { UserData } from './../../Context/UserDataContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function ChangePass() {
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const{token,setToken} = useContext(UserData);
    const navigate = useNavigate();


const schema = z.object({
    password:z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,'requires a mix of uppercase letters, lowercase letters, numbers, and special characters'),
    newPassword:z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,'requires a mix of uppercase letters, lowercase letters, numbers, and special characters'),
})


const{register,handleSubmit,formState,reset}=useForm({
    mode:'onSubmit',
    reValidateMode:'onChange',
    defaultValues:{
    password:"",
    newPassword:""
    },
    resolver:zodResolver(schema),
});

    async function Change(data){
    try{
                const res = await axios.patch('https://linked-posts.routemisr.com/users/change-password',data,{
        headers:{
            token
        }
    });
    if(res.data.message==='success'){
        toast.success("Password Changed Successfully");
        reset();
        setToken(res.data.token);
        localStorage.setItem('userToken',res.data.token);
        setTimeout(() => {
            navigate('/profile');
        }, 2000);
    }
    }catch(err){
        toast.error("Password not correct. Please try again.");
    }

}


  return (
    <div className=" max-w-md mx-auto mt-30 p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
          <ShieldCheck className="text-blue-600 dark:text-blue-400" size={24} />
        </div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Security Settings</h2>
      </div>

      <form onSubmit={handleSubmit(Change)} className="space-y-5">
        {/* Current Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Current Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="text-gray-400" size={18} />
            </div>
            <input
            type={showCurrent ? "text" : "password"}
            {...register('password')}
            className="block w-full pl-10 pr-10 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-900 dark:text-white"
            placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>

          </div>
            {formState.errors.password && <p className="text-red-600">{formState.errors.password.message}</p>}

        </div>

        {/* New Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            New Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="text-gray-400" size={18} />
            </div>
            <input
              type={showNew ? "text" : "password"}
            {...register('newPassword')}
            className="block w-full pl-10 pr-10 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-900 dark:text-white"
            placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
            {formState.errors.newPassword && <p className="text-red-600">{formState.errors.newPassword.message}</p>}

          <p className="mt-2 text-xs text-gray-500">
            Make sure it's at least 8 characters including a number.
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={formState.isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg shadow-lg shadow-blue-500/30 transition-all active:scale-[0.98]"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}
