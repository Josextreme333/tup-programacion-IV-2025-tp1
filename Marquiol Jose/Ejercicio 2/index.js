const express = require('express');
const app = express();
app.use(express.json());

const alumnos = [];

// POST: Agregar alumno
app.post('/alumnos', (req, res) => {
    const { nombre, notas } = req.body;
    if (!nombre || !notas || notas.length !== 3)
        return res.status(400).json({ error: "Faltan datos o notas incompletas" });

    if (alumnos.find(a => a.nombre === nombre))
        return res.status(400).json({ error: "Alumno ya existe" });

    alumnos.push({ nombre, notas });
    res.json({ message: "Alumno agregado" });
});

// PUT: Modificar notas de un alumno
app.put('/alumnos/:nombre', (req, res) => {
    const { nombre } = req.params;
    const { notas } = req.body;
    if (!notas || notas.length !== 3)
        return res.status(400).json({ error: "Notas incompletas" });

    const alumno = alumnos.find(a => a.nombre === nombre);
    if (!alumno) return res.status(404).json({ error: "Alumno no encontrado" });

    alumno.notas = notas;
    res.json({ message: "Notas actualizadas" });
});

// GET: Listar alumnos con promedio y estado
app.get('/alumnos/:nombre', (req, res) => {
    const alumno = alumnos.find(a => a.nombre === req.params.nombre);
    if (!alumno) return res.status(404).json({ error: "Alumno no encontrado" });

    const promedio = alumno.notas.reduce((a, b) => a + b, 0) / alumno.notas.length;
    let estado;
    if (promedio < 6) estado = "reprobado";
    else if (promedio < 8) estado = "aprobado";
    else estado = "promocionado";

    res.json({ ...alumno, promedio, estado });
});

app.listen(5000, () => console.log('Servidor funcionando en puerto 5000'));
