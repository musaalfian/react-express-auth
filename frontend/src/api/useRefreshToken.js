import API_CALL from './API_CALL';

const useRefreshToken = async () => {
   const response = await API_CALL.get('/refresh-token', {
      withCredentials: true,
   });
   return response;
};

export default useRefreshToken;
