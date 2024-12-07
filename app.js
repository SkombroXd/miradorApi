const express = require('express');

const app = express();

const baseDatos = require('./baseDatos.js');

app.use(express.json());


// Mostrar / listar datos
app.get('/listaGastos',(req,res)=>{
    const query='SELECT * FROM gastos_c'
    baseDatos.query(query,(err,results)=>{
        if (err){
            console.log('Error en la consulta');
            res.status(404).send('No se encontro datos')
            return;
        }
        res.json(results);
    })
})


// Funcion de agregar datos
app.post('/agregarGastos',(req,res)=>{
    const {id, mes, annio, monto, pagado}=req.body
    const query='INSERT INTO gastos_c(id, mes, annio, monto, pagado) VALUES (?,?,?,?,?)'

    baseDatos.query(query,[id, mes, annio, monto, pagado],(err,results)=>{
        if (err){
            console.log('Error en la consulta');
            res.status(404).send('No se encontro datos')
            return;
        }
        res.status(201).send('Agregado exitosamente');
    })
})


// Funcion de actualizar datos
// Función de actualizar datos
app.put('/actualizarGastos', (req, res) => {
    const { id, mes, annio, monto, pagado } = req.body;

    // Validación básica de los datos
    if (!id || !mes || !annio || monto === undefined || pagado === undefined) {
        return res.status(400).send("Todos los campos son obligatorios");
    }

    const query = `
        UPDATE gastos_c
        SET monto = ?, pagado = ?
        WHERE id = ? AND mes = ? AND annio = ?
    `;

    // Orden correcto de los parámetros según la consulta
    baseDatos.query(query, [monto, pagado, id, mes, annio], (err, results) => {
        if (err) {
            console.error("Error al actualizar el pago:", err);
            return res.status(500).send("Error en el servidor");
        }

        if (results.affectedRows === 0) {
            return res.status(404).send("No se encontró el registro para actualizar");
        }

        console.log("Pago actualizado");
        res.status(200).send("Pago actualizado exitosamente");
    });
});


const PORT= process.env.PORT||3000;

app.listen(PORT,()=>{
    console.log('Conectado al puerto 3000');
})