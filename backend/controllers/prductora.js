// Importar modelo Productora
const Productora = require("../models/productora");
const { request, response } = require("express");

// Método para crear una productora
const createProductora = async (req = request, res = response) => {
  const {
    nombre,
    estado,
    slogan,
    descripcion,
    fechaCreacion,
    fechaActualizacion,
  } = req.body;

  try {
    const productoraExistente = await Productora.findOne({ nombre });

    if (productoraExistente) {
      return res
        .status(400)
        .json({ mensaje: "Ya existe una productora con este nombre" });
    }

    const nuevaProductora = new Productora({
      nombre,
      estado,
      slogan,
      descripcion,
      fechaCreacion,
      fechaActualizacion,
    });

    await nuevaProductora.save();

    return res
      .status(201)
      .json({
        mensaje: "Productora creada con éxito",
        productora: nuevaProductora,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: "Error al crear la productora" });
  }
};

// Consultar todas las productoras
const consultarProductoras = async (req = request, res = response) => {
  try {
    const productoras = await Productora.find();
    return res.status(200).json(productoras);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ mensaje: "Error al consultar las productoras" });
  }
};

// Consultar una productora por su ID
const consultarProductoraPorId = async (req = request, res = response) => {
  const productoraId = req.params.id;

  try {
    const productora = await Productora.findById(productoraId);

    if (!productora) {
      return res.status(404).json({ mensaje: "Productora no encontrada" });
    }

    return res.status(200).json(productora);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ mensaje: "Error al consultar la productora" });
  }
};

// Actualizar una productora por su ID
// Método para actualizar una productora por su ID
const actualizarProductoraPorId = async (req = request, res = response) => {
  const productoraId = req.params.id;
  const {
    nombre,
    estado,
    slogan,
    descripcion,
    fechaCreacion,
    fechaActualizacion,
  } = req.body;

  try {
    const productora = await Productora.findById(productoraId);

    if (!productora) {
      return res.status(404).json({ mensaje: "Productora no encontrada" });
    }

    // Verificar si la productora está en estado activo para permitir la actualización
    if (productora.estado === "activo") {
      productora.nombre = nombre;
      productora.estado = estado;
      productora.slogan = slogan;
      productora.descripcion = descripcion;
      productora.fechaCreacion = fechaCreacion;
      productora.fechaActualizacion = fechaActualizacion;

      await productora.save();

      return res
        .status(200)
        .json({ mensaje: "Productora actualizada con éxito", productora });
    } else {
      return res
        .status(403)
        .json({ mensaje: "No se permite actualizar una productora inactiva" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ mensaje: "Error al actualizar la productora" });
  }
};

// Eliminar una productora por su ID
const eliminarProductoraPorId = async (req = request, res = response) => {
  const productoraId = req.params.id;

  try {
    const productora = await Productora.findByIdAndDelete(productoraId);

    if (!productora) {
      return res.status(404).json({ mensaje: "Productora no encontrada" });
    }

    return res.status(204).json(); //
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: "Error al eliminar la productora" });
  }
};

module.exports = {
  createProductora,
  consultarProductoras,
  consultarProductoraPorId,
  actualizarProductoraPorId,
  eliminarProductoraPorId,
};
