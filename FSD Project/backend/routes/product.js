const router = require("express").Router();

const Product = require("../models/Product");
const{
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAdmin
} = require("./verifyToken");

    router.post("/",verifyTokenAdmin,async(req,res)=>{
    const newProduct = new Product(req.body)
    try{
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
    }catch(err){
        res.status(500).json(err);
    }
    });

    //update
     router.put("/:id",verifyTokenAdmin,async(req,res)=>{
        try{
            const updatedProduct = await Product.findByIdAndUpdate(
                req.params.id,{
                    $set:req.body,
                },{ new :true }
            );
            res.status(200).json(updatedProduct);
        }catch(err){
            res.status.json(500)(err);
        }
        });

        // delete 
        router.delete("/:id",verifyTokenAdmin,async(req,res)=>{
            try{
                await Product.findByIdAndDelete(req.params.id);
                res.status(200).json("product deleted");
            }catch(err){
                res.status(500).json(err);
            }
        });    

        // get product

        router.get("/find/:id",async(req,res)=>{
            try{
                const product = await Product.findById(req.params.id);
                res.status(200).json(product);
            }catch(err){
                res.status(500).json(err);

            }
        });

        //get all products

        router.get("/",async(req,res)=>{
            const qNew = req.query.new;
            const qCategory = req.query.category;
            try{
                let products;
                if(qNew){
                    products = await Product.find().sort({createdAt:-1}).limit(1)
                } else if (qCategory){
                    products = await Product.find({categories:{
                        $in : [qCategory],
                    },
                });
                }else{
                    products = await Product.find();
                }
                res.status(200).json( products);
            }catch(err){
                res.status(500).json(err);

            }
        });
        router.get('/search', async (req, res) => {
            try {
              console.log('Incoming search request:', req.query);
          
              const searchTerm = req.query.q;
          
              if (!searchTerm) {
                return res.status(400).json({ message: 'Search term is required' });
              }
          
              const regex = new RegExp(searchTerm, 'i'); // Case-insensitive search
          
              const products = await Product.find({ name: regex });
          
              res.status(200).json(products);
            } catch (err) {
              res.status(500).json({ message: 'Internal Server Error', error: err.message });
            }
          });
        

module.exports = router;