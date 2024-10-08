"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";

export const plans = [
  {
    link: process.env.NEXT_PUBLIC_STRIPE_PLAN_MONTHLY_URL,
    priceId: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID,
    price: 20,
    duration: "/month",
    features: [
      "1000 AI credits",
      "99 LinkedIn User monitoring",
      "Priority support",
      "Advanced analytics",
      "Custom personas",
    ],
  },
  {
    link: process.env.NEXT_PUBLIC_STRIPE_PLAN_YEARLY_URL,
    priceId: process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID,
    price: 200,
    duration: "/year",
    features: [
      "Unlimited AI credits (Fair Use Policy)",
      "Unlimited LinkedIn User monitoring",
      "Priority support",
      "Advanced analytics with deeper insights",
      "Custom personas and templates",
    ],
  },
];

const PricingCard = ({ email, userToken }) => {
  const [plan, setPlan] = useState(plans[0]);

  const handleUpgrade = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stripe/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          priceId: plan.priceId,
        }),
      });
      const session = await response.json();
      if (session.url) {
        window.location.href = session.url;
      } else {
        console.error('Error creating checkout session:', session.error);
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };

  return (
    <section
      id="pricing"
      className="py-12 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg shadow-lg"
    >
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Upgrade to Pro
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Unlock all features and boost your LinkedIn engagement
        </p>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="flex justify-center space-x-6 mb-8">
              {plans.map((p, index) => (
                <label key={index} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="plan"
                    className="form-radio text-blue-600 h-5 w-5"
                    checked={plan.price === p.price}
                    onChange={() => setPlan(p)}
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    {p.duration === "/month"
                      ? "Monthly"
                      : "Yearly (60% OFF 💰)"}
                  </span>
                </label>
              ))}
            </div>

            <div className="text-center mb-8">
              <span className="text-6xl font-bold text-gray-800">
                ${plan.price}
              </span>
              <span className="text-xl text-gray-600">{plan.duration}</span>
            </div>

            <ul className="space-y-4 mb-8">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center text-gray-700">
                  <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={handleUpgrade}
              className="block w-full bg-blue-600 text-white text-center py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
            >
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingCard;
