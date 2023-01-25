/*
    Rutas de usuarios / Auth
    host + /api/auth
*/

import { Router } from "express";
import { check } from "express-validator";

import { newUser, loginUser, renewToken } from "../controllers/auth.js";
import { fieldsValidator } from "../middlewares/fieldsValidator.js";
import { jwtValidator } from "../middlewares/jwtValidator.js";

const router = Router();

router.post(
  "/new",
  [
    check("name", "el nombre es obligatorio").not().isEmpty(),
    check("email", "el email es obligatorio").isEmail(),
    check("password", "la contraseña de ser de 6 caracteres").isLength({
      min: 6,
    }),
    fieldsValidator,
  ],
  newUser
);

router.post(
  "/",
  [
    check("email", "el email es obligatorio").isEmail(),
    check("password", "la contraseña de ser de 6 caracteres").isLength({
      min: 6,
    }),
    fieldsValidator,
  ],
  loginUser
);

router.get("/renew", jwtValidator, renewToken);

export default router;
