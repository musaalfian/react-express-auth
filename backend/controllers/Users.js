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
   const { name, email, address, password, passwordConfirmation } = req.body;
   if (!name || !email || !address || !password || !passwordConfirmation) {
      return res.status(400).json({ msg: 'Semua field wajib diisi' });
   }

   if (password !== passwordConfirmation) {
      return res.status(400).json({ msg: 'Konfirmasi password tidak sesuai' });
   }

   try {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      await Users.create({
         name: name,
         email: email,
         address: address,
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
         expiresIn: '20s',
      });
      const refreshToken = jwt.sign({ id, name, email }, process.env.REFRESH_TOKEN, {
         expiresIn: '1d',
      });

      // update user data
      await user.update({ refresh_token: refreshToken });

      // set cookies
      res.cookie('refreshToken', refreshToken, {
         httpOnly: true,
         maxAge: 24 * 60 * 60 * 1000,
      });

      // send user data
      const userData = {
         id: user.id,
         name: user.name,
         email: user.email,
         address: user.address,
      };

      res.json({
         status: 'success',
         message: 'Login successful',
         data: {
            accessToken,
            user: userData,
         },
      });
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
