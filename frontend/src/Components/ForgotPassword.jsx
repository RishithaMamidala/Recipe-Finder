import React, {useState} from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Link} from 'react-router-dom';

const ForgotPassword = () => {
  const formik = useFormik({
    initialValues: {
        email:"",
    },
    validationSchema: Yup.object({
        email: Yup.string()
        .email("Invalid email")
        .required("Required"),
    }),
    onSubmit: (values) => {
        console.log(values);
    }
  })

  return (
    <div className='flex items-center h-auto justify-center bg-black-100 p-2'>
      <div className='w-full max-w-sm bg-yellow-100 p-8 rounded-lg shadow-lg absolute top-[8rem]'>         
        <h2 className='text-2xl font-extrabold text-center text-gray-700'>
            FORGOT PASSWORD
        </h2>
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
            <button
              type='submit'
              className='w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring'
            >
              Submit
            </button>
            <div className='text-left mt-1 underline'>
              <Link to='/signin' className='text-blue-500 hover:text-blue-700'>Login</Link>
            </div>
        </form>
      </div>
    </div>

  )
}

export default ForgotPassword
