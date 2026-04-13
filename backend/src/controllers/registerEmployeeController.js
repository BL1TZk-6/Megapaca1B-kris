import nodemailer from "nodemailer"; // Enviar correo
import crypto from "crypto"; // Generar codigo aleatorio
import jsonwebtoken from "jsonwebtoken"; // Token
import bcryptjs from "bcryptjs"; // Encriptar

import employeeModel from "../models/employees.js";

import { config } from "../../config.js";

// Array de funciones
const registerEmployeeController = {};

registerEmployeeController.register = async (req, res) => {
  // 1 - Solicitar los Datos
  const {
    name,
    lastName,
    salary,
    DUI,
    phone,
    email,
    password,
    idBranches,
    isVerified,
  } = req.body;

  try {
    // Validar que el correo no exista en la base de datos
    const existsEmployee = await employeeModel.findOne({ email });
    if (existsEmployee) {
      return res.status(400).json({ message: "Employee already exists" });
    }

    // Encriptar la contraseña
    const passwordHashed = await bcryptjs.hash(password, 10); // El número 10 es por la cantidad de veces que se encripta ("salt numbers")

    // Generar un código aleatorio
    const randomNumber = crypto.randomBytes(3).toString("hex"); // hexadecimal

    // Guardamos en un token la información
    const token = jsonwebtoken.sign(
      // 1- ¿Qué vamos a guardar?
      {
        randomNumber,
        name,
        lastName,
        salary,
        DUI,
        phone,
        email,
        password: passwordHashed,
        idBranches,
        isVerified,
      },
      // 2- Secret Key
      config.JWT.secret,
      // 3- Cuando expira
      { expiresIn: "15m" },
    );

    res.cookie("registrationCookie", token, { maxAge: 15 * 60 * 1000 });

    // ENVIAMOS EL CÓDIGO ALEATORIO POR CORREO ELECTRÓNICO
    // 1- Transporter -> ¿Quién envía el correo?
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.email.user_email,
        pass: config.email.user_password,
      },
    });

    // 2- mailOption -> ¿Quién lo recibe y cómo?
    const mailOptions = {
      from: config.email.user_email,
      to: email,
      subject: "Código de Verificación de Cuenta",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 10px; padding: 20px; text-align: center;">
        <h2 style="color: #4A90E2;">Verificación de Cuenta</h2>
        <p>Utiliza el siguiente código para validar tu acceso:</p>
        <div style="background: #f4f4f7; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #333;">${randomNumber}</span>
        </div>
        <p style="color: #999; font-size: 14px;">Este código <strong>expira en 15 minutos</strong>.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 12px; color: #bbb;">Si no intentaste registrarte, ignora este mensaje.</p>
        </div>
    `,
    };

    // 3- Enviar el correo
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("error " + error);
        return res.status(500).json({ message: "Error sending email" });
      }
      return res.status(200).json({ message: "Email sent" });
    });
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// VERIFICAR EL CÓDIGO QUE ACABAMOS DE ENVIAR
registerEmployeeController.verifyCode = async (req, res) => {
  try {
    //Solicitamos el código que escribieron en el frontend
    const { verificationCodeRequest } = req.body;

    // Obtener el token de las cookies
    const token = req.cookies.registrationCookie;

    // Extraer toda la información del token
    const decoded = jsonwebtoken.verify(token, config.JWT.secret);
    const {
      randomNumber: storedCode,
      name,
      lastName,
      salary,
      DUI,
      phone,
      email,
      password,
      idBranches,
      isVerified,
    } = decoded;

    // Comparar lo que el usuario escribió con el código que está en el token
    if (verificationCodeRequest != storedCode) {
      return res.status(400).json({ message: "Invalid code" });
    }

    // Sí todo está bien, y el usuario escribe el código, lo registramos en la BD
    const NewEmployee = new employeeModel({
      name,
      lastName,
      salary,
      DUI,
      phone,
      email,
      password,
      idBranches,
      isVerified: true,
    });

    await NewEmployee.save();

    // Limpiar la Cookie
    res.clearCookie("registrationCookie");

    // Retornamos la respuesta del registro exitoso
    return res.status(200).json({ message: "Employee registered" });
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default registerEmployeeController;
