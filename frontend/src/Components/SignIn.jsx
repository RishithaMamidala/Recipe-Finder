import React, {useState, useEffect} from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cleanupLoginUser, loginUser, resetLoginUser } from './State/Users/Action';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, success, error } = useSelector(state => state.loginUser);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().required("Required"),
        }),
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                await dispatch(loginUser(values));
            } catch (err) {
                resetForm();
            } finally {
                setSubmitting(false);
            }
        }
    });

    useEffect(() => {
        if (success) {
            navigate('/');
        }
    }, [success, navigate]);

    useEffect(() => {
        return () => {
            if (!success) {
                dispatch(cleanupLoginUser());
            }
        };
    }, [dispatch]);

    return (
        <div className='flex items-center h-auto justify-center bg-black-100 p-2'>
            <div className='w-full max-w-sm bg-yellow-100 p-8 rounded-lg shadow-lg absolute top-[8rem]'>         
                <h2 className='text-2xl font-extrabold text-center text-gray-700'>
                    Login
                </h2>
                {error && (
                    <div className='mb-4 text-sm text-red-600'>
                        {error}
                    </div>
                )}
                <form onSubmit={formik.handleSubmit} className='mt-6'>
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
                    <button
                        type='submit'
                        className='w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring'
                    >
                        {formik.isSubmitting ? 'Logging in...' : 'Login'}
                    </button>
                    <div className='text-center mt-4 underline'>
                        <Link to='/forgotpassword' className='text-blue-500 hover:text-blue-700'>Forgot Password?</Link>
                    </div>
                    <div className='text-center mt-4'>
                        <p className='text-gray-700'>
                            New User?{' '}
                            <Link to='/register' className='text-blue-500 hover:text-blue-700 underline'>Register</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
