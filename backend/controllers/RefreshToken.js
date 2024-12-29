import jwt from 'jsonwebtoken';
import Users from '../models/UserModel.js';

const RefreshToken = async (req, res) => {
   try {
      const refreshToken = req.cookies.refreshToken;
      // res.json({ refreshToken });
      if (!refreshToken) {
         console.log('No refresh token in cookies');
         return res.sendStatus(401);
      }

      const isValidRefreshToken = await Users.findOne({
         where: {
            refresh_token: refreshToken,
         },
      });
      if (!isValidRefreshToken) return res.sendStatus(403);

      jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
         if (err) return res.sendStatus(403);
         const { id, name, email } = isValidRefreshToken;

         // update access token
         const accessToken = jwt.sign({ id, name, email }, process.env.ACCESS_TOKEN, {
            expiresIn: '20s',
         });
         res.json({ accessToken });
      });
   } catch (error) {
      res.status(500).json({ msg: 'Terjadi kesalahan pada server' });
   }
};

export default RefreshToken;
