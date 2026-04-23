import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Shirt,
  Package,
  Truck,
  Shield,
  Star,
  Heart,
  Users,
  Target,
  Eye,
  CheckCircle,
  Zap,
  Award,
  TrendingUp,
  RefreshCw
} from "lucide-react";

function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-40 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl animate-bounce"></div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl font-black mb-6 bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent drop-shadow-lg">
              About StyleTee Hub
            </h1>
            <p className="text-2xl max-w-3xl mx-auto text-white/95 leading-relaxed">
              Style, Comfort, and Confidence in Every Outfit
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 border border-white/30">
                <span className="text-white font-medium">🌟 Premium Quality</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 border border-white/30">
                <span className="text-white font-medium">🚀 Fast Delivery</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 border border-white/30">
                <span className="text-white font-medium">💎 Best Prices</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-12 shadow-xl border border-purple-100">
              <h2 className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Our Story</h2>
              <div className="text-center space-y-6">
                <p className="text-xl text-gray-700 leading-relaxed">
                  What started as a small idea has grown into <strong>StyleTee Hub</strong>, one of the most trusted online clothing stores for fashion-forward individuals. Our journey began when we noticed a gap in the market for high-quality, trendy clothing that doesn't break the bank.
                </p>
                <p className="text-xl text-gray-700 leading-relaxed">
                  From humble beginnings with just a handful of T-shirt designs, StyleTee Hub has expanded to offer a comprehensive collection of premium T-shirts for Men, Women, and Kids. Our commitment to trendy designs and affordable fashion has helped us grow into a beloved brand with thousands of happy customers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-12 shadow-xl border border-purple-200">
              <div className="flex justify-center mb-6">
                <div className="bg-white rounded-full p-4 shadow-lg">
                  <Target className="w-16 h-16 text-purple-600" />
                </div>
              </div>
              <h2 className="text-5xl font-bold mb-8 text-gray-900">Our Mission</h2>
              <p className="text-xl text-gray-700 leading-relaxed">
                To provide high-quality, stylish, and affordable clothing for everyone,
                ensuring that fashion is accessible to all without compromising on quality or style.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Vision */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl p-12 shadow-xl border border-blue-200">
              <div className="flex justify-center mb-6">
                <div className="bg-white rounded-full p-4 shadow-lg">
                  <Eye className="w-16 h-16 text-blue-600" />
                </div>
              </div>
              <h2 className="text-5xl font-bold mb-8 text-gray-900">Our Vision</h2>
              <p className="text-xl text-gray-700 leading-relaxed">
                To become a leading online fashion brand known for quality and innovation,
                setting new standards in e-commerce clothing industry while maintaining
                our commitment to sustainability and customer satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-12 shadow-xl border border-purple-100">
            <h2 className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Why Choose Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="group bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-purple-200 hover:bg-white/80 transition-all duration-300 hover:shadow-xl">
                <div className="text-center">
                  <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-full p-4 mb-4 inline-block">
                    <Shield className="w-12 h-12 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">Premium Quality Fabrics</h3>
                  <p className="text-gray-600">Only the finest materials for maximum comfort and durability</p>
                </div>
              </div>
              <div className="group bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-purple-200 hover:bg-white/80 transition-all duration-300 hover:shadow-xl">
                <div className="text-center">
                  <div className="bg-gradient-to-r from-green-100 to-green-200 rounded-full p-4 mb-4 inline-block">
                    <TrendingUp className="w-12 h-12 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">Affordable Pricing</h3>
                  <p className="text-gray-600">Fashion that fits your budget without compromising on style</p>
                </div>
              </div>
              <div className="group bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-purple-200 hover:bg-white/80 transition-all duration-300 hover:shadow-xl">
                <div className="text-center">
                  <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-full p-4 mb-4 inline-block">
                    <Zap className="w-12 h-12 text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">Fast Delivery</h3>
                  <p className="text-gray-600">Quick and reliable shipping to your doorstep</p>
                </div>
              </div>
              <div className="group bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-purple-200 hover:bg-white/80 transition-all duration-300 hover:shadow-xl">
                <div className="text-center">
                  <div className="bg-gradient-to-r from-purple-100 to-purple-200 rounded-full p-4 mb-4 inline-block">
                    <RefreshCw className="w-12 h-12 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">Easy Returns</h3>
                  <p className="text-gray-600">Hassle-free return policy for your peace of mind</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Products */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-12 shadow-xl border border-purple-100">
            <h2 className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Our Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <div className="group bg-white/60 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-white/80 transition-all duration-300 hover:shadow-xl border border-purple-200">
                <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-8 text-center">
                  <div className="bg-white rounded-full p-3 inline-block mb-4">
                    <Shirt className="w-12 h-12 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">T-Shirts</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-700">
                    Our collection of T-shirts features everything from classic plain tees to trendy graphic designs.
                    Available in various fits, colors, and sizes for Men, Women, and Kids. Perfect for everyday wear
                    and special occasions alike.
                  </p>
                </div>
              </div>
              <div className="group bg-white/60 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-white/80 transition-all duration-300 hover:shadow-xl border border-purple-200">
                <div className="bg-gradient-to-r from-purple-100 to-purple-200 p-8 text-center">
                  <div className="bg-white rounded-full p-3 inline-block mb-4">
                    <Package className="w-12 h-12 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Premium Collection</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-700">
                    Discover our exclusive premium T-shirt collection crafted with high-quality fabrics.
                    From casual everyday wear to special occasions, our premium range offers superior comfort
                    and style that stands out from the crowd.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-12 shadow-xl border border-purple-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div className="group bg-white/60 backdrop-blur-sm rounded-xl p-6 hover:bg-white/80 transition-all duration-300 border border-purple-200">
                <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-full p-3 inline-block mb-4">
                  <Users className="w-12 h-12 text-blue-600" />
                </div>
                <h3 className="text-4xl font-bold mb-2 text-gray-900">100+</h3>
                <p className="text-gray-600">Happy Customers</p>
              </div>
              <div className="group bg-white/60 backdrop-blur-sm rounded-xl p-6 hover:bg-white/80 transition-all duration-300 border border-purple-200">
                <div className="bg-gradient-to-r from-green-100 to-green-200 rounded-full p-3 inline-block mb-4">
                  <Package className="w-12 h-12 text-green-600" />
                </div>
                <h3 className="text-4xl font-bold mb-2 text-gray-900">60+</h3>
                <p className="text-gray-600">Products</p>
              </div>
              <div className="group bg-white/60 backdrop-blur-sm rounded-xl p-6 hover:bg-white/80 transition-all duration-300 border border-purple-200">
                <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-full p-3 inline-block mb-4">
                  <Award className="w-12 h-12 text-yellow-600" />
                </div>
                <h3 className="text-4xl font-bold mb-2 text-gray-900">1 Years</h3>
                <p className="text-gray-600">In Business</p>
              </div>
              <div className="group bg-white/60 backdrop-blur-sm rounded-xl p-6 hover:bg-white/80 transition-all duration-300 border border-purple-200">
                <div className="bg-gradient-to-r from-purple-100 to-purple-200 rounded-full p-3 inline-block mb-4">
                  <Star className="w-12 h-12 text-purple-600" />
                </div>
                <h3 className="text-4xl font-bold mb-2 text-gray-900">4.1/5</h3>
                <p className="text-gray-600">Customer Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 rounded-2xl p-12 shadow-xl text-white overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-6 inline-block mb-8 border border-white/30">
                <Heart className="w-16 h-16 text-white animate-pulse" />
              </div>
              <h2 className="text-5xl font-black mb-8 bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent drop-shadow-lg">
                Thank You For Choosing Us!
              </h2>
              <p className="text-xl mb-10 text-white/95 leading-relaxed max-w-3xl mx-auto">
                We're grateful for your trust and support. Every purchase helps us continue our mission
                of bringing quality, affordable fashion to everyone. Together, we're building a community
                of style-conscious individuals who value comfort, quality, and confidence.
              </p>
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 px-12 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                onClick={() => window.location.href = '/shop/kids'}
              >
                Start Shopping
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
