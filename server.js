const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // sirve los archivos HTML/CSS

// CRUD simple en memoria
let usuarios = [];

// Obtener usuarios
app.get('/usuarios', (req, res) => {
  res.json(usuarios);
});

// Crear usuario
app.post('/usuarios', (req, res) => {
  const { name } = req.body;
  const id = usuarios.length + 1;
  usuarios.push({ id, name });
  res.json({ ok: true });
});

// Actualizar usuario
app.put('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = usuarios.find(u => u.id == id);
  if (user) {
    user.name = name;
    res.json({ ok: true });
  } else {
    res.status(404).json({ error: 'Usuario no encontrado' });
  }
});

// Eliminar usuario
app.delete('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  usuarios = usuarios.filter(u => u.id != id);
  res.json({ ok: true });
});

// Inicio
app.listen(port, () => console.log(`Servidor corriendo en puerto ${port}`));