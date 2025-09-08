const express = require('express');
const app = express();
app.use(express.json());

const calculos = [];

// POST: Agregar un rectángulo
app.post('/rectangulos', (req, res) => {
    const { base, altura } = req.body;
    if (!base || !altura) return res.status(400).json({ error: "Faltan datos" });

    const perimetro = 2 * (base + altura);
    const superficie = base * altura;
    calculos.push({ base, altura, perimetro, superficie });
    res.json({ message: "Cálculo guardado" });
});

// GET: Listar cálculos con tipo
app.get('/rectangulos', (req, res) => {
    const result = calculos.map(r => ({
        ...r,
        tipo: r.base === r.altura ? 'cuadrado' : 'rectángulo'
    }));
    res.json(result);
});

//borrar calculo
app.delete("/rectangulos/:index", (req, res) => {
  const index = parseInt(req.params.index);

  if (isNaN(index) || index < 0 || index >= calculos.length) {
    return res.status(404).json({
      success: false,
      message: "calculo no encontrado",
    });
  }

  const eliminado = calculos[index];
  calculos.splice(index, 1);

  res.json({ success: true, data: eliminado });
});

app.listen(5000, () => console.log('Servidor escuchando en puerto 5000'));
