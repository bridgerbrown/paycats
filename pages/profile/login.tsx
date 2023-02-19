import React, {useEffect, useState} from 'react'
import Navbar from '@/components/sections/navbar'
import Footer from '@/components/sections/footer'
import Link from 'next/link'
import { FormProvider, useForm, Resolver } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useAuth } from '@/components/context/AuthContext'
import { getUserData } from '@/components/firebase/firestore'
import LoadingCircle from '@/components/features/loading-circle'

type FormValues = {
  email: string;
  password: string;
  password_confirm: string;
}

export default function LogIn() {
    const methods = useForm({ mode: "onBlur"})
    const { logIn } = useAuth()
    const router = useRouter()
    const [invalid, setInvalid] = useState("")
    const [loadingTransition, setLoadingTransition] = useState<boolean>(false)
  
    const resolver: Resolver<FormValues> = async (values) => {
      return {
        values: values.email ? values : {},
        errors: !values.email
        ? {
          email: {
            type: 'required',
            message: 'This is required.',
          },
        }
        : {},
      }
    }

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<FormValues>({ resolver });

    function resolveUserData(email: any){
      getUserData(email)
        .then((item) => {
          console.log("user logged in: " + item)
        })
    }
  
    const onSubmit = async (data: any) => {
      try {
        resolveUserData(data.email)
        await logIn(data.email, data.password);
        setInvalid("")
        setLoadingTransition(true)
        setTimeout(() => {router.push("/profile");}, 1000)
      } catch (error) {
        if (error instanceof Error) {
          setInvalid("Invalid login")
          console.log(error.message);
        }
      }
    };

    return (
        <div className="pb-60 font-Hind w-screen relative bg-stone-100 min-h-screen">
        <Navbar />
        <div className="flex justify-center items-center">
              <div className="border border-slate-300 rounded-lg px-40 pt-28 pb-12 mt-20 mb-4 flex bg-white flex-col justify-center items-center">
                <h4 className="mb-6 text-2xl font-semibold tracking-wide">Log In</h4>
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
                      {errors.email && <p className="">{errors.email.message}</p>}
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
                      {errors.password && <p className="">{errors.password.message}</p>}
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
                <Link href="/profile/signup">
                  <p className="text-xs text-slate-500">Don&apos;t have an account? Click here to sign up!</p>
                </Link>
                {
                  loadingTransition
                  ?
                  <div className='pt-8 '>
                    <LoadingCircle />
                  </div>
                  :
                  <div className='pt-24 pb-5 mb-0.5'></div>
                }
              </div>
          </div>
          <Footer />
      </div>
  );
};
    