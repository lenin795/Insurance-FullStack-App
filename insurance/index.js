const app=require ('express')();
const parser = require('body-parser');
const connect= require('./mongo')
const port =3000;
const atlas=require('./atlas')
const auth = require('./usercontroller')
const cors = require('cors');

app.listen(port,()=>{
    console.log(`server is running port ${port}`)
})
connect()
app.use(cors({ origin: 'http://localhost:3001' }));
app.use(parser.json())
app.use('/db',atlas)
app.use('/auth',auth)
