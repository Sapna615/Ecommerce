import { Package, Clock, CreditCard, Truck, Shield, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function ReturnPolicy() {
  const navigate = useNavigate();

  const returnSteps = [
    {
      title: "Step 1: Initiate Return",
      description: "Contact our customer service within 30 days of receiving your order. Have your order number ready.",
      icon: <Package className="w-6 h-6 text-blue-600" />
    },
    {
      title: "Step 2: Return Approval",
      description: "Our team will review your return request and provide approval via email within 24-48 hours.",
      icon: <Shield className="w-6 h-6 text-green-600" />
    },
    {
      title: "Step 3: Ship Item Back",
      description: "Pack the item in original packaging with all tags attached. Use the provided return shipping label.",
      icon: <Truck className="w-6 h-6 text-orange-600" />
    },
    {
      title: "Step 4: Refund Processed",
      description: "Once we receive and inspect the returned item, your refund will be processed within 3-5 business days.",
      icon: <CreditCard className="w-6 h-6 text-purple-600" />
    }
  ];

  const policyHighlights = [
    {
      title: "30-Day Return Window",
      description: "Return any unworn item in original packaging within 30 days of delivery."
    },
    {
      title: "Original Condition Required",
      description: "Items must be unworn, unwashed, and have all original tags attached."
    },
    {
      title: "Free Return Shipping",
      description: "We provide prepaid return shipping labels for all approved returns."
    },
    {
      title: "Full Refund Guarantee",
      description: "Get a full refund to your original payment method within 5 business days of receipt."
    },
    {
      title: "Exchange Available",
      description: "Prefer an exchange? We can process exchanges for the same or different items."
    }
  ];

  const nonReturnableItems = [
    "Final sale items (marked as final sale)",
    "Underwear and intimate apparel",
    "Items without original tags or packaging",
    "Items damaged after 30 days",
    "Customized or personalized items"
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Return Policy</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Easy returns and exchanges for your peace of mind
          </p>
        </div>

        {/* Return Process */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Return Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {returnSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {step.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Policy Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Return Guidelines */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Return Guidelines</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">30-Day Return Window</h4>
                  <p className="text-gray-600 text-sm">Return any unworn item in original packaging within 30 days of delivery.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Original Condition Required</h4>
                  <p className="text-gray-600 text-sm">Items must be unworn, unwashed, and have all original tags attached.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Free Return Shipping</h4>
                  <p className="text-gray-600 text-sm">We provide prepaid return shipping labels for all approved returns.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Quick Refund Processing</h4>
                  <p className="text-gray-600 text-sm">Refunds processed within 3-5 business days after item receipt.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Non-Returnable Items */}
          <div className="bg-red-50 rounded-lg border border-red-200 p-6">
            <h3 className="text-xl font-bold text-red-900 mb-4">Non-Returnable Items</h3>
            <p className="text-red-700 text-sm mb-4">
              The following items cannot be returned or exchanged:
            </p>
            <ul className="space-y-2">
              {nonReturnableItems.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-red-700 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Exchange Options */}
        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-blue-900 mb-4">Exchange Options</h3>
          <p className="text-blue-700 mb-4">
            Prefer a different size, color, or style? We offer easy exchanges for the same or different items.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Size Exchange</h4>
              <p className="text-gray-600 text-sm">Exchange for a different size of the same item.</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Style Exchange</h4>
              <p className="text-gray-600 text-sm">Exchange for a different color or style of the same item.</p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center bg-gray-100 rounded-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Need Help with a Return?</h3>
          <p className="text-gray-600 mb-6">
            Our customer service team is here to make your return process as smooth as possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/shop/contact')}
              className="flex items-center gap-2"
            >
              <Package className="w-4 h-4" />
              Start a Return
            </Button>
            <Button
              variant="outline"
              onClick={() => window.location.href = 'mailto:support@styleteehub.com'}
              className="flex items-center gap-2"
            >
              <Clock className="w-4 h-4" />
              Email Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReturnPolicy;
