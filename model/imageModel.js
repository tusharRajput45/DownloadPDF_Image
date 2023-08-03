const mongoose =require('mongoose')


const Schema=new mongoose.Schema({
    name:{
        type:String
    },
    image:{
        type:String
    }
})
const imageModel=mongoose.model('images',Schema)

module.exports=imageModel