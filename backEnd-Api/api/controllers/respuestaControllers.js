const pool = require("../config/config.js");

const getMensaje = (req, res) => {
  pool.query("SELECT * FROM respuesta", (err, result) => {
    if (err) {
      throw err;
    }
    res.status(200).json(result.rows);
  });
};

const createMensaje = (req, res) => {
  const { identificador, fecha, respuesta, con_respuesta } = req.body;
  console.log([identificador, fecha, respuesta, con_respuesta]);
  pool.query(
    "INSERT INTO respuesta (identificador, fecha, respuesta, con_respuesta) VALUES ($1, $2, $3, $4)",
    [identificador, fecha, respuesta, con_respuesta],
    (err) => {
      if (err) {
        throw err;
      }
      res.status(201).send("Usuario añadido correctamente");
    }
  );
};

const getMensajeByIdentificador = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(
    "SELECT * FROM respuesta WHERE identificador = $1",
    [id],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.status(200).json(result.rows);
    }
  );
};

module.exports = {
  getMensaje,
  createMensaje,
  getMensajeByIdentificador,
};
