const router = require("express").Router();
const Order = require("../models/Order");



    router.post("/",async(req,res)=>{
    const newOrder = new Order(req.body)
    try{
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
    }catch(err){
        res.status(500).json(err);
    }
    });

    //update
    router.put("/:id", async (req, res) => {
        try {
            // Trim extra whitespace from the id parameter
            const orderId = req.params.id.trim();
    
            const updatedOrder = await Order.findByIdAndUpdate(
                orderId,
                { status: req.body.status },
                { new: true }
            );
    
            res.status(200).json(updatedOrder);
        } catch (err) {
            res.status(500).json(err);
        }
    });
    
        // delete 
        router.delete("/:id",async(req,res)=>{
            try{
                await Order.findByIdAndDelete(req.params.id);
                res.status(200).json("order product deleted");
            }catch(err){
                res.status(500).json(err);
            }
        });    
   
        // get user orders

        router.get("/find/:userId",async(req,res)=>{
            try{
                const orders = await Order.find({userId: req.params.userId});
                res.status(200).json(orders);
            }catch(err){
                res.status(500).json(err);

            }
        });

        //get all 

        router.get("/",async(req,res)=>{
            try{
           const orders = await Order.find();
           res.status(200).json(orders);

            }catch(err){
                res.status(500).json(err);

            }
        }); 
        router.put('/order/:orderId', async (req, res) => {
            const { orderId } = req.params;
            const { status } = req.body;
          
            try {
              // Validate if orderId is a valid ObjectId
              if (!mongoose.Types.ObjectId.isValid(orderId)) {
                return res.status(400).json({ message: 'Invalid orderId format' });
              }
          
              // Find and update the order by orderId
              const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
          
              if (!updatedOrder) {
                return res.status(404).json({ message: 'Order not found' });
              }
          
              res.json(updatedOrder);
            } catch (error) {
              console.error('Error updating order status:', error);
              res.status(500).json({ message: 'Internal Server Error' });
            }
          });
        //GET MONTHLY INCOME
        router.get("/income",  async (req, res) => {
            const date = new Date();
            const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
            const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
        
            try {
                const income = await Order.aggregate([
                    {
                        $match: { createdAt: { $gte: previousMonth.toISOString() } }
                    },
                    {
                        $project: {
                            month: { $month: "$createdAt" },
                            sales: "$amount",
                        },
                    },
                    {
                        $group: {
                            _id: "$month",
                            total: { $sum: "$sales" },
                        },
                    },
                ]);
        
                res.status(200).json(income);
            } catch (err) {
                console.error("Error fetching income:", err);
                res.status(500).json({ error: "Failed to fetch income data" });
            }
        });
         
        router.get('/list/:userId', async (req, res) => {
            try {
              const orders = await Order.find({ userId: req.params.userId }).populate({
                path: 'productId',
                model: 'Product',
              });
              res.status(200).json(orders);
            } catch (err) {
              console.error(err.message);
              res.status(500).json({ message: 'Server Error' });
            }
          });
          
          

module.exports = router; 