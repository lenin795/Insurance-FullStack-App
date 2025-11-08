const app=require ('express')();
const parser = require('body-parser');
const connect= require('./mongo')
const port =3000;
const atlas=require('./atlas')
const auth = require('./usercontroller')
app.listen(port,()=>{
    console.log(`server is running port ${port}`)
})
connect()

app.use(parser.json())
app.use('/db',atlas)
app.use('/auth',auth)
