const bcryptjs = require("bcryptjs");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const signIn = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return res.status(400).json({
        ok: false,
        message: "Ya existe correo",
      });
    }

    const salt = bcryptjs.genSaltSync();
    const user = new User({ name, email, password });

    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    const token = await jwt.sign(
      {
        data: {
          id: user.id,
          name,
          email,
        },
      },
      process.env.secret,
      {}
    );

    return res.status(200).json({
      ok: true,
      message: "Usuario creado con éxito",
      user,
      token,
    });
  } catch (e) {
    return res.status(400).json({
      ok: false,
      message: "Error inesperado",
    });
  }
};

const login = async (req, res = response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        message: "Email o contraseña incorrectos",
      });
    }
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        message: "Email o contraseña incorrectos",
      });
    }

    // Generar el JWT
    const token = await jwt.sign(
      {
        data: {
          id: user.id,
          name: user.name,
          email,
        },
      },
      process.env.secret,
      {}
    );

    return res.json({
      ok: true,
      user,
      token,
    });
  } catch (e) {
    return res.status(400).json({
      ok: false,
      message: "Error inesperado",
    });
  }
};

const checkUser = async (req, res = response) => {
  return res.status(200).json({
    ok: true,
    user: req.user,
  });
};

module.exports = {
  signIn,
  login,
  checkUser,
};
