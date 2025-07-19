import React from 'react';
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';

const Register = () => {
    const { createUser, updateUserProfile } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const from = location.state?.from || '/';

    const onSubmit = data => {
        console.log(data); // data is come from react hook from

        createUser(data.email, data.password)
            .then((result) => {

                console.log(result.user);

                // update user profile

                const userProfile = {
                    displayName: data.name,
                    photoURL: data.photo
                }

                updateUserProfile(userProfile)
                    .then(() => {
                        console.log('profile name and pic update');

                        navigate(from);
                    })
                    .catch(error => {
                        console.log(error);
                    })

            })
            .catch(error => {
                console.error(error);
            })
    };

    return (
        <div className=''>

            <Card className="max-w-sm mx-auto mt-10">
                <h1 className='text-3xl text-center font-semibold'>Register Now</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="name1">Your Name</Label>
                        </div>
                        <TextInput id="name1" type="text" placeholder="enter your Name"
                            {...register("name", { required: "Name is required" })}
                        />
                        {errors.name?.type === "required" &&
                            <p className='text-red-600'>Name is required</p>}
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="photo1">Photo Url</Label>
                        </div>
                        <TextInput id="photo1" type="text" placeholder="Enter Your Photo Url"
                            {...register("photo", { required: "Photo URL is required" })}
                        />
                        {errors.photo && <p className="text-red-500 text-sm">{errors.photo.message}</p>}
                    </div>


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
                        <TextInput id="password1" type="password"
                            {...register('password', { required: true, minLength: 6 })}
                        />

                        {errors.password?.type === "required" &&
                            <p className='text-red-600'>Password is required</p>}

                        {errors.password?.type === 'minLength' &&
                            <p className='text-red-600'>Password must me at lest 6 character</p>}

                    </div>
                    {/* <div className="flex items-center gap-2">
                        <Checkbox id="remember" />
                        <Label htmlFor="remember">Remember me</Label>
                    </div> */}
                    <Button type="submit">Register</Button>

                    <p><small>Already have an account Please
                        <Link state={{ from }} className='text-blue-600 ml-2 underline' to='/login'>Login</Link>
                    </small></p>
                </form>
            </Card>

        </div>
    );
};

export default Register;