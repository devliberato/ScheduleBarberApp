const { Sequelize } = require("sequelize");
require("dotenv").config();


const sequelize = new Sequelize( 
 process.env.MYSQL_PUBLIC_URL,
  {

  dialect: "mysql",
});

sequelize.authenticate().then(() => {
  console.log("Conexão realizada com sucesso!");
}).catch((error) => {
  console.error("Erro ao conectar com o banco de dados:", error);
});

module.exports = sequelize;

