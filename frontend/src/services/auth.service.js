import API_CALL from '../api/API_CALL.js';

const signIn = (credentials) => {
   return API_CALL.post('/login', credentials);
};

const authServices = {
   signIn,
};

export default authServices;
