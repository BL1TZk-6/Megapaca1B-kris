/*
    Campos
        name
        description
        price
        stock
*/

import { Schema, model } from "mongoose";

const productsSchema = new Schema({
    name:{
        type: String
    },
    description:{
        type: String
    },
    price: {
        type: Number
    },
    stock: {
        type: Number
    }
}, {
    timestamps: true,
    strict: false // False para poder agregar más campos a la colección
})

export default model("products", productsSchema)