import API_CALL from '../api/API_CALL.js';

const getUsers = () => {
   return API_CALL.get('/users');
};

const userServices = {
   getUsers,
};

export default userServices;
