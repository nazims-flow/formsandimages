const express = require('express');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
const app = express();

cloudinary.config({
    //cloud_name: process.env.CLOUD_NAME
    cloud_name:"ddllqpyuz",
    api_key:"439345869317749",
    api_secret:"GoZ50aZbYAvtctr1VqXTdv4AnK4"
})

app.set('view engine', 'ejs');
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/"
}));


app.get("/myget", (req,res)=>{

   console.log(req.body);
   res.send(req.body);

})

app.post("/mypost", async (req,res)=>{

    console.log(req.body);
    console.log(req.body.firstname);
    console.log(req.files);

    let result;
    let imageArray=[];
     
    // case - multiple images

    if(req.files){
        for (let index = 0; index <req.files.samplefile.length; index++) {
           let result =await cloudinary.uploader.upload(req.files.samplefile[index].tempFilePath,{
               folder: "users"
           })
           
           imageArray.push({
               public_id: result.public_id,
               secure_url: result.secure_url
           })
        }
    }

    // use case for single image
    // let file = req.files.samplefile

    // result =await cloudinary.uploader.upload(file.tempFilePath ,{
    //     folder: 'users'
    // })


    

    details ={
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        result,
        imageArray
    }
    console.log(details);
    res.send(details);
 
 })
 
app.get("/mygetform", (req,res)=>{

    res.render('getform');

})

app.get("/mypostform", (req,res)=>{

    res.render('postform');

})

app.listen(4000 , ()=> console.log(`Server is running at port 4000`));