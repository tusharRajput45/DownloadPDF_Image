const express=require('express')
const imagecontroller = require('../controller/imageController')
const route=express()


const path=require('path')
const multer=require('multer');

const storage=multer.diskStorage({
    destination:function(req,file,cb){
       cb(null,path.join(__dirname,'../public/image'))
    },
    filename:function(req,file,cb){
       const filename=Date.now()+'-'+ file.originalname;
       cb(null,filename)
    }
})

const upload=multer({storage:storage})


route.get('/',(req,res)=>{
    res.render('home')
})
route.post('/upload-image',upload.single('image'),imagecontroller.imageUpload)
route.get('/all-image',imagecontroller.allImage)
route.get('/load-image',imagecontroller.loadImage)

route.get('/download-image',imagecontroller.downloadImage)



module.exports=route