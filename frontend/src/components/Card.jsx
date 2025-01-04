import React from 'react';

const Card = ({ children }) => {
   return <div className='px-8 py-8 w-full max-w-[28rem] bg-white rounded-md border border-gray-200'>{children}</div>;
};

export default Card;
