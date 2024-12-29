import Users from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const getUsers = async (req, res) => {
   try {
      const users = await Users.findAll({
         attributes: ['id', 'name', 'email'],
      });
      res.json(users);
   } catch (error) {
      console.log(error);
   }
};

const register = async (req, res) => {
   // get request
   const { name, email, password, confirmPassword } = req.body;
   if (password !== confirmPassword) {
      return res.status(400).json({ msg: 'Konfirmasi password tidak sesuai' });
   }
   const salt = await bcrypt.genSalt();
   const hashPassword = await bcrypt.hash(password, salt);

   try {
      await Users.create({
         name: name,
         email: email,
         password: hashPassword,
      });
      res.json({ msg: 'Registrasi berhasil!' });
   } catch (error) {
      console.log(error);
   }
};

const login = async (req, res) => {
   try {
      const { email, password } = req.body;
      // get requests
      const user = await Users.findOne({
         where: {
            email,
         },
      });

      // validate
      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(400).json({ msg: 'Wrong password' });

      // create token
      const { id, name } = user;
      const accessToken = jwt.sign({ id, name, email }, process.env.ACCESS_TOKEN, {
         expiresIn: '5s',
      });
      const refreshToken = jwt.sign({ id, name, email }, process.env.REFRESH_TOKEN, {
         expiresIn: '10s',
      });

      // update user data
      await user.update({ refresh_token: refreshToken });

      // set cookies
      res.cookie('refreshToken', refreshToken, {
         httpOnly: true,
         maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({ accessToken });
   } catch (error) {
      res.status(500).json({ msg: 'Terjadi kesalahan pada server' });
      console.log(error);
   }
};

const logout = async (req, res) => {
   const refreshToken = req.cookies.refreshToken;
   if (!refreshToken) return res.sendStatus(204);

   const user = await Users.findOne({
      where: {
         refresh_token: refreshToken,
      },
   });
   if (!user) return res.sendStatus(204);

   // delete token
   await user.update({ refresh_token: null });
   res.clearCookie('refreshToken');
   return res.sendStatus(200);
};

export { getUsers, register, login, logout };
