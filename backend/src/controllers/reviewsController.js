// Creamos un array de funciones
const reviewsController = {};

// Importo el Schema de la colección que voy a utilizar
import reviewsModel from "../models/reviews.js";

// SELECT
reviewsController.getReviews = async (req, res) => {
  const reviews = await reviewsModel.find();
  res.json(reviews);
};

// INSERT
reviewsController.insertReview = async (req, res) => {
  // 1- Solicito los datos
  const { idEmployee, idProducts, rating, comment } = req.body;

  // 2- Lleno mi modelo con los datos que acabo de pedir
  const newReview = new reviewsModel({
    idEmployee,
    idProducts,
    rating,
    comment,
  });

  // 3- Guardo todo en la base de datos
  await newReview.save();

  res.json({ message: "Review saved" });
};

// DELETE
reviewsController.deleteReviews = async (req, res) => {
  await reviewsModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Review deleted" });
};

// UPDATE
reviewsController.updateReviews = async (req, res) => {
  const { idEmployee, idProducts, rating, comment } = req.body;

  await reviewsModel.findByIdAndUpdate(
    req.params.id,
    {
      idEmployee,
      idProducts,
      rating,
      comment,
    },
    { new: true },
  );

  res.json({ message: "Review updated" });
};

export default reviewsController;
