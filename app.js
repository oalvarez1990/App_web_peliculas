const { mongoConn } = require("./databases/configuration");
const dotenv = require("dotenv").config();
const express = require("express");

const app = express();

mongoConn();
app.use(express.json());

const test = require("./routes/test");
const generos = require("./routes/genero");
const director = require("./routes/director");
const productora = require("./routes/productora");
const tipo = require("./routes/tipo");
const media = require("./routes/media");

app.use("/api/v1/tests", test);
app.use("/api/v1/generos", generos);
app.use("/api/v1/directores", director);
app.use("/api/v1/productoras", productora);
app.use("/api/v1/tipos", tipo);
app.use("/api/v1/medias", media);

module.exports = app;
