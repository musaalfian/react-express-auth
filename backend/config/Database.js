import { Sequelize } from "sequelize";

const db = new Sequelize('react_express_auth', 'root', '', {
   host: "localhost",
   dialect: 'mysql'
})

export default db