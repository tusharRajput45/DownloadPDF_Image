const imageModel = require("../model/imageMOdel");
const puppeteer=require('puppeteer')
const path=require('path')

const imageUpload=async(req,res)=>{
    try {
        if (req.body) {
            const data=new imageModel({
                name:req.body.name,
                image:req.file.path,
            })
            const saveData=await data.save()
            if (saveData) {
                res.send('Successfully Save Image')
            } else {
                res.send('request failed')
            }
        } else {
            res.send('request failed')
        }
    } catch (error) {
        console.log(error.message);
    }
}
const allImage=async(req,res)=>{
      try {
         const result=await imageModel.find()
         if (result) {
            res.render('allImages',{Result:result})
         }
      } catch (error) {
        console.log(error.message);
      }
}
const loadImage=async(req,res)=>{
    try {
        const result=await imageModel.findOne({_id:req.query._id})
        if (result) {
            res.render('loadImage',{Result:result})
        }
     } catch (error) {
       console.log(error.message);
     }
}
const downloadImage=async(req,res)=>{
    try {
        const _id=req.query._id
        const browser = await puppeteer.launch();

        // `${req.protocal}://${req.get('host')}`+"/all-image"
        const page = await browser.newPage();
    
        await page.goto(`http://localhost:3000/load-image?_id=${_id}`, { waitUntil: 'networkidle2' });

        const todayDate=new Date()
    
        const pdfOptions = {
          path: `${path.join(__dirname,'../public/files',todayDate.getTime()+".pdf")}`, 
          printbackground:true,
          format: 'A4', 
        };
        await page.pdf(pdfOptions);
    
        await browser.close();
        const pdfURL=path.join(__dirname,'../public/files',todayDate.getTime()+".pdf")
        // res.sendFile(path.join(__dirname,'../public/files',todayDate.getTime()+".pdf"))
        res.download(pdfURL,function(err){ 
            if (err) {
                console.log(err.message);
            } else {
                console.log('PDF generated and downloaded successfully!');
            }
        })
      } catch (error) {
        console.error('Error occurred while generating or downloading the PDF:', error);
      }
}
module.exports={
    imageUpload,
    allImage,
    loadImage,
    downloadImage,
}