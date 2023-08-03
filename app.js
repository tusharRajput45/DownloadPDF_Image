const express=require('express')
const app=express()

const dotenv=require('dotenv')
const Env=dotenv.config({path:__dirname+'/Config/.env'})
const PORT=process.env.PORT||3000;    

const DataBase=require('./config/database')

const route=require('./route/route')

const bodyParser=require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

const ejs=require('ejs')

app.set('view engine','ejs')
app.set('views',__dirname+"./views")
app.use(express.static(__dirname+'/public/image'))        


app.use("/",route)

app.listen(PORT,()=>{
    console.log('Server Is ruuning ');
})