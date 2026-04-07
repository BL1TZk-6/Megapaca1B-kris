import nodemailer from "nodemailer"; // Enviar correo
import crypto from "crypto"; // Generar codigo aleatorio
import jsonwebtoken from "jsonwebtoken"; // Token
import bcryptjs from "bcryptjs"; // Encriptar

import customerModel from "../models/customers.js";

// Array de funciones
const registerCustomerController = {};

registerCustomerController.register = async (req, res) => {
    // 1 - Solicitar los Datos
    const {
        name,
        lastName,
        birthdate,
        email,
        password,
        isVerified,
    } = req.body;

    try{

    } catch (error) {

    }
};