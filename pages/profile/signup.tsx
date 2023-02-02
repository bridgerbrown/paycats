import React, { useState } from 'react'
import Navbar from '@/components/sections/navbar'
import Footer from '@/components/sections/footer'
import Link from 'next/link'
import { FormProvider, useForm, resolver } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useAuth } from '@/components/context/AuthContext'
import { checkUser } from '@/components/firebase/firestore'
import { getUserData } from '@/components/firebase/firestore'

type FormValues = {
  email: string;
  password: string;
  password_confirm: string;
}

export default function SignUp() {
    const methods = useForm({ mode: "onBlur"})
    const { signUp, setUserDoc } = useAuth()
    const router = useRouter()
    const [invalid, setInvalid] = useState("")
  
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<FormValues>({ resolver });

    function createUserData(email: any){
      checkUser(email)
        .then((item) => {
          setUserDoc(item)
          console.log("signup " + item)
        })
    }
  
    const onSubmit = async (data: any) => {
      try {
        await signUp(data.email, data.password);
        router.push("/profile");
        setInvalid("")
        createUserData(data.email)
      } catch (error) {
        if (error instanceof Error) {
          setInvalid("Email already in use")
          console.log(error.message);
        }
      }
    };

    return (
        <div className="w-screen relative bg-stone-100 h-screen">
        <Navbar />
        <div className="flex justify-center items-center">
              <div className="border border-slate-300 rounded-lg px-40 pt-28 pb-36 mt-20 mb-4 flex bg-white flex-col justify-center items-center">
                <h4 className="mb-6 text-2xl font-semibold tracking-wide">Sign Up</h4>
                <FormProvider {...methods}>
                  <form action="" onSubmit={handleSubmit(onSubmit)} className="">
                    <div className="">
                      <div className="mb-2">
                        <label htmlFor="" className="text-sm">
                          Email
                        </label>
                      </div>
  
                      <input
                        type="email"
                        {...register("email", { required: "Email is required" })}
                        className="mb-4"
                      />
                      {errors.email && <p className="error">{errors.email.message}</p>}
                    </div>
                    <div className="">
                      <div className="mb-2">
                        <label htmlFor="" className="text-sm">
                          Password
                        </label>
                      </div>
  
                      <input
                        type="password"
                        {...register("password", { required: "Password is required" })}
                        className="mb-4"
                      />
                      {errors.password && <p className="error">{errors.password.message}</p>}
                    </div>
                    <div className="">
                    <div className="mb-2">
                      <label htmlFor="" className="text-sm">
                        Confirm Password
                      </label>
                    </div>

                    <input
                      type="password"
                      {...register("password_confirm", {
                        required: "Verify your password",
                      })}
                      className="mb-4"
                    />
                    {errors.password_confirm && (
                      <p className="">{errors.password_confirm.message}</p>
                    )}
                  </div>
                  <div className="flex flex-col items-center justify-center">
                      <button
                        type="submit"
                        className=""
                      >
                        <p className="my-4 bg-blue-900 text-white px-4 py-1.5 rounded-full text-sm hover:bg-blue-700">Submit</p>
                      </button>
                      <p className="text-sm text-red-600 mb-4">{invalid}</p>
                    </div>
                  </form>
                </FormProvider>
                <Link href="/profile/login">
                  <p className="text-xs text-slate-500">Already have an account? Click here to log in!</p>
                </Link>
              </div>
          </div>
          <Footer />
      </div>
  );
};
    