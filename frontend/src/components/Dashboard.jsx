import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userServices from '../services/user.service';
import { Avatar, Dropdown, Navbar } from 'flowbite-react';

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
         {/* Navbar */}
         <Navbar fluid rounded className='w-1/2 mx-auto !px-0'>
            <Navbar.Brand href='https://flowbite-react.com'>
               <span className='self-center whitespace-nowrap font-semibold dark:text-white'>Simple Dashboard</span>
            </Navbar.Brand>
            <div className='flex md:order-2'>
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
                     <span className='block text-sm'>Bonnie Green</span>
                     <span className='block truncate text-sm font-medium'>name@flowbite.com</span>
                  </Dropdown.Header>
                  <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
               </Dropdown>
               <Navbar.Toggle />
            </div>
         </Navbar>

         {/* List users */}
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
            </div>
         </div>
      </>
   );
};

export default Dashboard;
