// Creo un array de funciones
const branchesController = {};

//Importo la colección que voy a utilizar
import branchesModel from "../models/branches.js";

// SELECT
branchesController.getbranches = async (req, res) => {
  const branches = await branchesModel.find(); //.find trae todas las sucursales
  res.json(branches);
};

// INSERT
branchesController.insertBranches = async (req, res) => {
  // 1- Solicito los datos que voy a guardar
  const { name, address, schedule, isActive } = req.body; // Lo que se pide al frontend

  // 2- Llenar el modelo con estos datos
  const newBranch = new branchesModel({ name, address, schedule, isActive });

  // 3- Guardar todo en la base de datos
  await newBranch.save();

  res.json({ message: "Branch saved" });
};

// DELETE
branchesController.deleteBranches = async (req, res) => {
  // Enviamos el ID de la branch a borrar
  await branchesModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Branch Deleted" });
};

// UPDATE
branchesController.updateBranches = async (req, res) => {
  // 1- Solicito los nuevos datos
  const { name, address, schedule, isActive } = req.body;

  // 2- Actualizo
  await branchesModel.findByIdAndUpdate(
    req.params.id,
    {
      name,
      address,
      schedule,
      isActive,
    },
    { new: true },
  );

  res.json({ message: "Branch updated" });
};

export default branchesController;