import API_CALL from '../api/API_CALL.js';

const register = (data) => {
   return API_CALL.post('/register', data);
};
const getUsers = () => {
   return API_CALL.get('/users');
};

const userServices = {
   getUsers,
   register,
};

export default userServices;
