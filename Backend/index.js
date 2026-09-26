const port=4000;
const express=require("express");
// using exoress we can create our app instance

const app=express();
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const multer=require("multer");

const path=require("path");// using this we an get the backend directory express path
const cors=require("cors");


app.use(express.json());
app.use(cors());

//initilize db with mongodb

// here moongose connection 

mongoose.connect();


// creat a schema for products

const Product=mongoose.model("Product",{
    id:{
        type:Number,
        required:true,

    },
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true,

    },
    new_price:{
        type:Number,
        required:true
    },
    old_price:{
        type:Number,
        required:true
    },
    data:{
        type:Date,
        default:Date.now
    },
    avilable:{
        type:Boolean,
        default:true 
    },


})



app.post('/addproduct',async(req,res)=>{
    let products=await Product.find({});
    let id;
    if(products.length>0){
        let last_product_array=products.slice(-1);
        let last_prodcut=last_product_array[0];
        id=last_prodcut.id+1;
    }
    else{
        id=1;
    }
    const product=new Product({

        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,

    });
    console.log(product);
    await product.save();
    console.log("saved");
    res.json({
        success:true,
        name:req.body.name,
    })

})




// for new collections

app.get('/newcollections',async(req,res)=>{
    let products=await Product.find({});
    let newcollection=products.slice(1).slice(-8);
    console.log("New col fetched")

    res.send(newcollection);
})





app.get("/",(req,res)=>{
    res.send("running")
})

// create api to delete prod
app.post('/removeproduct',async(req,res)=>{
    await Product.findOneAndDelete({ id: req.body.id });
    // use find one and delete method in mongoose
    console.log("removed");

    res.json({
        success:true,
        name:req.body.name
    })

})

// create api for getting all products

app.get('/allproducts',async(req,res)=>{
    let products=await Product.find({});
    console.log("all fetched");
    res.send(products);

})



// user model

const user=mongoose.model('Users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartdata:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now
    },
    payment:{
        type:String
    },
    address:{
        type:String
    },
    pincode:{
        type:Number
    },
    phone:{
        type:Number
    }


})


// api for user

app.post('/signup',async(req,res)=>{
console.log("BODY:", req.body);
    let check=await user.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false,errors:"found"});
    }
        let cart={}
        for(let i=0;i<300;i++){
            cart[i]=0;

        }
        const userr=new user({
            name:req.body.username,
            email:req.body.email,
            password:req.body.password,
            cartdata:cart,
        })        
        await userr.save();

    const data={
        user:{
            id:userr.id
        }
    }

    const token=jwt.sign(data,'secret_ecom');
    res.json({success:true,token})

})



app.post('/login',async(req,res)=>{
    let userrr=await user.findOne({email:req.body.email});
    if(userrr){
        const passcompare=req.body.password===userrr.password;
        if(passcompare){
            const data={
                user:{
                    id:userrr.id
                }
            }
            const token=jwt.sign(data,'secret_ecom');
            res.json({success:true,token});
        }
        else{
            res.json({success:false ,errors:"Error password"});
        }
    }
    else{
        res.json({success:false,errors:"wrong email.id"});
    }
})

// popular in women

app.get('/popularinwomen',async(req,res)=>{
    let products=await Product.find({category:"women"});
    let popular_in_women=products.slice(0,4);
    console.log("pop is fetched");
    res.send(popular_in_women);
})

// create middleware to fetch user

const fetchuser=async(req,res,next)=>{
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({errors:"Authenticate using vaild "})
    }
    else{
        try{
            const data=jwt.verify(token,'secret_ecom');
            req.user=data.user;
            next();
        } catch(error){
            res.status(401).send({errors:"pls authenticate"})
        }
    }

}

// api for payment

app.post('/payment',fetchuser ,async(req,res)=>{
    await user.findOneAndUpdate({ _id: req.user.id },{address:req.body.address,
        pincode:req.body.pincode,
        phone:req.body.phone,
        payment:req.body.payment,
        total:req.body.total
        });
    res.json({
        success:true,
        message:"Saved"
    })
    console.log(req.body);
    console.log("done with the payment");
})

// for cart data

app.post('/cartitem',fetchuser,async(req,res)=>{
    console.log("added",req.body.itemId);
    let userdata=await user.findOne({_id:req.user.id})
    userdata.cartdata[req.body.itemId] =(userdata.cartdata[req.body.itemId] || 0) + 1;
    await user.findOneAndUpdate({_id:req.user.id},{cartdata:userdata.cartdata})
    res.json({
    success:true,
    message:"Added"
})
})



// remove cart data

app.post('/removefromcart',fetchuser,async(req,res)=>{
    console.log("removed",req.body.itemId);
    let userdata=await user.findOne({_id:req.user.id})
    userdata.cartdata[req.body.itemId] =(userdata.cartdata[req.body.itemId] || 0) - 1;
    await user.findOneAndUpdate({_id:req.user.id},{cartdata:userdata.cartdata})
    res.json({
    success:true,
    message:"Removed"
})
})

// to get cart data

app.post('/getcart',fetchuser,async(req,res)=>{
    console.log("get cart");
    let userdata=await user.findOne({_id:req.user.id})
    res.json(userdata.cartdata);
})



 app.listen(port,(error)=>{
    if(!error){
        console.log("Running "+port)
    }
    else{
        console.log("Error"+error);
    }
 });

// img engine

const storage=multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload=multer({storage:storage})

// end point to upload images 


app.use('/images',express.static('upload/images'))


app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,// succees upload
        imageurl:`http://localhost:${port}/images/${req.file.filename}`
    })
})
 

