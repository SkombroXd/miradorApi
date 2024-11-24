const express = require('express');

const app = express();

const baseDatos = require('./baseDatos.js');

app.use(express.json());

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

const PORT= process.env.PORT||3000;

app.listen(PORT,()=>{
    console.log('Conectado al puerto 3000');
})