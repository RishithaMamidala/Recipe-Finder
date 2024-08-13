import React, {useState, useEffect} from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, resetRegisterUser } from './State/Users/Action';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, success, error } = useSelector(state => state.registerUser);

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        validationSchema: Yup.object({
            name: Yup.string().trim()
            .matches(/^[A-Za-z\s]+$/, "Name should contain only letters and spaces")
            .min(2, "Name must be at least 2 characters long") 
            .max(50, "Name must be at most 50 characters long")
            .required("Required"),
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string()
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                "Must Contain atleast 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character")
                .required("Required"),
            confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], "Passwords must match").required("Required")
        }),
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                await dispatch(registerUser(values));
            } catch (err) {
                resetForm();
            } finally {
                setSubmitting(false);
            }
        }
    });


    useEffect(() => {
        if (success) {
            navigate('/signin');
        }
    }, [success, navigate]);

    useEffect(() => {
        return () => {
            dispatch(resetRegisterUser());
        };
    }, [dispatch]);

    return (
        <div className='flex items-center h-auto justify-center bg-black-100 p-2'>
            <div className='w-full max-w-sm bg-yellow-100 p-8 rounded-lg shadow-lg absolute top-[8rem]'>         
                <h2 className='text-2xl font-extrabold text-center text-gray-700'>
                    Register
                </h2>
                {error && (
                    <div className='mb-4 text-sm text-red-600 text-center'>{error}</div>
                )}
                <form onSubmit={formik.handleSubmit} className='mt-6'>
                    <div className='mb-4'> 
                        <label htmlFor="name" className='block text-sm font-medium text-gray-700'>
                            Name
                        </label>
                        <input 
                            type="text"
                            id='name'
                            name="name"
                            onChange={formik.handleChange} 
                            value={formik.values.name}
                            onBlur={formik.handleBlur}
                            className={`w-full px-4 py-2 mt-2 border rounded-md text-black focus:outline-none focus:ring`}/>
                        {formik.touched.name && formik.errors.name && <p className='mt-1 text-sm text-red-600'>{formik.errors.name}</p>}
                    </div>
                    <div className='mb-4'> 
                        <label htmlFor="email" className='block text-sm font-medium text-gray-700'>
                            Email
                        </label>
                        <input 
                            type="email"
                            id='email'
                            name="email"
                            onChange={formik.handleChange} 
                            value={formik.values.email}
                            onBlur={formik.handleBlur}
                            className={`w-full px-4 py-2 mt-2 border rounded-md text-black focus:outline-none focus:ring`}/>
                        {formik.touched.email && formik.errors.email && <p className='mt-1 text-sm text-red-600'>{formik.errors.email}</p>}
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                        Password
                        </label>
                        <input
                            type='password'
                            id='password'
                            name="password"                            
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            onBlur={formik.handleBlur}
                            className={`w-full px-4 py-2 mt-2 border text-black rounded-md focus:outline-none focus:ring `}/>
                        {formik.touched.password && formik.errors.password && <p className='mt-1 text-sm text-red-600'>{formik.errors.password}</p>}
                    </div>
                    <div className='mb-4'>
                        <label htmlFor="confirmPassword" className='block text-sm font-medium text-gray-700'>
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id='confirmPassword'
                            name="confirmPassword"
                            onChange={formik.handleChange}
                            value={formik.values.confirmPassword}
                            onBlur={formik.handleBlur}
                            className={`w-full px-4 py-2 mt-2 border rounded-md text-black focus:outline-none focus:ring `}
                        />
                        {formik.touched.confirmPassword && formik.errors.confirmPassword && <p className='mt-1 text-sm text-red-600'>{formik.errors.confirmPassword}</p>}
                    </div>
                    <button
                        type='submit'
                        className='w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring'
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                    
                </form>
            </div>
        </div>
    )
}

export default Register
