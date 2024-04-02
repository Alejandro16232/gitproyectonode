const express = require('express');
const app = express();

app.use(express.json());

let productos = [
    { id: 1, nombre: 'Producto 1', precio: 10 },
    { id: 2, nombre: 'Producto 2', precio: 20 },
    { id: 3, nombre: 'Producto 3', precio: 30 }
  ];

app.get('/productos', (req, res) => {
res.json(productos);
});

app.post('/productos', (req, res) => {
    const nuevoProducto = req.body;
    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto);
});

app.put('/productos/:id', (req, res) => {
    const id = req.params.id;
    const productoActualizado = req.body;

    const indice = productos.findIndex(p => p.id == id);
    if (indice !== -1) {
        productos[indice] = productoActualizado;
        res.json(productoActualizado);
    } else {
        res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
});

app.delete('/productos/:id', (req, res) => {
    const id = req.params.id;

    const indice = productos.findIndex(p => p.id == id);
    if (indice !== -1) {
        const productoEliminado = productos.splice(indice, 1);
        res.json(productoEliminado);
    } else {
        res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor Express corriendo en el puerto ${port}`);
});
