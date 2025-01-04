import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userServices from '../services/user.service';
import { Avatar, DarkThemeToggle, Dropdown, Navbar } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { authUser, logout } from '../redux/slices/userSlice';

const Dashboard = () => {
   const dispatch = useDispatch();
   const authenticatedUser = useSelector(authUser);
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
      dispatch(logout());
      localStorage.removeItem('myToken');
      localStorage.removeItem('authenticatedUser');
      navigate('/login');
   };

   useEffect(() => {
      fetchUsers();
   }, []);

   return (
      <>
         {/* Navbar */}
         <Navbar fluid className=' dark:bg-slate-600'>
            <div className='w-1/2 mx-auto flex justify-between gap-3'>
               <Navbar.Brand href='https://flowbite-react.com'>
                  <span className='self-center whitespace-nowrap font-semibold dark:text-white'>Simple Dashboard</span>
               </Navbar.Brand>
               <div className='flex md:order-2 gap-3'>
                  <Dropdown
                     arrowIcon={false}
                     inline
                     label={
                        <Avatar
                           alt='User settings'
                           img='https://flowbite.com/docs/images/people/profile-picture-5.jpg'
                           rounded
                        />
                     }
                  >
                     <Dropdown.Header>
                        <span className='block text-sm'>{authenticatedUser.name}</span>
                        <span className='block truncate text-sm font-medium'>{authenticatedUser.email}</span>
                     </Dropdown.Header>
                     <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
                  </Dropdown>
                  <Navbar.Toggle />
                  <DarkThemeToggle />
               </div>
            </div>
         </Navbar>

         {/* List users */}
         <div className='grid w-full h-screen place-items-center bg-sky-100 dark:bg-slate-800'>
            <div className='w-1/2'>
               <h1 className='text-gray-800 font-medium text-xl mb-4 dark:text-white'>
                  Welcome Back, {authenticatedUser.name}!
               </h1>
               <div className='py-4 border border-gray-200 bg-white dark:text-slate-100 dark:bg-slate-700 rounded-md'>
                  <h3 className='font-bold border-b text-gray-800 pb-4 px-4 dark:text-white'>List User</h3>
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
            </div>
         </div>
      </>
   );
};

export default Dashboard;
