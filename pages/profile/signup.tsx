import React from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import Link from 'next/link'
import { FormProvider, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

export default function SignUp() {
    const methods = useForm({ mode: "onBlur"})
    // const { signUp } = useAuthContext()
    const router = useRouter()
  
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = methods;
  
    const onSubmit = async (data) => {
      try {
        await signUp(data.email, data.password);
        router.push("/user");
      } catch (error) {
        console.log(error.message);
      }
    };

    return (
        <div className="">
        <Navbar />
        <div className="">
              <div className="">
                <h4 className="">Sign Up</h4>
                <FormProvider {...methods}>
                  <form action="" onSubmit={handleSubmit(onSubmit)} className="">
                    <div className="">
                      <div className="">
                        <label htmlFor="" className="">
                          Email
                        </label>
                      </div>
  
                      <input
                        type="email"
                        {...register("email", { required: "Email is required" })}
                        className=""
                      />
                      {errors.email && <p className="error">{errors.email.message}</p>}
                    </div>
                    <div className="">
                      <div className="">
                        <label htmlFor="" className="">
                          Password
                        </label>
                      </div>
  
                      <input
                        type="password"
                        {...register("password", { required: "Password is required" })}
                        className=""
                      />
                      {errors.password && <p className="error">{errors.password.message}</p>}
                    </div>
                    <div className="">
                    <div className="">
                      <label htmlFor="" className="">
                        Confirm Password
                      </label>
                    </div>

                    <input
                      type="password"
                      {...register("password_confirm", {
                        required: "Verify your password",
                      })}
                      className=""
                    />
                    {errors.password_confirm && (
                      <p className="">{errors.password_confirm.message}</p>
                    )}
                  </div>
                  <div className="">
                      <button
                        type="submit"
                        className=""
                      >
                        <p className="">Submit</p>
                      </button>
                    </div>
                  </form>
                </FormProvider>
                <Link href="/profile/login">
                  <p className="">Already have an account? Click here to log in!</p>
                </Link>
              </div>
          </div>
      </div>
  );
};
    