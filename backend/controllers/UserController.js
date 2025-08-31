const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.KEY_SECRET;

//helpers
const createToken = require("../helpers/create-token");
const getToken = require("../helpers/get-token");
const getTokenUser = require("../helpers/get-token-user");
const verifyEmail = require("../helpers/verifyEmail");
const verifyPhone = require("../helpers/verifyPhone");
const verifyPassword = require("../helpers/verifyPassword");

//servicEmail recovery password
const sendRecoveryEmail = require("../services/emailService");

module.exports = class UserController {
  static async register(req, res) {
    const { name, email, phone, password, confirmpassword } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ message: "O nome é obrigatório para o cadastro!" });
    }

    if (!email) {
      return res
        .status(400)
        .json({ message: "O email é obrigatório para o cadastro!" });
    }

    if(!verifyEmail(email)) {
      return res.status(400).json({message: "Formato inválido de e-mail!"})
    }
    if (!phone) {
      res
        .status(400)
        .json({ message: "O número é obrigatório para o cadastro!" });
    }

    if(!verifyPhone(phone)) {
      return res.status(400).json({message: "Formato no número de contato inválido!"})
    }
    if (!password) {
      return res
        .status(400)
        .json({ message: "A senha é obrigatória para o cadastro!" });
    }

    if(!verifyPassword(password)) {
      return res.status(400).json({message: "A senha deve conter no mínimo 8 carácteres, 1 símbolo, 1 letra maiúscula e 1 minúscula!"})
    }

    if (!confirmpassword) {
      return res
        .status(400)
        .json({
          message: "A confirmação de senha é obrigatória para cadastro!",
        });
    }

    if (password !== confirmpassword) {
      return res
        .status(400)
        .json({
          message: "As senhas não batem, por favor verifique novamente",
        });
    }
    const userExists = await User.findOne({
      raw: true,
      where: { email: email },
    });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "Este e-mail já está sendo usado!" });
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      phone,
      password: passwordHash,
    });

    res
      .status(201)
      .json({
        message:
          "Registro realizado com sucesso! Vá para aba login para entrar!",
        user,
      });
  }

  static async login(req, res) {
    const { email, password } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ message: "Insira o e-mail para a realização do login!" });
    }
    if (!password) {
      return res
        .status(400)
        .json({ message: "Insira a senha para realizar o login!" });
    }
    const user = await User.findOne({ raw: true, where: { email: email } });
    if (!user) {
      return res
        .status(400)
        .json({ message: "E-mail ou senha inválidos!" });
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res
        .status(400)
        .json({ message: "E-mail ou senha inválidos!" });
    }

    await createToken(user, req, res);
  }

  static async checkUser(req, res) {
    let currentUser;

    if(req.headers.authorization) {
      const token = getToken(req);
      const decoded = jwt.verify(token, secret);
       currentUser = await User.findOne({raw: true, where: {id: decoded.id}});
      currentUser.password = null;
    } else {
      currentUser = null;
    }
             res.status(200).send( currentUser);
  }

  static async editUserProfile(req, res) {

    const token = getToken(req);
    const user = await getTokenUser(token);

    const {name, email, phone, password, confirmpassword} = req.body;

    if(!name) {
      return res.status(400).json({message: "Preencha o nome para realizar a atualização de dados"})
    }
     if(!email) {
      return res.status(400).json({message: "Preencha o email para realizar a atualização de dados"})
    }

     if(!verifyEmail(email)) {
      return res.status(400).json({message: "Formato inválido de e-mail para a edição!"})
    }

    
     if(!phone) {
      return res.status(400).json({message: "Preencha o número de telefone para realizar a atualização de dados"})
    }
 if(!verifyPhone(phone)) {
      return res.status(400).json({message: "Formato para edição de contato inválida!"})
    }

     if(!password) {
      return res.status(400).json({message: "Preencha a senha para realizar a atualização de dados"})
    }
     if(!confirmpassword) {
      return res.status(400).json({message: "Confirme a senha para realizar a atualização de dados"})
    }
   if(password !== confirmpassword) {
    return res.status(400).json({message: "As senhas não coicidem! Tente novamente"})
   }

  const checkPassword = await bcrypt.compare(password, user.password);
  if(!checkPassword) {
    return res.status(400).json({message: "A senha usada para realizar a atualização está incorreta, tente novamente!"})
  }



   const emailExists = await User.findOne({raw: true, where: {email: email}})

   if(user.email !== email && emailExists) {
  return res.status(400).json({message: "Este e-mail já está em uso, por favor insira outro email!"})
   }

   const userData = {
    name, 
    email,
    phone
   }

   await User.update(userData, {where: {id: user.id}});

   res.status(200).json({message: "Atualização realizada com sucesso!"})
   

  }

  //password forgot and reset

  static async forgotpassword(req, res, next) {
 const {email} = req.body;

if(!email) {
  return res.status(400).json({message: "Insira o e-mail para a recuperação de senha!"})
}

 try {

    const user = await User.findOne({where: {email: email}});

    if(!user) {
    return res.status(400).json({message: "Este usuário não existe!"});
}

const resetToken = jwt.sign(
  {userId: user.id},
  process.env.KEY_SECRET,
  {expiresIn: "1h"}
)

const resetLink = `${process.env.FRONTEND_URL}/resetpassword?token=${resetToken}`;

 sendRecoveryEmail(user.email, resetLink)

res.status(200).json({message: "A mensagem para recuperar a senha foi encaminhada para o e-mail abaixo. Verifique!", resetLink})



 } catch (error) {
  next(error);
 }

  }


  static async resetPassword (req, res) {

    const {newpassword, confirmpassword} = req.body;
    const token = getToken(req);
 
  if(!newpassword) {
    return res.status(400).json({message: "Insira a nova senha!"})
  }
   if(!verifyPassword(newpassword)) {
      return res.status(400).json({message: "A senha deve conter no mínimo 8 carácteres, 1 símbolo, 1 letra maiúscula e 1 minúscula!"})
    }

   if(!confirmpassword) {
    return res.status(400).json({message: "Confirme a nova senha!"})
  }

  if(newpassword !== confirmpassword) {
    return res.status(400).json({message: "As senhas não coincidem, tente novamente!"})
  }

 

  try {


    const decoded = jwt.verify(token, process.env.KEY_SECRET);
  
    const user = await User.findOne({where: {id: decoded.userId}})
  

    if(!user) {
      return res.status(400).json({message: "Usuário não encontrado!"})
    }
   const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(newpassword, salt);

    user.password = hashedPassword;

    await user.save();

    res.status(200).json({message: "Senha alterada com sucesso!"})
    
  } catch (error) {
  console.log(error);
    res.status(400).json({message: error})
    
  }

  }
};
