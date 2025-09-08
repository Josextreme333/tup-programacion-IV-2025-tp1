const express = require('express');
const app = express();
app.use(express.json());

const tareas = [];

// POST: Crear tarea
app.post('/tareas', (req, res) => {
    const { nombre, completada } = req.body;
    if (!nombre || typeof completada !== 'boolean')
        return res.status(400).json({ error: "Datos incompletos" });

    if (tareas.find(t => t.nombre === nombre))
        return res.status(400).json({ error: "Tarea ya existe" });

    tareas.push({ nombre, completada });
    res.json({ message: "Tarea creada" });
});

// GET: Listar tareas, opcional filter ?completada=true/false
app.get('/tareas', (req, res) => {
    const { completada } = req.query;
    let result = tareas;
    if (completada !== undefined) {
        const valor = completada === 'true';
        result = tareas.filter(t => t.completada === valor);
    }
    res.json(result);
});

app.listen(5000, () => console.log('Servidor ejecutando en puerto 5000'));
