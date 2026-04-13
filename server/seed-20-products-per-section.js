const mongoose = require('mongoose');
const Product = require('./models/Product');

// 20 unique products for each section with your specified categories, brands, sizes, colors
const productsData = {

  mens: [
  {
    title: "Classic Plain Cotton Tee",
    description: "Classic cotton t-shirt perfect for everyday wear",
    category: "mens",
    subcategory: "Casual",
    brand: "UrbanWear",
    price: 999,
    salePrice: 799,
    currency: "INR",
    totalStock: 50,
    averageReview: 4.5,
    colors: ["white","black","gray","blue"],
    sizes: ["XS","S","M","L","XL","XXL","XXXL"],
    image: "https://images.pexels.com/photos/15779643/pexels-photo-15779643.jpeg",
    additionalImages:{
      "white":"https://images.pexels.com/photos/15779643/pexels-photo-15779643.jpeg",
      "black":"https://images.pexels.com/photos/4729199/pexels-photo-4729199.jpeg",
      "gray":"https://images.pexels.com/photos/6311551/pexels-photo-6311551.jpeg",
      "blue":"https://images.pexels.com/photos/14150776/pexels-photo-14150776.png"
    }
  },
  {
    title: "Slim Fit Crew Neck Tee",
    description: "Slim fit modern t-shirt for everyday style",
    category: "mens",
    subcategory: "Casual",
    brand: "StyleHub",
    price: 1199,
    salePrice: 899,
    currency: "INR",
    totalStock: 45,
    averageReview: 4.4,
    colors: ["black","blue","white"],
    sizes: ["XS","S","M","L","XL","XXL","XXXL"],
    image: "https://images.pexels.com/photos/10106995/pexels-photo-10106995.jpeg",
    additionalImages:{
      "white":"https://images.pexels.com/photos/10106995/pexels-photo-10106995.jpeg",
      "black":"https://images.pexels.com/photos/5668592/pexels-photo-5668592.jpeg",
      "blue":"https://images.pexels.com/photos/29138679/pexels-photo-29138679.jpeg",
    }
  },
  {
    title: "Graphic Street Printed Tee",
    description: "Trendy graphic printed t-shirt for streetwear",
    category: "mens",
    subcategory: "Printed",
    brand: "StreetX",
    price: 1499,
    salePrice: 1199,
    currency: "INR",
    totalStock: 40,
    averageReview: 4.7,
    colors: ["black","white","grey"],
    sizes: ["S","M","L","XL","XXL","XXXL"],
    image: "https://images.pexels.com/photos/37025819/pexels-photo-37025819.jpeg",
    additionalImages:{
      "black":"https://images.pexels.com/photos/36986582/pexels-photo-36986582.jpeg",
      "white":"https://images.pexels.com/photos/37025819/pexels-photo-37025819.jpeg",
      "grey":"https://images.pexels.com/photos/33090603/pexels-photo-33090603.jpeg"
    }
  },
  {
    title: "Oversized Drop Shoulder Tee",
    description: "Loose fit oversized t-shirt for relaxed style",
    category: "mens",
    subcategory: "Oversized",
    brand: "UrbanWear",
    price: 1799,
    salePrice: 1399,
    currency: "INR",
    totalStock: 35,
    averageReview: 4.6,
    colors: ["white","gray","black","blue"],
    sizes: ["S","M","L","XL","XXL","XXXL"],
    image: "https://images.pexels.com/photos/18584221/pexels-photo-18584221.jpeg",
    additionalImages:{
      "white":"https://images.pexels.com/photos/18584221/pexels-photo-18584221.jpeg",
      "gray":"https://images.pexels.com/photos/10346848/pexels-photo-10346848.jpeg",
      "black":"https://images.pexels.com/photos/31482884/pexels-photo-31482884.jpeg",
      "blue":"https://images.pexels.com/photos/27556124/pexels-photo-27556124.jpeg"
    }
  },
  {
    title: "Striped Casual T-Shirt",
    description: "Comfortable striped t-shirt for casual wear",
    category: "mens",
    subcategory: "Casual",
    brand: "FlexWear",
    price: 1299,
    salePrice: 999,
    currency: "INR",
    totalStock: 42,
    averageReview: 4.3,
    colors: ["red","white","gray","black","green"],
    sizes: ["S","M","L","XL","XXL","XXXL"],
    image: "https://images.pexels.com/photos/26347765/pexels-photo-26347765.jpeg",
    additionalImages:{
      "red":"https://images.pexels.com/photos/26347765/pexels-photo-26347765.jpeg",
      "white":"https://images.pexels.com/photos/21710600/pexels-photo-21710600.jpeg",
      "gray":"https://images.pexels.com/photos/26347765/pexels-photo-26347765.jpeg",
      "black":"https://images.pexels.com/photos/24770057/pexels-photo-24770057.jpeg",
      "green":"https://images.pexels.com/photos/19964738/pexels-photo-19964738.jpeg"
    }
  },
  {
    title: "Polo Collar Solid Tee",
    description: "Classic polo t-shirt for smart casual style",
    category: "mens",
    subcategory: "Polo",
    brand: "ClassicFit",
    price: 1599,
    salePrice: 1299,
    currency: "INR",
    totalStock: 38,
    averageReview: 4.6,
    colors: ["blue","black","white"],
    sizes: ["S","M","L","XL","XXL"],
    image: "https://images.pexels.com/photos/7037535/pexels-photo-7037535.jpeg",
    additionalImages:{
      "blue":"https://images.pexels.com/photos/7037535/pexels-photo-7037535.jpeg",
      "black":"https://images.pexels.com/photos/14370669/pexels-photo-14370669.jpeg",
      "white":"https://images.pexels.com/photos/17898548/pexels-photo-17898548.jpeg"
    }
  },
  {
    title: "Active Sports Performance Tee",
    description: "Breathable sports t-shirt for workouts",
    category: "mens",
    subcategory: "Sports",
    brand: "FitZone",
    price: 1399,
    salePrice: 1099,
    currency: "INR",
    totalStock: 60,
    averageReview: 4.7,
    colors: ["red","skyblue","black","white"],
    sizes: ["S","M","L","XL","XXL","XXXL"],
    image: "https://images.pexels.com/photos/13159245/pexels-photo-13159245.jpeg",
    additionalImages:{
      "red":"https://images.pexels.com/photos/32033155/pexels-photo-32033155.jpeg",
      "skyblue":"https://images.pexels.com/photos/12169060/pexels-photo-12169060.jpeg",
      "black":"https://images.pexels.com/photos/13159245/pexels-photo-13159245.jpeg",
      "white":"https://images.pexels.com/photos/32929004/pexels-photo-32929004.jpeg"
    }
  },
  {
    title: "Round Neck Everyday Tee",
    description: "Basic round neck t-shirt for daily comfort",
    category: "mens",
    subcategory: "Casual",
    brand: "StyleHub",
    price: 999,
    salePrice: 799,
    currency: "INR",
    totalStock: 55,
    averageReview: 4.4,
    colors: ["orange","brown","gray","black"],
    sizes: ["XS","S","M","L","XL","XXL","XXXL"],
    image: "https://images.pexels.com/photos/16646933/pexels-photo-16646933.jpeg",
    additionalImages:{
      "orange":"https://images.pexels.com/photos/36392069/pexels-photo-36392069.jpeg",
      "brown":"https://images.pexels.com/photos/6772500/pexels-photo-6772500.jpeg",
      "gray":"https://images.pexels.com/photos/16646933/pexels-photo-16646933.jpeg",
      "black":"https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg"
    }
  },
  {
    title: "Typography Printed Tee",
    description: "Stylish typography print t-shirt",
    category: "mens",
    subcategory: "Printed",
    brand: "ActivePro",
    price: 1399,
    salePrice: 1099,
    currency: "INR",
    totalStock: 36,
    averageReview: 4.5,
    colors: ["black","red","orange","white"],
    sizes: ["S","M","L","XL","XXL","XXXL"],
    image: "https://images.pexels.com/photos/36969574/pexels-photo-36969574.jpeg",
    additionalImages:{
      "black":"https://images.pexels.com/photos/17894191/pexels-photo-17894191.png",
      "red":"https://images.pexels.com/photos/17575695/pexels-photo-17575695.jpeg",
      "orange":"https://images.pexels.com/photos/36669383/pexels-photo-36669383.jpeg",
      "white":"https://images.pexels.com/photos/36969574/pexels-photo-36969574.jpeg"
    }
  },
  {
    title: "Washed Vintage Look Tee",
    description: "Vintage washed t-shirt for retro vibe",
    category: "mens",
    subcategory: "Casual",
    brand: "FlexWear",
    price: 1899,
    salePrice: 1499,
    currency: "INR",
    totalStock: 30,
    averageReview: 4.6,
    colors: ["black","orange","white","blue"],
    sizes: ["S","M","L","XL","XXL","XXXL"],
    image: "https://images.pexels.com/photos/5225625/pexels-photo-5225625.jpeg",
    additionalImages:{
      "black":"https://images.pexels.com/photos/10760585/pexels-photo-10760585.jpeg",
      "orange":"https://images.pexels.com/photos/5225625/pexels-photo-5225625.jpeg",
      "white":"https://images.pexels.com/photos/27268761/pexels-photo-27268761.jpeg",
      "blue":"https://images.pexels.com/photos/30315652/pexels-photo-30315652.jpeg"
    }
  },
  {
    title: "Full Sleeve Cotton Tee",
    description: "Full sleeve cotton t-shirt for all seasons",
    category: "mens",
    subcategory: "Casual",
    brand: "UrbanWear",
    price: 1599,
    salePrice: 1299,
    currency: "INR",
    totalStock: 44,
    averageReview: 4.5,
    colors: ["black","brown","white","gray"],
    sizes: ["S","M","L","XL","XXL","XXXL"],
    image: "https://images.pexels.com/photos/28870038/pexels-photo-28870038.jpeg",
    additionalImages:{
      "black":"https://images.pexels.com/photos/30523158/pexels-photo-30523158.jpeg",
      "brown":"https://images.pexels.com/photos/35253966/pexels-photo-35253966.jpeg",
      "white":"https://images.pexels.com/photos/11246287/pexels-photo-11246287.jpeg",
      "gray":"https://images.pexels.com/photos/28870038/pexels-photo-28870038.jpeg"
    }
  },
  {
    title: "Abstract Print Tee",
    description: "Modern abstract printed t-shirt",
    category: "mens",
    subcategory: "Printed",
    brand: "StreetX",
    price: 1499,
    salePrice: 1199,
    currency: "INR",
    totalStock: 42,
    averageReview: 4.7,
    colors: ["green","black","white","blue"],
    sizes: ["S","M","L","XL","XXL","XXXL"],
    image: "https://images.pexels.com/photos/18805427/pexels-photo-18805427.jpeg",
    additionalImages:{
      "green":"https://images.pexels.com/photos/18805427/pexels-photo-18805427.jpeg",
      "black":"https://images.pexels.com/photos/36942018/pexels-photo-36942018.jpeg",
      "white":"https://images.pexels.com/photos/19408182/pexels-photo-19408182.jpeg",
      "blue":"https://images.pexels.com/photos/8612656/pexels-photo-8612656.jpeg"
    }
  },
  {
    title: "Oversized Graphic Tee",
    description: "Oversized graphic t-shirt for street style",
    category: "mens",
    subcategory: "Oversized",
    brand: "StreetX",
    price: 1999,
    salePrice: 1599,
    currency: "INR",
    totalStock: 28,
    averageReview: 4.8,
    colors: ["black","white","gray","pink"],
    sizes: ["S","M","L","XL","XXL","XXXL"],
    image: "https://images.pexels.com/photos/18856593/pexels-photo-18856593.jpeg",
    additionalImages:{
      "black":"https://images.pexels.com/photos/37014370/pexels-photo-37014370.jpeg",
      "white":"https://images.pexels.com/photos/28540060/pexels-photo-28540060.jpeg",
      "gray":"https://images.pexels.com/photos/18856593/pexels-photo-18856593.jpeg",
      "pink":"https://images.pexels.com/photos/14798947/pexels-photo-14798947.jpeg"
    }
  },
  {
    title: "Premium Soft Fabric Tee",
    description: "Premium quality soft fabric t-shirt",
    category: "mens",
    subcategory: "Premium",
    brand: "EliteForm",
    price: 2499,
    salePrice: 1999,
    currency: "INR",
    totalStock: 32,
    averageReview: 4.9,
    colors: ["black","white","red","gray"],
    sizes: ["S","M","L","XL","XXL","XXXL"],
    image: "https://images.pexels.com/photos/28774730/pexels-photo-28774730.jpeg",
    additionalImages:{
      "black":"https://images.pexels.com/photos/28774730/pexels-photo-28774730.jpeg",
      "white":"https://images.pexels.com/photos/9051928/pexels-photo-9051928.jpeg",
      "red":"https://images.pexels.com/photos/29138671/pexels-photo-29138671.jpeg",
      "gray":"https://images.pexels.com/photos/25315906/pexels-photo-25315906.jpeg"
    }
  },
  {
    title: "Summer Light Cotton Tee",
    description: "Lightweight cotton t-shirt for summer",
    category: "mens",
    subcategory: "Casual",
    brand: "TrendyMen",
    price: 799,
    salePrice: 599,
    currency: "INR",
    totalStock: 65,
    averageReview: 4.3,
    colors: ["white","blue","cream","black"],
    sizes: ["S","M","L","XL","XXL","XXXL"],
    image: "https://images.pexels.com/photos/22613978/pexels-photo-22613978.jpeg",
    additionalImages:{
      "white":"https://images.pexels.com/photos/32963962/pexels-photo-32963962.jpeg",
      "blue":"https://images.pexels.com/photos/22613978/pexels-photo-22613978.jpeg",
      "cream":"https://images.pexels.com/photos/17570091/pexels-photo-17570091.jpeg",
      "black":"https://images.pexels.com/photos/30752879/pexels-photo-30752879.jpeg"
    }
  },
  {
    title: "Rainbow Printed Tee",
    description: "Colorful printed t-shirt for bold fashion",
    category: "mens",
    subcategory: "Printed",
    brand: "StyleHub",
    price: 1399,
    salePrice: 1099,
    currency: "INR",
    totalStock: 44,
    averageReview: 4.4,
    colors: ["black","blue","white","purple"],
    sizes: ["S","M","L","XL","XXL","XXXL"],
    image: "https://images.pexels.com/photos/5995825/pexels-photo-5995825.jpeg",
    additionalImages:{
      "black":"https://images.pexels.com/photos/5995841/pexels-photo-5995841.jpeg",
      "white":"https://images.pexels.com/photos/5995825/pexels-photo-5995825.jpeg",
      "blue":"https://images.pexels.com/photos/22613978/pexels-photo-22613978.jpeg",
      "purple":"https://images.pexels.com/photos/27428300/pexels-photo-27428300.jpeg",
    }
  },
  {
    title: "Color Block Casual Tee",
    description: "Modern color block t-shirt",
    category: "mens",
    subcategory: "Casual",
    brand: "FlexWear",
    price: 999,
    salePrice: 799,
    currency: "INR",
    totalStock: 58,
    averageReview: 4.5,
    colors: ["pinkblue","blue","white"],
    sizes: ["S","M","L","XL","XXL","XXXL"],
    image: "https://images.pexels.com/photos/17221263/pexels-photo-17221263.jpeg",
    additionalImages:{
      "pinkblue":"https://images.pexels.com/photos/5524532/pexels-photo-5524532.jpeg",
      "blue":"https://images.pexels.com/photos/2250567/pexels-photo-2250567.jpeg",
      "white":"https://images.pexels.com/photos/17221263/pexels-photo-17221263.jpeg"
    }
  },
  {
    title: "Pocket Style Tee",
    description: "Minimal t-shirt with pocket design",
    category: "mens",
    subcategory: "Casual",
    brand: "DenimCo",
    price: 1599,
    salePrice: 1299,
    currency: "INR",
    totalStock: 26,
    averageReview: 4.6,
    colors: ["black","brown","white"],
    sizes: ["S","M","L","XL","XXL","XXXL"],
    image: "https://images.pexels.com/photos/11668723/pexels-photo-11668723.jpeg",
    additionalImages:{
      "black":"https://images.pexels.com/photos/11668723/pexels-photo-11668723.jpeg",
      "brown":"https://images.pexels.com/photos/10917971/pexels-photo-10917971.jpeg",
      "white":"https://images.pexels.com/photos/12712906/pexels-photo-12712906.jpeg"
    }
  },
  {
    title: "Henley Style Premium Tee",
    description: "Premium henley neck t-shirt",
    category: "mens",
    subcategory: "Premium",
    brand: "ClassicFit",
    price: 1999,
    salePrice: 1599,
    currency: "INR",
    totalStock: 30,
    averageReview: 4.8,
    colors: ["black","white","olive"],
    sizes: ["S","M","L","XL","XXL","XXXL"],
    image: "https://images.pexels.com/photos/32694255/pexels-photo-32694255.jpeg",
    additionalImages:{
      "black":"https://images.pexels.com/photos/32694255/pexels-photo-32694255.jpeg",
      "white":"https://images.pexels.com/photos/8320765/pexels-photo-8320765.jpeg",
      "olive":"https://images.pexels.com/photos/14622878/pexels-photo-14622878.jpeg",
    }
  },
  {
  title: "Premium Luxury Tee",
  description: "Premium quality luxury t-shirt",
  category: "mens",
  subcategory: "Premium",
  brand: "EliteForm",
  price: 2999,
  salePrice: 2499,
  currency: "INR",
  totalStock: 25,
  averageReview: 4.8,
  colors: ["black","gold","blue","white"],
  sizes: ["S","M","L","XL","XXL","XXXL"],
  image: "https://images.pexels.com/photos/29996215/pexels-photo-29996215.jpeg",
  additionalImages:{
    "black":"https://images.pexels.com/photos/29996215/pexels-photo-29996215.jpeg",
    "gold":"https://images.pexels.com/photos/16581348/pexels-photo-16581348.jpeg",
    "blue":"https://images.pexels.com/photos/30447338/pexels-photo-30447338.jpeg",
    "white":"https://images.pexels.com/photos/4328524/pexels-photo-4328524.jpeg"
  }
}
],
//women section

womens: [
  {
    title: "Basic Slim Fit Tee",
    description: "Soft slim fit t-shirt for everyday comfort",
    category: "womens",
    subcategory: "Basic",
    brand: "UrbanChic",
    price: 399,
    salePrice: 299,
    currency: "INR",
    totalStock: 50,
    averageReview: 4.4,
    colors: ["white","black","blue"],
    sizes: ["XS","S","M","L","XL","XXL","XXXL"],
    image: "https://images.pexels.com/photos/9558588/pexels-photo-9558588.jpeg",
    additionalImages:{
      "white":"https://images.pexels.com/photos/10386574/pexels-photo-10386574.jpeg",
      "black":"https://images.pexels.com/photos/9558588/pexels-photo-9558588.jpeg",
      "blue":"https://images.pexels.com/photos/16048176/pexels-photo-16048176.jpeg"
    }
  },
  {
    title: "Classic Round Neck Tee",
    description: "Basic round neck t-shirt for daily wear",
    category: "womens",
    subcategory: "Basic",
    brand: "StyleHub Women",
    price: 449,
    salePrice: 349,
    currency: "INR",
    totalStock: 48,
    averageReview: 4.3,
    colors: ["white","black","brown"],
    sizes: ["XS","S","M","L","XL","XXL","XXXL"],
    image: "https://images.pexels.com/photos/16663567/pexels-photo-16663567.jpeg",
    additionalImages:{
      "white":"https://images.pexels.com/photos/16663567/pexels-photo-16663567.jpeg",
      "black":"https://images.pexels.com/photos/19248892/pexels-photo-19248892.jpeg",
      "brown":"https://images.pexels.com/photos/6311612/pexels-photo-6311612.jpeg"
    }
  },
  {
    title: "V-Neck Everyday Tee",
    description: "Lightweight v-neck t-shirt for casual comfort",
    category: "womens",
    subcategory: "Basic",
    brand: "SoftStyle",
    price: 499,
    salePrice: 399,
    currency: "INR",
    totalStock: 46,
    averageReview: 4.3,
    colors: ["white","black","orange"],
    sizes: ["XS","S","M","L","XL","XXL","XXXL"],
    image: "https://images.pexels.com/photos/9727831/pexels-photo-9727831.jpeg",
    additionalImages:{
      "white":"https://images.pexels.com/photos/30998953/pexels-photo-30998953.jpeg",
      "black":"https://images.pexels.com/photos/4584454/pexels-photo-4584454.jpeg",
      "orange":"https://images.pexels.com/photos/9727831/pexels-photo-9727831.jpeg",
    }
  },
  {
    title: "Stretch Fit Basic Tee",
    description: "Stretchable cotton t-shirt for daily wear",
    category: "womens",
    subcategory: "Basic",
    brand: "ModernMuse",
    price: 499,
    salePrice: 399,
    currency: "INR",
    totalStock: 52,
    averageReview: 4.4,
    colors: ["black","white","orange"],
    sizes: ["XS","S","M","L","XL","XXL","XXXL"],
    image: "https://images.pexels.com/photos/7535462/pexels-photo-7535462.jpeg",
    additionalImages:{
      "black":"https://images.pexels.com/photos/34977336/pexels-photo-34977336.jpeg",
      "white":"https://images.pexels.com/photos/7535462/pexels-photo-7535462.jpeg",
      "orange":"https://images.pexels.com/photos/5610916/pexels-photo-5610916.jpeg",
    }
  },

  {
    title: "Floral Printed Tee",
    description: "Beautiful floral print t-shirt",
    category: "womens",
    subcategory: "Printed",
    brand: "TrendyGirl",
    price: 699,
    salePrice: 549,
    currency: "INR",
    totalStock: 42,
    averageReview: 4.6,
    colors: ["white","black","gray","pink"],
    sizes: ["XS","S","M","L","XL","XXL","XXXL"],
    image: "https://images.pexels.com/photos/8217291/pexels-photo-8217291.jpeg",
    additionalImages:{
      "white":"https://images.pexels.com/photos/8217291/pexels-photo-8217291.jpeg",
      "black":"https://images.pexels.com/photos/9558588/pexels-photo-9558588.jpeg",
      "gray":"https://images.pexels.com/photos/4913257/pexels-photo-4913257.jpeg",
      "pink":"https://images.pexels.com/photos/9558239/pexels-photo-9558239.jpeg"
    }
  },
  {
    title: "Typography Graphic Tee",
    description: "Bold typography printed t-shirt",
    category: "womens",
    subcategory: "Printed",
    brand: "StreetStyle Women",
    price: 749,
    salePrice: 599,
    currency: "INR",
    totalStock: 40,
    averageReview: 4.5,
    colors: ["black","white","green"],
    sizes: ["XS","S","M","L","XL","XXL","XXXL"],
    image: "https://images.pexels.com/photos/36995714/pexels-photo-36995714.jpeg",
    additionalImages:{
      "black":"https://images.pexels.com/photos/17474390/pexels-photo-17474390.jpeg",
      "white":"https://images.pexels.com/photos/36995714/pexels-photo-36995714.jpeg",
      "green":"https://images.pexels.com/photos/28864341/pexels-photo-28864341.jpeg",
    }
  },
  {
    title: "Tie Dye Printed Tee",
    description: "Trendy tie-dye t-shirt",
    category: "womens",
    subcategory: "Printed",
    brand: "FashionLine",
    price: 799,
    salePrice: 649,
    currency: "INR",
    totalStock: 38,
    averageReview: 4.4,
    colors: ["skyblue","pink","purple"],
    sizes: ["XS","S","M","L","XL","XXL","XXXL"],
    image: "https://images.pexels.com/photos/15369351/pexels-photo-15369351.jpeg",
    additionalImages:{
      "skyblue":"https://images.pexels.com/photos/33624546/pexels-photo-33624546.jpeg",
      "pink":"https://images.pexels.com/photos/15369351/pexels-photo-15369351.jpeg",
      "purple":"https://images.pexels.com/photos/26692413/pexels-photo-26692413.jpeg",
    }
  },
  {
    title: "Abstract Print Tee",
    description: "Creative abstract design t-shirt",
    category: "womens",
    subcategory: "Printed",
    brand: "ChicTrend",
    price: 799,
    salePrice: 649,
    currency: "INR",
    totalStock: 37,
    averageReview: 4.5,
    colors: ["black","white","gray"],
    sizes: ["XS","S","M","L","XL","XXL","XXXL"],
    image: "https://images.pexels.com/photos/37011552/pexels-photo-37011552.jpeg",
    additionalImages:{
      "black":"https://images.pexels.com/photos/37011552/pexels-photo-37011552.jpeg",
      "white":"https://images.pexels.com/photos/18846921/pexels-photo-18846921.jpeg",
      "gray":"https://images.pexels.com/photos/11533886/pexels-photo-11533886.jpeg"
    }
  },
  {
    title: "Floral Art Tee",
    description: "Artistic floral print t-shirt",
    category: "womens",
    subcategory: "Printed",
    brand: "ElegantWear",
    price: 849,
    salePrice: 699,
    currency: "INR",
    totalStock: 34,
    averageReview: 4.6,
    colors: ["white","purple","black"],
    sizes: ["XS","S","M","L","XL","XXL","XXXL"],
    image: "https://images.pexels.com/photos/31889750/pexels-photo-31889750.jpeg",
    additionalImages:{
      "white":"https://images.pexels.com/photos/35130077/pexels-photo-35130077.jpeg",
      "purple":"https://images.pexels.com/photos/31889750/pexels-photo-31889750.jpeg",
      "black":"https://images.pexels.com/photos/19101427/pexels-photo-19101427.jpeg",
    }
  },

  {
    title: "Oversized Relaxed Tee",
    description: "Loose fit oversized t-shirt",
    category: "womens",
    subcategory: "Oversized",
    brand: "UrbanChic",
    price: 899,
    salePrice: 699,
    currency: "INR",
    totalStock: 35,
    averageReview: 4.6,
    colors: ["black","white","pink","brown"],
    sizes: ["S","M","L","XL","XXL","XXXL"],
    image: "https://images.pexels.com/photos/36927345/pexels-photo-36927345.jpeg",
    additionalImages:{
      "black":"https://images.pexels.com/photos/36908561/pexels-photo-36908561.jpeg",
      "white":"https://images.pexels.com/photos/36927345/pexels-photo-36927345.jpeg",
      "pink":"https://images.pexels.com/photos/36899307/pexels-photo-36899307.jpeg",
      "brown":"https://images.pexels.com/photos/11790167/pexels-photo-11790167.png",
    }
  },
  {
    title: "Street Oversized Tee",
    description: "Street style oversized t-shirt",
    category: "womens",
    subcategory: "Oversized",
    brand: "StreetStyle Women",
    price: 999,
    salePrice: 799,
    currency: "INR",
    totalStock: 32,
    averageReview: 4.5,
    colors: ["black","gray","white"],
    sizes: ["M","L","XL","XXL","XXXL"],
    image: "https://images.pexels.com/photos/5365445/pexels-photo-5365445.jpeg",
    additionalImages:{
      "black":"https://images.pexels.com/photos/5365445/pexels-photo-5365445.jpeg",
      "gray":"https://images.pexels.com/photos/8851061/pexels-photo-8851061.png",
      "white":"https://images.pexels.com/photos/36908588/pexels-photo-36908588.jpeg",
    }
  },
  {
    title: "Baggy Fit Tee",
    description: "Comfortable oversized baggy t-shirt",
    category: "womens",
    subcategory: "Oversized",
    brand: "ComfortWear",
    price: 899,
    salePrice: 749,
    currency: "INR",
    totalStock: 36,
    averageReview: 4.4,
    colors: ["white","black","gray"],
    sizes: ["M","L","XL","XXL","XXXL"],
    image: "https://images.pexels.com/photos/8612937/pexels-photo-8612937.jpeg",
    additionalImages:{
      "white":"https://images.pexels.com/photos/27530363/pexels-photo-27530363.jpeg",
      "black":"https://images.pexels.com/photos/9558588/pexels-photo-9558588.jpeg",
      "gray":"https://images.pexels.com/photos/8612937/pexels-photo-8612937.jpeg",
    }
  },

  {
    title: "Striped Casual Tee",
    description: "Comfortable striped t-shirt",
    category: "womens",
    subcategory: "Casual",
    brand: "FashionLine",
    price: 549,
    salePrice: 449,
    currency: "INR",
    totalStock: 60,
    averageReview: 4.3,
    colors: ["gray","red","green","black"],
    sizes: ["XS","S","M","L","XL","XXL","XXXL"],
    image: "https://images.pexels.com/photos/32478121/pexels-photo-32478121.jpeg",
    additionalImages:{
      "gray":"https://images.pexels.com/photos/35145460/pexels-photo-35145460.jpeg",
      "red":"https://images.pexels.com/photos/1895942/pexels-photo-1895942.jpeg",
      "green":"https://images.pexels.com/photos/32478121/pexels-photo-32478121.jpeg",
      "black":"https://images.pexels.com/photos/3960371/pexels-photo-3960371.jpeg",
    }
  },
  {
    title: "Daily Comfort Tee",
    description: "Soft everyday casual t-shirt",
    category: "womens",
    subcategory: "Casual",
    brand: "DailyWear Co",
    price: 499,
    salePrice: 399,
    currency: "INR",
    totalStock: 70,
    averageReview: 4.2,
    colors: ["white","purple","yellowish orange"],
    sizes: ["XS","S","M","L","XL","XXL","XXXL"],
    image: "https://images.pexels.com/photos/17542830/pexels-photo-17542830.jpeg",
    additionalImages:{
      "white":"https://images.pexels.com/photos/17542830/pexels-photo-17542830.jpeg",
      "purple":"https://images.pexels.com/photos/14087987/pexels-photo-14087987.jpeg",
      "yellowish orange":"https://images.pexels.com/photos/32322207/pexels-photo-32322207.png",
    }
  },
  {
    title: "Summer Loose Tee",
    description: "Lightweight t-shirt for summer",
    category: "womens",
    subcategory: "Casual",
    brand: "TrendyGirl",
    price: 499,
    salePrice: 399,
    currency: "INR",
    totalStock: 65,
    averageReview: 4.3,
    colors: ["purple","brown","black"],
    sizes: ["XS","S","M","L","XL","XXL","XXXL"],
    image: "https://images.pexels.com/photos/12847159/pexels-photo-12847159.jpeg",
    additionalImages:{
      "purple":"https://images.pexels.com/photos/16745535/pexels-photo-16745535.jpeg",
      "brown":"https://images.pexels.com/photos/8468858/pexels-photo-8468858.jpeg",
      "black":"https://images.pexels.com/photos/12847159/pexels-photo-12847159.jpeg",
    }
  },
  {
    title: "Color Block Casual Tee",
    description: "Stylish color block t-shirt",
    category: "womens",
    subcategory: "Casual",
    brand: "ChicTrend",
    price: 599,
    salePrice: 499,
    currency: "INR",
    totalStock: 58,
    averageReview: 4.4,
    colors: ["pastle","blue","white","red"],
    sizes: ["XS","S","M","L","XL","XXL","XXXL"],
    image: "https://images.pexels.com/photos/4809523/pexels-photo-4809523.jpeg",
    additionalImages:{
      "pastel":"https://images.pexels.com/photos/4809523/pexels-photo-4809523.jpeg",
      "blue":"https://images.pexels.com/photos/19352044/pexels-photo-19352044.jpeg",
      "white":"https://images.pexels.com/photos/14245142/pexels-photo-14245142.jpeg",
      "red":"https://images.pexels.com/photos/7901810/pexels-photo-7901810.png",
    }
  },

  {
    title: "Polo Collar Tee Women",
    description: "Classic polo t-shirt",
    category: "womens",
    subcategory: "Polo",
    brand: "ClassicFit Women",
    price: 799,
    salePrice: 649,
    currency: "INR",
    totalStock: 45,
    averageReview: 4.6,
    colors: ["green","black","white","red",],
    sizes: ["XS","S","M","L","XL","XXL"],
    image: "https://images.pexels.com/photos/9366471/pexels-photo-9366471.jpeg",
    additionalImages:{
      "green":"https://images.pexels.com/photos/17625222/pexels-photo-17625222.jpeg",
      "black":"https://images.pexels.com/photos/33555530/pexels-photo-33555530.jpeg",
      "white":"https://images.pexels.com/photos/7648372/pexels-photo-7648372.jpeg",
      "red":"https://images.pexels.com/photos/9366471/pexels-photo-9366471.jpeg",
    }
  },

  {
    title: "Premium Soft Tee",
    description: "Premium soft fabric t-shirt",
    category: "womens",
    subcategory: "Premium",
    brand: "PremiumAura",
    price: 999,
    salePrice: 799,
    currency: "INR",
    totalStock: 30,
    averageReview: 4.8,
    colors: ["black","blue","olive","skyblue"],
    sizes: ["XS","S","M","L","XL","XXL"],
    image: "https://images.pexels.com/photos/6256299/pexels-photo-6256299.jpeg",
    additionalImages:{
      "black":"https://images.pexels.com/photos/32587143/pexels-photo-32587143.png",
      "blue":"https://images.pexels.com/photos/8612790/pexels-photo-8612790.jpeg",
      "olive":"https://images.pexels.com/photos/32322207/pexels-photo-32322207.png",
      "skyblue":"https://images.pexels.com/photos/6256299/pexels-photo-6256299.jpeg",
    }
  },
  {
    title: "Luxury Cotton Premium Tee",
    description: "High-end cotton t-shirt",
    category: "womens",
    subcategory: "Premium",
    brand: "ElegantWear",
    price: 1199,
    salePrice: 999,
    currency: "INR",
    totalStock: 28,
    averageReview: 4.7,
    colors: ["white","black","pink"],
    sizes: ["XS","S","M","L","XL","XXL"],
    image: "https://images.pexels.com/photos/30095400/pexels-photo-30095400.jpeg",
    additionalImages:{
      "white":"https://images.pexels.com/photos/30095400/pexels-photo-30095400.jpeg",
      "black":"https://images.pexels.com/photos/9558684/pexels-photo-9558684.jpeg",
      "pink":"https://images.pexels.com/photos/9558699/pexels-photo-9558699.jpeg",
    }
  },
  {
    title: "Classic Polo Fit Tee",
    description: "Elegant polo t-shirt designed for a refined casual look",
    category: "womens",
    subcategory: "Polo",
    brand: "FitZone Women",
    price: 899,
    salePrice: 749,
    currency: "INR",
    totalStock: 40,
    averageReview: 4.6,
    colors: ["white","black","pink","blue"],
    sizes: ["XS","S","M","L","XL","XXL","XXXL"],
    image: "https://images.pexels.com/photos/16048133/pexels-photo-16048133.jpeg",
    additionalImages:{
      "white":"https://images.pexels.com/photos/7648387/pexels-photo-7648387.jpeg",
      "black":"https://images.pexels.com/photos/16048133/pexels-photo-16048133.jpeg",
      "blue":"https://images.pexels.com/photos/5741043/pexels-photo-5741043.jpeg",
      "pink":"https://images.pexels.com/photos/15137043/pexels-photo-15137043.jpeg",
    }
  }
],


kids: [
  {
    title: "Cartoon Printed Tee",
    description: "Fun cartoon printed t-shirt for kids",
    category: "kids",
    subcategory: "Printed",
    brand: "Fun",
    price: 499,
    salePrice: 399,
    currency: "INR",
    totalStock: 60,
    averageReview: 4.5,
    colors: ["red","pink","blue"],
    sizes: ["1Y","2Y","3Y","4Y","5Y","6Y","7Y","8Y","9Y","10Y","11Y","12Y"],
    image: "https://images.pexels.com/photos/29459463/pexels-photo-29459463.jpeg",
    additionalImages: {
      "red":"https://images.pexels.com/photos/36972049/pexels-photo-36972049.jpeg",
      "pink": "https://images.pexels.com/photos/29459463/pexels-photo-29459463.jpeg",
      "blue": "https://images.pexels.com/photos/15210763/pexels-photo-15210763.jpeg"
    }
  },
  {
    title: "Basic Cotton Kids Tee",
    description: "Soft cotton t-shirt for everyday comfort",
    category: "kids",
    subcategory: "Basic",
    brand: "Joy",
    price: 399,
    salePrice: 299,
    currency: "INR",
    totalStock: 70,
    averageReview: 4.4,
    colors: ["white","black","orange"],
    sizes: ["1Y","2Y","3Y","4Y","5Y","6Y","7Y","8Y","9Y","10Y","11Y","12Y"],
    image: "https://images.pexels.com/photos/32071161/pexels-photo-32071161.jpeg",
    additionalImages: {
      "black": "https://images.pexels.com/photos/32071161/pexels-photo-32071161.jpeg",
      "white": "https://images.pexels.com/photos/11307006/pexels-photo-11307006.jpeg",
      "orange":"https://images.pexels.com/photos/36547014/pexels-photo-36547014.jpeg"
    }
  },
  {
    title: "Sports Active Kids Tee",
    description: "Breathable t-shirt for active kids",
    category: "kids",
    subcategory: "Sports",
    brand: "Active",
    price: 599,
    salePrice: 449,
    currency: "INR",
    totalStock: 55,
    averageReview: 4.6,
    colors: ["black","orange","pink","white"],
    sizes: ["1Y","2Y","3Y","4Y","5Y","6Y","7Y","8Y","9Y","10Y","11Y","12Y"],
    image: "https://images.pexels.com/photos/8223914/pexels-photo-8223914.jpeg",
    additionalImages: {
      "black": "https://images.pexels.com/photos/30637226/pexels-photo-30637226.jpeg",
      "orange": "https://images.pexels.com/photos/8337261/pexels-photo-8337261.jpeg",
      "pink": "https://images.pexels.com/photos/8223914/pexels-photo-8223914.jpeg",
      "white": "https://images.pexels.com/photos/8223949/pexels-photo-8223949.jpeg"
    }
  },
  {
    title: "Play Time Casual Tee",
    description: "Comfortable t-shirt for playtime",
    category: "kids",
    subcategory: "Casual",
    brand: "Play",
    price: 499,
    salePrice: 349,
    currency: "INR",
    totalStock: 65,
    averageReview: 4.3,
    colors: ["orange","black","white","gray"],
    sizes: ["1Y","2Y","3Y","4Y","5Y","6Y","7Y","8Y","9Y","10Y","11Y","12Y"],
    image: "https://images.pexels.com/photos/8422251/pexels-photo-8422251.jpeg",
    additionalImages: {
      "orange": "https://images.pexels.com/photos/8422251/pexels-photo-8422251.jpeg",
      "black": "https://images.pexels.com/photos/9300274/pexels-photo-9300274.jpeg",
      "white": "https://images.pexels.com/photos/19914897/pexels-photo-19914897.jpeg",
      "gray": "https://images.pexels.com/photos/8430158/pexels-photo-8430158.jpeg"
    }
  },
  {
    title: "Summer Cool Kids Tee",
    description: "Lightweight t-shirt for summer wear",
    category: "kids",
    subcategory: "Casual",
    brand: "Summer",
    price: 449,
    salePrice: 349,
    currency: "INR",
    totalStock: 60,
    averageReview: 4.4,
    colors: ["white","blue","pink","black"],
    sizes: ["1Y","2Y","3Y","4Y","5Y","6Y","7Y","8Y","9Y","10Y","11Y","12Y"],
    image: "https://images.pexels.com/photos/13327222/pexels-photo-13327222.jpeg",
    additionalImages: {
      "white": "https://images.pexels.com/photos/11307016/pexels-photo-11307016.jpeg",
      "blue": "https://images.pexels.com/photos/33590730/pexels-photo-33590730.jpeg",
      "pink": "https://images.pexels.com/photos/13327222/pexels-photo-13327222.jpeg",
      "black": "https://images.pexels.com/photos/14779679/pexels-photo-14779679.jpeg"
    }
  },
  {
    title: "Winter Warm Kids Tee",
    description: "Full sleeve t-shirt for winter comfort",
    category: "kids",
    subcategory: "Premium",
    brand: "Winter",
    price: 699,
    salePrice: 549,
    currency: "INR",
    totalStock: 45,
    averageReview: 4.6,
    colors: ["orange","skyblue","white"],
    sizes: ["1Y","2Y","3Y","4Y","5Y","6Y","7Y","8Y","9Y","10Y","11Y","12Y"],
    image: "https://images.pexels.com/photos/10951814/pexels-photo-10951814.jpeg",
    additionalImages: {
      "orange": "https://images.pexels.com/photos/10951814/pexels-photo-10951814.jpeg",
      "skyblue": "https://images.pexels.com/photos/18878528/pexels-photo-18878528.jpeg",
      "white": "https://images.pexels.com/photos/1620812/pexels-photo-1620812.jpeg"
    }
  },
  {
    title: "Cute Animal Kids Tee",
    description: "Cute animal printed t-shirt",
    category: "kids",
    subcategory: "Printed",
    brand: "Cute",
    price: 549,
    salePrice: 399,
    currency: "INR",
    totalStock: 50,
    averageReview: 4.7,
    colors: ["white","lightorange","skyblue"],
    sizes: ["1Y","2Y","3Y","4Y","5Y","6Y","7Y","8Y","9Y","10Y","11Y","12Y"],
    image: "https://images.pexels.com/photos/32504634/pexels-photo-32504634.jpeg",
    additionalImages: {
      "white": "https://images.pexels.com/photos/32504634/pexels-photo-32504634.jpeg",
      "lightorange": "https://images.pexels.com/photos/9428927/pexels-photo-9428927.jpeg",
      "skyblue": "https://images.pexels.com/photos/8194964/pexels-photo-8194964.jpeg",
    }
  },
  {
    title: "Cozy Soft Kids Tee",
    description: "Ultra soft t-shirt for daily wear",
    category: "kids",
    subcategory: "Premium",
    brand: "Cozy",
    price: 599,
    salePrice: 449,
    currency: "INR",
    totalStock: 48,
    averageReview: 4.5,
    colors: ["lightgray","white","red"],
    sizes: ["1Y","2Y","3Y","4Y","5Y","6Y","7Y","8Y","9Y","10Y","11Y","12Y"],
    image: "https://images.pexels.com/photos/5483638/pexels-photo-5483638.jpeg",
    additionalImages: {
      "lightgray": "https://images.pexels.com/photos/5483638/pexels-photo-5483638.jpeg",
      "white": "https://images.pexels.com/photos/30683064/pexels-photo-30683064.jpeg",
      "red":"https://images.pexels.com/photos/5490071/pexels-photo-5490071.jpeg"
    }
  },
  {
    title: "Team Sports Kids Tee",
    description: "Sports t-shirt for team activities",
    category: "kids",
    subcategory: "Sports",
    brand: "Team",
    price: 649,
    salePrice: 499,
    currency: "INR",
    totalStock: 40,
    averageReview: 4.6,
    colors: ["blue","white","gray"],
    sizes: ["1Y","2Y","3Y","4Y","5Y","6Y","7Y","8Y","9Y","10Y","11Y","12Y"],
    image: "https://images.pexels.com/photos/8941579/pexels-photo-8941579.jpeg",
    additionalImages: {
      "blue": "https://images.pexels.com/photos/8941579/pexels-photo-8941579.jpeg",
      "white": "https://images.pexels.com/photos/8336898/pexels-photo-8336898.jpeg",
      "grey": "https://images.pexels.com/photos/9040074/pexels-photo-9040074.png"
    }
  },
  {
    title: "Special Edition Kids Tee",
    description: "Premium special design t-shirt",
    category: "kids",
    subcategory: "Premium",
    brand: "Special",
    price: 699,
    salePrice: 549,
    currency: "INR",
    totalStock: 35,
    averageReview: 4.8,
    colors: ["black","white"],
    sizes: ["1Y","2Y","3Y","4Y","5Y","6Y","7Y","8Y","9Y","10Y","11Y","12Y"],
    image: "https://images.pexels.com/photos/1073083/pexels-photo-1073083.jpeg",
    additionalImages: {
      "black": "https://images.pexels.com/photos/18020063/pexels-photo-18020063.jpeg",
      "white": "https://images.pexels.com/photos/1073083/pexels-photo-1073083.jpeg",
    }
  },

  {
    title: "Graphic Fun Kids Tee",
    description: "Stylish graphic print t-shirt",
    category: "kids",
    subcategory: "Printed",
    brand: "Fun",
    price: 549,
    salePrice: 399,
    currency: "INR",
    totalStock: 52,
    averageReview: 4.5,
    colors: ["white","red"],
    sizes: ["1Y","2Y","3Y","4Y","5Y","6Y","7Y","8Y","9Y","10Y","11Y","12Y"],
    image: "https://images.pexels.com/photos/7258348/pexels-photo-7258348.jpeg",
    additionalImages: {
      "white": "https://images.pexels.com/photos/17784282/pexels-photo-17784282.jpeg",
      "red": "https://images.pexels.com/photos/7258348/pexels-photo-7258348.jpeg"
    }
  },
  {
    title: "Basic Everyday Kids Tee",
    description: "Simple and comfortable everyday t-shirt",
    category: "kids",
    subcategory: "Basic",
    brand: "Joy",
    price: 399,
    salePrice: 299,
    currency: "INR",
    totalStock: 68,
    averageReview: 4.3,
    colors: ["white","gray","black"],
    sizes: ["1Y","2Y","3Y","4Y","5Y","6Y","7Y","8Y","9Y","10Y","11Y","12Y"],
    image: "https://images.pexels.com/photos/28491148/pexels-photo-28491148.jpeg",
    additionalImages: {
      "white": "https://images.pexels.com/photos/28491148/pexels-photo-28491148.jpeg",
      "gray": "https://images.pexels.com/photos/8765222/pexels-photo-8765222.jpeg",
      "black": "https://images.pexels.com/photos/28969758/pexels-photo-28969758.jpeg",
    }
  },
  {
    title: "Active Sports Fit Tee",
    description: "Comfortable sportswear t-shirt",
    category: "kids",
    subcategory: "Sports",
    brand: "Active",
    price: 599,
    salePrice: 449,
    currency: "INR",
    totalStock: 54,
    averageReview: 4.6,
    colors: ["black","gray","white"],
    sizes: ["1Y","2Y","3Y","4Y","5Y","6Y","7Y","8Y","9Y","10Y","11Y","12Y"],
    image: "https://images.pexels.com/photos/7427565/pexels-photo-7427565.jpeg",
    additionalImages: {
      "black": "https://images.pexels.com/photos/7201555/pexels-photo-7201555.jpeg",
      "gray": "https://images.pexels.com/photos/7201565/pexels-photo-7201565.jpeg",
      "white": "https://images.pexels.com/photos/7427565/pexels-photo-7427565.jpeg"
    }
  },
  {
    title: "Casual Play Kids Tee",
    description: "Soft casual t-shirt for play",
    category: "kids",
    subcategory: "Casual",
    brand: "Play",
    price: 499,
    salePrice: 349,
    currency: "INR",
    totalStock: 63,
    averageReview: 4.2,
    colors: ["white","blue","green"],
    sizes: ["1Y","2Y","3Y","4Y","5Y","6Y","7Y","8Y","9Y","10Y","11Y","12Y"],
    image: "https://images.pexels.com/photos/33354313/pexels-photo-33354313.jpeg",
    additionalImages: {
      "white": "https://images.pexels.com/photos/32432127/pexels-photo-32432127.jpeg",
      "blue": "https://images.pexels.com/photos/33354313/pexels-photo-33354313.jpeg",
      "green": "https://images.pexels.com/photos/8612860/pexels-photo-8612860.jpeg"
    }
  },
  {
    title: "Summer Breeze Kids Tee",
    description: "Light and breathable summer t-shirt",
    category: "kids",
    subcategory: "Casual",
    brand: "Summer",
    price: 449,
    salePrice: 349,
    currency: "INR",
    totalStock: 58,
    averageReview: 4.3,
    colors: ["blue","skyblue","gray"],
    sizes: ["1Y","2Y","3Y","4Y","5Y","6Y","7Y","8Y","9Y","10Y","11Y","12Y"],
    image: "https://images.pexels.com/photos/7849976/pexels-photo-7849976.jpeg",
    additionalImages: {
      "blue": "https://images.pexels.com/photos/4628229/pexels-photo-4628229.jpeg",
      "skyblue": "https://images.pexels.com/photos/7849976/pexels-photo-7849976.jpeg",
      "gray": "https://images.pexels.com/photos/8668720/pexels-photo-8668720.jpeg",
    }
  },
  {
    title: "Premium Soft Kids Tee",
    description: "Premium quality soft t-shirt",
    category: "kids",
    subcategory: "Premium",
    brand: "Cozy",
    price: 649,
    salePrice: 499,
    currency: "INR",
    totalStock: 42,
    averageReview: 4.6,
    colors: ["gray","white","brown"],
    sizes: ["1Y","2Y","3Y","4Y","5Y","6Y","7Y","8Y","9Y","10Y","11Y","12Y"],
    image: "https://images.pexels.com/photos/8799544/pexels-photo-8799544.jpeg",
    additionalImages: {
      "gray": "https://images.pexels.com/photos/8799544/pexels-photo-8799544.jpeg",
      "white": "https://images.pexels.com/photos/7144417/pexels-photo-7144417.jpeg",
      "brown": "https://images.pexels.com/photos/7144648/pexels-photo-7144648.jpeg"
    }
  },
  {
    title: "Team Active Kids Tee",
    description: "Sports team t-shirt for kids",
    category: "kids",
    subcategory: "Sports",
    brand: "Team",
    price: 649,
    salePrice: 499,
    currency: "INR",
    totalStock: 47,
    averageReview: 4.5,
    colors: ["blue","black","white"],
    sizes: ["1Y","2Y","3Y","4Y","5Y","6Y","7Y","8Y","9Y","10Y","11Y","12Y"],
    image: "https://images.pexels.com/photos/30637225/pexels-photo-30637225.jpeg",
    additionalImages: {
      "blue": "https://images.pexels.com/photos/8941649/pexels-photo-8941649.jpeg",
      "black": "https://images.pexels.com/photos/30637225/pexels-photo-30637225.jpeg",
      "white": "https://images.pexels.com/photos/7186288/pexels-photo-7186288.jpeg",
    }
  },
  {
    title: "Cute Printed Kids Tee",
    description: "Cute printed design t-shirt",
    category: "kids",
    subcategory: "Printed",
    brand: "Cute",
    price: 549,
    salePrice: 399,
    currency: "INR",
    totalStock: 51,
    averageReview: 4.7,
    colors: ["white","black","red"],
    sizes: ["1Y","2Y","3Y","4Y","5Y","6Y","7Y","8Y","9Y","10Y","11Y","12Y"],
    image: "https://images.pexels.com/photos/7988711/pexels-photo-7988711.jpeg",
    additionalImages: {
      "white": "https://images.pexels.com/photos/15179151/pexels-photo-15179151.jpeg",
      "black": "https://images.pexels.com/photos/9553583/pexels-photo-9553583.jpeg",
      "red": "https://images.pexels.com/photos/7988711/pexels-photo-7988711.jpeg",
    }
  },
  {
    title: "Special Edition Kids Tee",
    description: "Premium special design t-shirt",
    category: "kids",
    subcategory: "Premium",
    brand: "Special",
    price: 699,
    salePrice: 549,
    currency: "INR",
    totalStock: 35,
    averageReview: 4.8,
    colors: ["black","white"],
    sizes: ["1Y","2Y","3Y","4Y","5Y","6Y","7Y","8Y","9Y","10Y","11Y","12Y"],
    image: "https://images.pexels.com/photos/1073083/pexels-photo-1073083.jpeg",
    additionalImages: {
      "black": "https://images.pexels.com/photos/18020063/pexels-photo-18020063.jpeg",
      "white": "https://images.pexels.com/photos/1073083/pexels-photo-1073083.jpeg",
    }
  },
  {
    title: "Classic Striped Kids Tee",
    description: "Stylish striped t-shirt for everyday wear",
    category: "kids",
    subcategory: "Casual",
    brand: "Cozy",
    price: 549,
    salePrice: 399,
    currency: "INR",
    totalStock: 59,
    averageReview: 4.5,
    colors: ["green","white","blue","pink"],
    sizes: ["1Y","2Y","3Y","4Y","5Y","6Y","7Y","8Y","9Y","10Y","11Y","12Y"],
    image: "https://images.pexels.com/photos/8687727/pexels-photo-8687727.jpeg",
    additionalImages: {
      "green":"https://images.pexels.com/photos/5444939/pexels-photo-5444939.jpeg",
      "white": "https://images.pexels.com/photos/6437587/pexels-photo-6437587.jpeg",
      "blue": "https://images.pexels.com/photos/34131462/pexels-photo-34131462.jpeg",
      "pink": "https://images.pexels.com/photos/8687727/pexels-photo-8687727.jpeg"
    }
  }
]
};

