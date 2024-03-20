// Importamos el módulo express
const express = require('express');

// Creamos una instancia de la aplicación Express
const app = express();

// Importamos el módulo cors para permitir solicitudes CORS
const cors = require('cors');

// Configuramos la aplicación para usar JSON como formato de datos para las solicitudes
app.use(express.json());

// Configuramos la aplicación para permitir solicitudes CORS
app.use(cors());

// Creamos un array vacío para almacenar las canciones
let canciones = [];

// Definimos una ruta para obtener todas las canciones
app.get('/canciones', (req, res) => {
    res.json(canciones);
});

// Definimos una ruta para obtener una canción por su ID
app.get('/canciones/:id', (req, res) => {
    // Obtenemos el ID de la canción de los parámetros de la solicitud
    const id = req.params.id;
    // Buscamos la canción en el array de canciones
    const cancion = canciones.find(c => c.id === id);
    // Si se encuentra la canción, la devolvemos con un código de estado 200 (OK)
    // Si no se encuentra la canción, devolvemos un error con un código de estado 404 (No encontrado)
    if (cancion) {
        res.status(200).json(cancion);
    } else {
        res.status(404).json({ error: "La canción no se encuentra" });
    }
});

// Definimos una ruta para crear una nueva canción
app.post('/canciones', (req, res) => {
    // Obtenemos los datos de la nueva canción del cuerpo de la solicitud
    const nuevaCancion = req.body;
    // Generamos un ID aleatorio para la nueva canción
    nuevaCancion.id = parseInt(Math.random() * 10);
    // Añadimos la nueva canción al array de canciones
    canciones.push(nuevaCancion);
    // Devolvemos la nueva canción con un código de estado 201 (Creado)
    res.status(201).json(nuevaCancion);
});

// Definimos una ruta para actualizar una canción existente por su ID
app.put('/canciones/:id', (req, res) => {
    // Obtenemos el ID de la canción de los parámetros de la solicitud
    const id = req.params.id;
    // Buscamos el índice de la canción en el array de canciones
    const cancionIndex = canciones.findIndex(c => c.id === id);
    // Si la canción existe, la actualizamos con los datos de la solicitud
    // Si no existe, devolvemos un error con un código de estado 404 (No encontrado)
    if (cancionIndex !== -1) {
        canciones[cancionIndex] = { ...canciones[cancionIndex], ...req.body };
        res.status(200).json(canciones[cancionIndex]);
    } else {
        res.status(404).json({ error: "Canción no encontrada" });
    }
});

// Definimos una ruta para eliminar una canción por su ID
app.delete('/canciones/:id', (req, res) => {
    // Obtenemos el ID de la canción de los parámetros de la solicitud
    const id = req.params.id;
    // Filtramos las canciones para eliminar la canción con el ID especificado
    canciones = canciones.filter(c => c.id !== id);
    // Enviamos una respuesta con un código de estado 204 (Sin contenido)
    res.sendStatus(204);
});

// Definimos el puerto en el que la aplicación escuchará las solicitudes
const PORT = process.env.PORT || 3000; 

// Iniciamos el servidor y lo hacemos escuchar en el puerto especificado
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto 'http://localhost:3000`);
});

// Exportamos la aplicación para poder utilizarla en otros archivos, como en los tests
module.exports = app;
