import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userServices from '../services/user.service';

const Dashboard = () => {
   const [users, setUsers] = useState([]);
   const navigate = useNavigate();

   const fetchUsers = async () => {
      try {
         const { data } = await userServices.getUsers();
         setUsers(data);
      } catch (error) {
         console.log(error);
      }
   };

   const handleLogout = () => {
      localStorage.removeItem('myToken');
      navigate('/login');
   };

   useEffect(() => {
      fetchUsers();
   }, []);

   return (
      <>
         <div className='grid w-full h-screen place-items-center bg-sky-100'>
            <div className='w-1/2'>
               <h1 className='text-gray-800 font-medium text-xl mb-4'>Welcome Back!</h1>
               <div className='py-4 border border-gray-200 bg-white rounded-md'>
                  <h3 className='font-bold border-b text-gray-800 pb-4 px-4'>List User</h3>
                  {users.length > 0 ? (
                     users.map((user, idx) => (
                        <ul className='px-4 pt-4' key={idx}>
                           <li>
                              {`${idx + 1}.`} {user.name}
                           </li>
                        </ul>
                     ))
                  ) : (
                     <p className='px-4 pt-4 text-sm'>No Users</p>
                  )}
               </div>
               <div className='flex items-center justify-end gap-3 mt-4'>
                  <button
                     type='button'
                     onClick={handleLogout}
                     className='bg-red-500 px-3 py-2.5 rounded-md w-fit text-sm text-white'
                  >
                     Logout
                  </button>
               </div>
            </div>
         </div>
      </>
   );
};

export default Dashboard;
