const app=require ('express')();
const parser = require('body-parser');
const connect= require('./mongo')
const port =3000;
app.listen(port,()=>{
    console.log(`server is running port ${port}`)
})
connect()