import React, { use, useState } from 'react';
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import { Link, useLocation, useNavigate } from 'react-router';
import { FcGoogle } from 'react-icons/fc';
import useAxios from '../../../hooks/useAxios';
import { DarkContext } from '../../../context/DarkContext/DarkContext';

const Login = () => {
    const { signIn, signInWithGoogle } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosInstance = useAxios();
    const { bgDarkw, textDarkW } = use(DarkContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const from = location.state?.from || '/';

    // let textDarkW;
    // let bgDarkw

    // if (dmode) {
    //     bgDarkw = 'black';
    //     textDarkW = 'white';
    // }
    // else {
    //     bgDarkw = 'white';
    //     textDarkW = 'black';
    // }

    const onSubmit = data => {
        // console.log(data); // data is from react hook form

        signIn(data.email, data.password)
            .then(result => {
                // console.log(result.user);

                if (result.user) {
                    Swal.fire({
                        // position: "top-end",
                        icon: "success",
                        title: "successfully login",
                        showConfirmButton: false,
                        color: textDarkW,
                        background: bgDarkw,
                        timer: 2000
                    });

                    navigate(from);

                }
            })
            .catch(error => {
                // console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong! Please recheck email and password",

                });
            })

    };

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(async (result) => {
                // console.log(result.user);
                const user = result.user;
                if (result.user) {
                    Swal.fire({
                        // position: "top-end",
                        icon: "success",
                        title: "successfully login",
                        showConfirmButton: false,
                        timer: 2000
                    });

                }

                // update userInfo in the database
                const userInfo = {
                    email: user.email,
                    name: user.displayName,
                    role: 'user', //default role
                    created_at: new Date().toISOString(),
                    last_log_in: new Date().toISOString()
                }

                const res = await axiosInstance.post('/users', userInfo);
                // console.log('user update info in social', res.data);


                navigate(from)
            })
            .catch(error => {
                // console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",

                });
            })
    }

    return (
        <div>
            <Card className="max-w-sm mx-auto mt-10">
                <h1 className='text-3xl text-center font-semibold dark:text-gray-200'>Login Now</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email1">Your email</Label>
                        </div>
                        <TextInput id="email1" type="email" placeholder="Enter Your Email"
                            {...register("email", { required: "Email is required" })}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password1">Your password</Label>
                        </div>
                        <TextInput id="password1" type="password" placeholder="Enter Your Password"
                            {...register('password', { required: true })}
                        />

                        {errors.password?.type === "required" &&
                            <p className='text-red-600'>Password is required</p>}



                    </div>
                    {/* <div className="flex items-center gap-2">
                                   <Checkbox id="remember" />
                                   <Label htmlFor="remember">Remember me</Label>
                               </div> */}
                    <Button type="submit">Login</Button>

                    <p><small className='dark:text-gray-200'>New to this website Please
                        <Link state={{ from }} className='text-blue-600 ml-2 underline' to='/register'>Register</Link>
                    </small></p>

                </form>
                <hr className='text-gray-400' />
                <Button onClick={handleGoogleSignIn} className="bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 text-gray-900 hover:bg-gradient-to-bl focus:ring-red-100 dark:focus:ring-red-400">
                    <FcGoogle size={24} className='mr-2' /> <span className='text-xl'>Google</span>
                </Button>
            </Card>
        </div>
    );
};

export default Login;