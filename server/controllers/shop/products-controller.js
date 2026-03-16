const Product = require("../../models/Product");

const getFilteredProducts = async (req, res) => {
  try {
    const { 
      category = [], 
      brand = [], 
      subcategory = [], 
      sizes = [], 
      colors = [],
      minPrice,
      maxPrice,
      sortBy = "price-lowtohigh" 
    } = req.query;

    let filters = {};

    // Handle category parameter - it can be an array or comma-separated string
    if (category) {
      const categoryArray = Array.isArray(category) ? category : category.split(",");
      if (categoryArray.length > 0 && categoryArray[0]) {
        filters.category = { $in: categoryArray };
      }
    }

    if (brand) {
      const brandArray = Array.isArray(brand) ? brand : brand.split(",");
      if (brandArray.length > 0 && brandArray[0]) {
        const escapeRegex = (str) =>
          String(str).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

        const brandIdToLabel = {
          nike: "Nike",
          adidas: "Adidas",
          puma: "Puma",
          reebok: "Reebok",
          "under-armour": "Under Armour",
          "new-balance": "New Balance",
          asics: "ASICS",
          skechers: "Skechers",
          vans: "Vans",
          converse: "Converse",
          levi: "Levi",
          zara: "Zara",
          "h&m": "H&M",
        };

        // Make brand filtering case-insensitive and support id-style values
        // like 'new-balance' by also matching 'new balance'.
        filters.brand = {
          $in: brandArray.flatMap((b) => {
            const raw = String(b).trim();
            const mapped = brandIdToLabel[raw.toLowerCase()];
            const spaced = raw.replace(/-/g, " ");
            const candidates = [
              raw,
              spaced,
              mapped,
              mapped ? mapped.toLowerCase() : null,
            ].filter(Boolean);
            return candidates.map((c) => new RegExp(`^${escapeRegex(c)}$`, "i"));
          }),
        };
      }
    }

    if (subcategory) {
      const subcategoryArray = Array.isArray(subcategory) ? subcategory : subcategory.split(",");
      if (subcategoryArray.length > 0 && subcategoryArray[0]) {
        filters.subcategory = { $in: subcategoryArray };
      }
    }

    if (sizes) {
      const sizesArray = Array.isArray(sizes) ? sizes : sizes.split(",");
      if (sizesArray.length > 0 && sizesArray[0]) {
        filters.sizes = { $in: sizesArray };
      }
    }

    if (colors) {
      const colorsArray = Array.isArray(colors) ? colors : colors.split(",");
      if (colorsArray.length > 0 && colorsArray[0]) {
        filters.colors = { $in: colorsArray };
      }
    }

    // Price range filtering
    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) filters.price.$gte = parseFloat(minPrice);
      if (maxPrice) filters.price.$lte = parseFloat(maxPrice);
    }

    let sort = {};

    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1;
        break;
      case "price-hightolow":
        sort.price = -1;
        break;
      case "title-atoz":
        sort.title = 1;
        break;
      case "title-ztoa":
        sort.title = -1;
        break;
      case "rating":
        sort.averageReview = -1;
        break;
      case "name":
        sort.title = 1;
        break;
      default:
        sort.price = 1;
        break;
    }

    const products = await Product.find(filters).sort(sort);

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    
    const product = await Product.findOne({ _id: id });

    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });

    // Send the product data
    return res.status(200).json({
      success: true,
      data: {
        _id: product._id,
        title: product.title,
        description: product.description,
        category: product.category,
        subcategory: product.subcategory,
        brand: product.brand,
        price: product.price,
        salePrice: product.salePrice,
        totalStock: product.totalStock,
        averageReview: product.averageReview,
        colors: product.colors,
        sizes: product.sizes,
        material: product.material,
        fit: product.fit,
        image: product.image,
        additionalImages: product.additionalImages,
        features: product.features,
        careInstructions: product.careInstructions,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt
      },
    });

  } catch (e) {
    console.log('Error in getProductDetails:', e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

module.exports = { getFilteredProducts, getProductDetails };
