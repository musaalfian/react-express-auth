import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import authServices from '../services/auth.service';
import Card from './Card';
import Container from './Container';

const loginSchema = yup
   .object({
      email: yup.string().email().required('Email tidak boleh kosong'),
      password: yup.string().required('Password tidak boleh kosong'),
   })
   .required();

const Login = () => {
   const navigate = useNavigate();
   const [msg, setMsg] = useState('');
   const {
      register,
      formState: { errors },
      handleSubmit,
   } = useForm({ resolver: yupResolver(loginSchema) });

   const onSubmit = async (credentials) => {
      try {
         const { data } = await authServices.signIn(credentials);
         localStorage.setItem('myToken', data.accessToken);
         navigate('/dashboard');
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <>
         <Container>
            <Card>
               <div className='text-center font-bold mb-5'>Masuk</div>
               {msg != '' && (
                  <p className='text-center text-red-500 text-sm p-3 bg-red-50 border-red-200 mb-4 border rounded-md'>
                     {msg}
                  </p>
               )}
               <form onSubmit={handleSubmit(onSubmit)}>
                  <div className='mb-4 text-sm'>
                     <label htmlFor='email' className='inline-block mb-1.5 font-semibold'>
                        Email
                     </label>
                     <input
                        {...register('email')}
                        autoFocus
                        name='email'
                        type='email'
                        className='py-2.5 px-3 border focus:border-sky-400 text-slate-700 border-gray-300 rounded-md ring-0 outline-none w-full'
                     />
                     <p className='text-sm mt-1.5 text-red-500'>{errors.email?.message}</p>
                  </div>
                  <div className='mb-4 text-sm'>
                     <label htmlFor='password' className='inline-block mb-1.5 font-semibold'>
                        Password
                     </label>
                     <input
                        {...register('password')}
                        name='password'
                        type='password'
                        className='py-2.5 px-3 border focus:border-sky-400 text-slate-700 border-gray-300 rounded-md ring-0 outline-none w-full'
                     />
                     <p className='text-sm mt-1.5 text-red-500'>{errors.password?.message}</p>
                  </div>
                  <button
                     type='submit'
                     className='bg-sky-600 px-3 py-2.5 rounded-md w-full text-sm font-bold text-white'
                  >
                     Masuk
                  </button>
                  <p className='mt-4 text-sm text-center'>
                     Belum punya akun?{' '}
                     <a href='/register' className='font-bold'>
                        Daftar
                     </a>
                  </p>
               </form>
            </Card>
         </Container>
      </>
   );
};

export default Login;
