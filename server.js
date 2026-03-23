const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// CRUD en memoria con IDs únicos
let usuarios = [];
let nextId = 1;

// Obtener todos los usuarios
app.get('/usuarios', (req, res) => {
  res.json(usuarios);
});

// Crear usuario
app.post('/usuarios', (req, res) => {
  const { name } = req.body;
  
  if (!name || name.trim() === '') {
    return res.status(400).json({ error: 'El nombre es requerido' });
  }
  
  const newUser = {
    id: nextId++,
    name: name.trim(),
    createdAt: new Date().toISOString()
  };
  
  usuarios.push(newUser);
  res.status(201).json(newUser);
});

// Actualizar usuario
app.put('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  
  if (!name || name.trim() === '') {
    return res.status(400).json({ error: 'El nombre es requerido' });
  }
  
  const userIndex = usuarios.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  
  usuarios[userIndex].name = name.trim();
  usuarios[userIndex].updatedAt = new Date().toISOString();
  
  res.json(usuarios[userIndex]);
});

// Eliminar usuario
app.delete('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = usuarios.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  
  usuarios.splice(userIndex, 1);
  res.json({ message: 'Usuario eliminado correctamente' });
});

// Ruta para cualquier otra solicitud (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
  console.log(`📝 CRUD de usuarios disponible`);
});