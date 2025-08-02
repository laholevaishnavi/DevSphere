import React from "react";
import axios from "axios";
import toast from "react-hot-toast";



const PremiumPayment = () => {

const PLANS = [
  {
    name: "Starter",
    price: 19900,
    displayPrice: "₹199",
    features: ["Basic Analytics", "Limited Posts", "Community Access"],
  },
  {
    name: "Pro",
    price: 49900,
    displayPrice: "₹499",
    features: ["Advanced Analytics", "Unlimited Posts", "Priority Support"],
  },
  {
    name: "Ultimate",
    price: 99900,
    displayPrice: "₹999",
    features: ["All Pro Features", "1-on-1 Mentorship", "Early Access"],
  },
];

const handlePayment = async (type) => {
  const order = await axios.post(
    "http://localhost:7777/payment/order",
    { membershipType: type },
    { withCredentials: true }
  );

  console.log(order)
  const { order_id,amount } = order.data;
  const options = {
    key: "rzp_test_bl7O1yeJxdFVd2", // Replace with your Razorpay key_id
    amount: amount || 50000, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "Acme Corp",
    description: "Test Transaction",
    order_id: order_id, // This is the order_id created in the backend
    // callback_url: 'http://localhost:3000/payment-success', // Your success URL
    prefill: {
      name: "Gaurav Kumar",
      email: "gaurav.kumar@example.com",
      contact: "9999999999",
    },
    theme: {
      color: "#F37254",
    },
  };
  const rzp = new window.Razorpay(options);
  rzp.open();
};


  return (
    <div className="min-h-screen bg-base-200 py-12 px-4 flex flex-col items-center">
      <h2 className="text-4xl font-bold text-center mb-10 text-white">
        Choose Your <span className="text-primary">Premium Plan</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className="card bg-base-100 shadow-xl border border-gray-700"
          >
            <div className="card-body">
              <h2 className="card-title text-2xl font-bold">{plan.name}</h2>
              <p className="text-4xl font-extrabold text-primary">
                {plan.displayPrice}
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                {plan.features.map((feature, i) => (
                  <li key={i} className="text-gray-300">
                    ✅ {feature}
                  </li>
                ))}
              </ul>
              <div className="card-actions justify-end mt-6">
                <button
                  onClick={() => handlePayment(plan.displayPrice)}
                  className="btn btn-primary w-full"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PremiumPayment;
