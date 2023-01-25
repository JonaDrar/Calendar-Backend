import { response } from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createJWT } from "../helpers/jwt.js";

export const newUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "Ya existe un usuario con este correo",
      });
    }

    user = new User(req.body);

    //Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    const token = await createJWT( user.id, user.name )

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Comuníquese con el administrador",
    });
  }
};

export const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "No existe un usuario con este correo",
      });
    }

    //Confirmar las contraseñas
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Contraseña incorrecta",
      });
    }

    //Generear JWT
    const token = await createJWT( user.id, user.name )

    res.status(200).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Comuníquese con el administrador",
    });
  }
};

export const renewToken = async (req, res = response) => {

  const uid = req.uid;
  const name = req.name;

  const token = await createJWT( uid, name )

  res.json({
    ok: true,
    token,
    uid,
    name
  });
};
