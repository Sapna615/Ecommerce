import { Truck, Clock, Shield, Globe, Package, CreditCard, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

function ShippingInfo() {
  const shippingZones = [
    {
      zone: "North Zone",
      states: "Delhi, Punjab, Haryana, Uttar Pradesh, Rajasthan",
      delivery: "2-4 business days",
      cost: "Free (orders above ₹999)"
    },
    {
      zone: "South Zone", 
      states: "Karnataka, Tamil Nadu, Kerala, Andhra Pradesh",
      delivery: "3-5 business days",
      cost: "Free (orders above ₹999)"
    },
    {
      zone: "East Zone",
      states: "West Bengal, Odisha, Assam, Bihar",
      delivery: "4-6 business days",
      cost: "Free (orders above ₹999)"
    },
    {
      zone: "West Zone",
      states: "Maharashtra, Gujarat, Madhya Pradesh, Goa",
      delivery: "3-5 business days",
      cost: "Free (orders above ₹999)"
    }
  ];

  const shippingOptions = [
    {
      name: "Standard Shipping",
      time: "5-7 business days",
      cost: "Free on orders above ₹999",
      icon: <Truck className="w-6 h-6 text-blue-600" />
    },
    {
      name: "Express Shipping",
      time: "2-3 business days", 
      cost: "₹99 (orders below ₹999)",
      icon: <Package className="w-6 h-6 text-green-600" />
    },
    {
      name: "International Shipping",
      time: "10-15 business days",
      cost: "Starting from ₹1499",
      icon: <Globe className="w-6 h-6 text-purple-600" />
    }
  ];

  const deliveryPartners = [
    {
      name: "Blue Dart",
      tracking: "Real-time tracking available",
      logo: "🚚"
    },
    {
      name: "Delhivery", 
      tracking: "Real-time tracking available",
      logo: "📦"
    },
    {
      name: "XpressBees",
      tracking: "Real-time tracking available", 
      logo: "🐝"
    },
    {
      name: "India Post",
      tracking: "Government tracking available",
      logo: "📮"
    }
  ];

  const shippingTimeline = [
    {
      status: "Order Confirmed",
      time: "Immediately",
      description: "Your order has been received and is being processed"
    },
    {
      status: "Order Processed",
      time: "Within 24 hours",
      description: "Your order is being prepared for shipment"
    },
    {
      status: "Order Shipped",
      time: "1-2 business days",
      description: "Your order has been shipped and is on its way"
    },
    {
      status: "Out for Delivery",
      time: "3-5 business days",
      description: "Your package is with local delivery partner"
    },
    {
      status: "Delivered",
      time: "Within 7 business days",
      description: "Your package has been successfully delivered"
    }
  ];

  const shippingTips = [
    {
      title: "Track Your Package",
      description: "Use the tracking number provided in your order confirmation email to monitor your package in real-time."
    },
    {
      title: "Provide Correct Address",
      description: "Double-check your shipping address to avoid delays. Include landmark for easier delivery."
    },
    {
      title: "Available for Delivery",
      description: "Ensure someone is available at the delivery address to receive your package safely."
    },
    {
      title: "Check Delivery Time",
      description: "Business days exclude Sundays and public holidays. Plan accordingly for time-sensitive orders."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Shipping Information</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Fast, reliable delivery across India and worldwide
          </p>
        </div>

        {/* Shipping Options */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Shipping Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {shippingOptions.map((option, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-center mb-4">
                  {option.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{option.name}</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">{option.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">{option.cost}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Zones */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Delivery Zones</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {shippingZones.map((zone, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{zone.zone}</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">States Covered:</h4>
                    <p className="text-gray-600">{zone.states}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-1">Delivery Time:</h4>
                      <p className="text-gray-600">{zone.delivery}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-1">Shipping Cost:</h4>
                      <p className="text-gray-600">{zone.cost}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Partners */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Delivery Partners</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {deliveryPartners.map((partner, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">{partner.logo}</div>
                <h3 className="font-semibold text-gray-900">{partner.name}</h3>
                <p className="text-sm text-gray-600">{partner.tracking}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Order Timeline */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Order Timeline</h2>
          <div className="space-y-4">
            {shippingTimeline.map((item, index) => (
              <div key={index} className="flex items-center gap-4 bg-white rounded-lg p-4 border-l-4 border-blue-500">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.status}</h3>
                  <p className="text-gray-600">{item.description}</p>
                  <p className="text-sm text-gray-500">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Tips */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Shipping Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shippingTips.map((tip, index) => (
              <div key={index} className="bg-blue-50 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-3">{tip.title}</h3>
                <p className="text-blue-700">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="text-center bg-gray-100 rounded-lg p-8">
          <Package className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions About Shipping?</h2>
          <p className="text-gray-600 mb-6">
            Our shipping team is here to help with any questions about your order delivery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Call Support
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShippingInfo;
