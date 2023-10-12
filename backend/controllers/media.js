const { request, response } = require("express");
const Media = require("../models/media");

// Método para crear una media
const createMedia = async (req = request, res = response) => {
  const {
    serial,
    titulo,
    sinopsis,
    url,
    imagen,
    anoEstreno,
    genero,
    director,
    productora,
    tipo,
  } = req.body;

  try {
    const mediaExistente = await Media.findOne({ serial });

    if (mediaExistente) {
      return res
        .status(400)
        .json({ mensaje: "La media con este serial ya existe" });
    }

    const nuevaMedia = new Media({
      serial,
      titulo,
      sinopsis,
      url,
      imagen,
      anoEstreno,
      genero,
      director,
      productora,
      tipo,
    });

    await nuevaMedia.save();

    return res
      .status(201)
      .json({ mensaje: "Media creada con éxito", media: nuevaMedia });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: "Error al crear la media" });
  }
};

// Consultar todas las medias con sus referencias
const consultarMedias = async (req = request, res = response) => {
  try {
    const medias = await Media.find()
      .populate("genero")
      .populate("director")
      .populate("productora")
      .populate("tipo");

    return res.status(200).json(medias);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: "Error al consultar las medias" });
  }
};

//Consultar una media por su ID con sus referencias
const consultarMediaPorId = async (req = request, res = response) => {
  const mediaId = req.params.id;

  try {
    const media = await Media.findById(mediaId)
      .populate("genero")
      .populate("director")
      .populate("productora")
      .populate("tipo");

    if (!media) {
      return res.status(404).json({ mensaje: "Media no encontrada" });
    }

    return res.status(200).json(media);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: "Error al consultar la media" });
  }
};

// Actualizar una media por su ID
const actualizarMediaPorId = async (req = request, res = response) => {
  const mediaId = req.params.id;
  const {
    serial,
    titulo,
    sinopsis,
    url,
    imagen,
    anoEstreno,
    genero,
    director,
    productora,
    tipo,
  } = req.body;

  try {
    const media = await Media.findById(mediaId);

    if (!media) {
      return res.status(404).json({ mensaje: "Media no encontrada" });
    }

    media.serial = serial;
    media.titulo = titulo;
    media.sinopsis = sinopsis;
    media.url = url;
    media.imagen = imagen;
    media.anoEstreno = anoEstreno;
    media.genero = genero;
    media.director = director;
    media.productora = productora;
    media.tipo = tipo;

    await media.save();

    return res
      .status(200)
      .json({ mensaje: "Media actualizada con éxito", media });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: "Error al actualizar la media" });
  }
};

// Eliminar una media por su ID
const eliminarMediaPorId = async (req = request, res = response) => {
  const mediaId = req.params.id;

  try {
    const media = await Media.findByIdAndDelete(mediaId);

    if (!media) {
      return res.status(404).json({ mensaje: "Media no encontrada" });
    }

    return res.status(204).json(); //.
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: "Error al eliminar la media" });
  }
};

module.exports = {
  createMedia,
  consultarMedias,
  consultarMediaPorId,
  actualizarMediaPorId,
  eliminarMediaPorId,
};
