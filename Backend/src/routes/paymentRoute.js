import express from 'express';
import userAuth from '../middlewares/auth.js';
import RazorpayInstance from '../utils/razorpay.js'
import Payment from '../models/payment.js';
const PaymentRoute = express.Router();


PaymentRoute.post("/payment/order", userAuth, async (req, res) => {
  const { membershipType } = req.body;
  try {
    const order = await RazorpayInstance.orders.create({
      amount: 50000, // amount in the smallest currency unit (paise)
      currency: "INR",
      receipt: "order_rcptid_11",
      notes: {
        firstname: "Kartik",
        lastname: "Thakur",
        membershipType: membershipType,

      }
    })
    console.log(order);


    //save the order to the database.
    const payment = new Payment({
      userId: req.user._id,
      razorpay_order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      status: order.status,
      notes: order.notes,
    })
    const savedPayment = await payment.save();
    console.log(savedPayment);

    //retutn order details details to the frontend.
    // res.json({ ...savedPayment });
    res.json({ order });

  }
  catch (err) {
    console.log(err);
  }
});
PaymentRoute.post("/payment/verify", userAuth, async (req, res) => {

});
export default PaymentRoute;