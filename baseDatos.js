const mysql=require('mysql2')

const conexion=mysql.createConnection({
    host:'localHost',
    port:'3306',
    user:'root',
    password:'',
    database:'mirador'
})

conexion.connect((err)=>{
    if(err){
        console.log('Error al conectar');
        return;
    }
    console.log('Conectado')
});

module.exports=conexion;