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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">About Our Brand</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Style, Comfort, and Confidence in Every Outfit
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8 text-gray-900">Our Story</h2>
            <div className="text-center">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                What started as a small idea in a college dorm room has grown into one of the most trusted online clothing stores for fashion-forward individuals. Our journey began when we noticed a gap in the market for high-quality, trendy clothing that doesn't break the bank.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                From humble beginnings with just a handful of T-shirt designs, we've expanded to offer a comprehensive collection of premium T-shirts for Men, Women, and Kids. Our commitment to trendy designs and affordable fashion has helped us grow from a small startup to a beloved brand with thousands of happy customers across the country.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Target className="w-16 h-16 text-blue-600" />
            </div>
            <h2 className="text-4xl font-bold mb-8 text-gray-900">Our Mission</h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              To provide high-quality, stylish, and affordable clothing for everyone, 
              ensuring that fashion is accessible to all without compromising on quality or style.
            </p>
          </div>
        </div>
      </section>

      {/* Our Vision */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Eye className="w-16 h-16 text-purple-600" />
            </div>
            <h2 className="text-4xl font-bold mb-8 text-gray-900">Our Vision</h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              To become a leading online fashion brand known for quality and innovation, 
              setting new standards in the e-commerce clothing industry while maintaining 
              our commitment to sustainability and customer satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="pt-6">
                <Shield className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-xl font-semibold mb-2">Premium Quality Fabrics</h3>
                <p className="text-gray-600">Only the finest materials for maximum comfort and durability</p>
              </CardContent>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="pt-6">
                <TrendingUp className="w-12 h-12 mx-auto mb-4 text-green-600" />
                <h3 className="text-xl font-semibold mb-2">Affordable Pricing</h3>
                <p className="text-gray-600">Fashion that fits your budget without compromising on style</p>
              </CardContent>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="pt-6">
                <Zap className="w-12 h-12 mx-auto mb-4 text-yellow-600" />
                <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
                <p className="text-gray-600">Quick and reliable shipping to your doorstep</p>
              </CardContent>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="pt-6">
                <RefreshCw className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
                <p className="text-gray-600">Hassle-free return policy for your peace of mind</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Our Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-8 text-center">
                <Shirt className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                <h3 className="text-2xl font-bold mb-4 text-gray-900">T-Shirts</h3>
              </div>
              <CardContent className="p-6">
                <p className="text-gray-700">
                  Our collection of T-shirts features everything from classic plain tees to trendy graphic designs. 
                  Available in various fits, colors, and sizes for Men, Women, and Kids. Perfect for everyday wear 
                  and special occasions alike.
                </p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="bg-gradient-to-r from-purple-100 to-purple-200 p-8 text-center">
                <Package className="w-16 h-16 mx-auto mb-4 text-purple-600" />
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Premium Collection</h3>
              </div>
              <CardContent className="p-6">
                <p className="text-gray-700">
                  Discover our exclusive premium T-shirt collection crafted with high-quality fabrics. 
                  From casual everyday wear to special occasions, our premium range offers superior comfort 
                  and style that stands out from the crowd.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <Users className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-3xl font-bold mb-2 text-gray-900">100+</h3>
              <p className="text-gray-600">Happy Customers</p>
            </div>
            <div>
              <Package className="w-12 h-12 mx-auto mb-4 text-green-600" />
              <h3 className="text-3xl font-bold mb-2 text-gray-900">60+</h3>
              <p className="text-gray-600">Products</p>
            </div>
            <div>
              <Award className="w-12 h-12 mx-auto mb-4 text-yellow-600" />
              <h3 className="text-3xl font-bold mb-2 text-gray-900">1 Years</h3>
              <p className="text-gray-600">In Business</p>
            </div>
            <div>
              <Star className="w-12 h-12 mx-auto mb-4 text-purple-600" />
              <h3 className="text-3xl font-bold mb-2 text-gray-900">4.1/5</h3>
              <p className="text-gray-600">Customer Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Heart className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-6">Thank You For Choosing Us!</h2>
            <p className="text-xl mb-8">
              We're grateful for your trust and support. Every purchase helps us continue our mission 
              of bringing quality, affordable fashion to everyone. Together, we're building a community 
              of style-conscious individuals who value comfort, quality, and confidence.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
              onClick={() => window.location.href = '/shop'}
            >
              Start Shopping
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