async function seed20ProductsPerSection() {
  try {
    console.log('Starting to seed 20 products per section...');
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    // Insert all products
    const allProducts = [];
    Object.keys(productsData).forEach(category => {
      allProducts.push(...productsData[category]);
    });
    
    await Product.insertMany(allProducts);
    
    console.log(`Successfully added ${allProducts.length} products!`);
    
    // Display breakdown
    console.log('\nProducts by category:');
    Object.keys(productsData).forEach(category => {
      console.log(`${category}: ${productsData[category].length} products`);
    });
    
    // Show sample products
    console.log('\nSample products:');
    Object.keys(productsData).forEach(category => {
      console.log(`\n${category.toUpperCase()}:`);
      productsData[category].slice(0, 3).forEach((product, i) => {
        console.log(`  ${i+1}. ${product.title} - Rs. ${product.salePrice || product.price}`);
      });
    });
    
  } catch (error) {
    console.error('Error seeding products:', error);
  }
}

// Connect to database and seed
mongoose.connect('mongodb+srv://sapnarai23_db_user:gC3QZMdhEHCzhe2a@ecommerce.w76kwuu.mongodb.net/?appName=ecommerce')
  .then(() => {
    console.log('Connected to database');
    seed20ProductsPerSection();
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  })
  .finally(() => {
    setTimeout(() => {
      mongoose.connection.close();
    }, 5000);
  });
