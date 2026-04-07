/*
    Campos:
        name
        lastName
        birthdate
        email
        password
        isVerified
        loginAttemps
        timeOut
        
*/

import mongoose, { Schema, model } from "mongoose";

const customersSchema = new Schema({
  name: {
    type: String,
  },
  lastName: {
    type: String,
  },
  birthdate: {
    type: Date,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  isVerified: {
    type: Boolean,
  },
  loginAttemps: {
    type: Number,
  },
  timeOut: {
    type: Date
  },
}, {
    timestamps: true, // Guardar el momento exacto en el que se guardo y cuantas versiones tiene 
    strict: false // Para lograr agregar campos nuevos
});

export default model("Customers", customersSchema);