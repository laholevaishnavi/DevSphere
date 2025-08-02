import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    razorpay_order_id: {
      type: String,
      required: true,
      unique: true
    },
    razorpay_payment_id: {
      type: String,
    },
    razorpay_signature: {
      type: String,
      required: false
    },
    amount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: "INR"
    },
    status: {
      type: String,
      enum: ["created", "paid", "failed"],
      default: "created",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false  // Optional if user is not logged in
    },
    paidAt: {
      type: Date
    },
    notes: {
      firstName: {
        type: String,

      },
      lastName: {
        type: String,
      },
      membershipType: {
        type: String,
        required: true,
      }

    }
  },
  {
    timestamps: true // adds createdAt and updatedAt
  }
);

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
