const router = require("express").Router();
const Order = require("../models/Order");



router.post("/", async (req, res) => {
    try {
        // Ensure req.body contains all necessary fields for an Order
        const { userId, productId, quantity, orderCreationId, razorpayPaymentId, razorpayOrderId, razorpaySignature, customerDetails } = req.body;
        
        // Create a new Order instance with validated data
        const newOrder = new Order({
            userId,
            productId,
            quantity,
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
            customerDetails
        });
        
        // Save the new order to the database
        const savedOrder = await newOrder.save();
        
        res.status(201).json(savedOrder); // 201 status for "Created" resource
    } catch (err) {
        console.error("Error creating order:", err);
        res.status(500).json({ error: "Failed to create order" });
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

       router.get("/", async (req, res) => {
    try {
        const orders = await Order.find().populate({
            path: 'productId',
            model: 'Product', // Assuming your product model is named 'Product'
        });
        res.status(200).json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
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
                model: 'Product', // Assuming your product model is named 'Product'
              });
              res.status(200).json(orders);
            } catch (err) {
              console.error(err.message);
              res.status(500).json({ message: 'Server Error' });
            }
          });
          // GET total number of orders
router.get("/count", async (req, res) => {
    try {
        const orderCount = await Order.countDocuments();
        res.status(200).json({ count: orderCount });
    } catch (err) {
        console.error("Error fetching order count:", err);
        res.status(500).json({ error: "Failed to fetch order count" });
    }
});
          
          

module.exports = router; 