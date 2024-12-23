import React from 'react';

const Container = ({ children }) => {
   return <div className='w-full min-h-screen py-8 grid place-items-center bg-sky-600'>{children}</div>;
};

export default Container;
