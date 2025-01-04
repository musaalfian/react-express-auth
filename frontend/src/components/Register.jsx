import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import userServices from '../services/user.service';
import Card from './Card';
import Container from './Container';
import { Link } from 'react-router-dom';

const registerSchema = yup
   .object({
      name: yup.string().required('Nama tidak boleh kosong'),
      email: yup.string().required('Email tidak boleh kosong'),
      address: yup.string().required('Address tidak boleh kosong'),
      password: yup.string().required('Password tidak boleh kosong'),
      passwordConfirmation: yup.string().required('Konfirmasi password tidak boleh kosong'),
   })
   .required();

const Register = () => {
   const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);

   const {
      register,
      formState: { errors },
      handleSubmit,
      reset,
   } = useForm({ resolver: yupResolver(registerSchema) });

   const onSubmit = async (data) => {
      if (data.password !== data.passwordConfirmation) {
         alert('Konfirmasi password tidak sesuai');
      }

      try {
         await userServices.register(data);
         reset();
         setIsRegisterSuccess(true);
      } catch (error) {
         console.log(error);
      }
   };
   return (
      <>
         <Container>
            <Card>
               <div className='text-center font-bold mb-5'>Daftar</div>
               {isRegisterSuccess && (
                  <div className='p-3 mb-3 rounded-md text-sm bg-emerald-50 border border-emerald-300 text-emerald-500'>
                     <span className='font-semibold block mb-1'>Registrasi berhasil!</span>
                     <p>Silahkan masuk menggunakan akun yang telah Anda buat.</p>
                  </div>
               )}
               <form onSubmit={handleSubmit(onSubmit)}>
                  <div className='mb-4 text-sm'>
                     <label htmlFor='name' className='inline-block mb-1.5 font-semibold'>
                        Nama
                     </label>
                     <input
                        {...register('name')}
                        autoFocus
                        name='name'
                        type='text'
                        className='py-2.5 px-3 border focus:border-sky-400 text-slate-700 border-gray-300 rounded-md ring-0 outline-none w-full'
                     />
                     <p className='text-sm mt-1.5 text-red-500'>{errors.name?.message}</p>
                  </div>
                  <div className='mb-4 text-sm'>
                     <label htmlFor='email' className='inline-block mb-1.5 font-semibold'>
                        Email
                     </label>
                     <input
                        {...register('email')}
                        name='email'
                        type='email'
                        className='py-2.5 px-3 border focus:border-sky-400 text-slate-700 border-gray-300 rounded-md ring-0 outline-none w-full'
                     />
                     <p className='text-sm mt-1.5 text-red-500'>{errors.email?.message}</p>
                  </div>
                  <div className='mb-4 text-sm'>
                     <label htmlFor='address' className='inline-block mb-1.5 font-semibold'>
                        Address
                     </label>
                     <input
                        {...register('address')}
                        name='address'
                        type='text'
                        className='py-2.5 px-3 border focus:border-sky-400 text-slate-700 border-gray-300 rounded-md ring-0 outline-none w-full'
                     />
                     <p className='text-sm mt-1.5 text-red-500'>{errors.address?.message}</p>
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
                  <div className='mb-8 text-sm'>
                     <label htmlFor='passwordConfirmation' className='inline-block mb-1.5 font-semibold'>
                        Konfirmasi Password
                     </label>
                     <input
                        {...register('passwordConfirmation')}
                        name='passwordConfirmation'
                        type='password'
                        className='py-2.5 px-3 border focus:border-sky-400 text-slate-700 border-gray-300 rounded-md ring-0 outline-none w-full'
                     />
                     <p className='text-sm mt-1.5 text-red-500'>{errors.passwordConfirmation?.message}</p>
                  </div>
                  <button
                     type='submit'
                     className='bg-sky-600 px-3 py-2.5 rounded-md w-full text-sm font-bold text-white'
                  >
                     Daftar
                  </button>
                  <p className='mt-4 text-sm text-center'>
                     Sudah punya akun?{' '}
                     <Link to='/login' className='font-bold'>
                        Masuk
                     </Link>
                  </p>
               </form>
            </Card>
         </Container>
      </>
   );
};

export default Register;
