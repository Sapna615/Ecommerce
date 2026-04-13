export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
  {
    name: "phone",
    label: "Phone Number (Optional)",
    placeholder: "Enter your phone number",
    componentType: "input",
    type: "tel",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "mens", label: "Men" },
      { id: "womens", label: "Women" },
      { id: "kids", label: "Kids" },
    ],
  },
  {
    label: "Subcategory",
    name: "subcategory",
    componentType: "select",
    options: [
      // Men's subcategories
      { id: "tops", label: "Tops" },
      { id: "bottoms", label: "Bottoms" },
      { id: "sports", label: "Sports" },
      { id: "outerwear", label: "Outerwear" },
      { id: "formal", label: "Formal" },
      { id: "casual", label: "Casual" },
      { id: "footwear", label: "Footwear" },
      { id: "accessories", label: "Accessories" },
      { id: "swim", label: "Swimwear" },
      // Women's subcategories
      { id: "dresses", label: "Dresses" },
      // Kids' subcategories
      { id: "dresses_kids", label: "Dresses (Kids)" },
      { id: "sleepwear", label: "Sleepwear" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      // Men's brands
      { id: "Essential", label: "Essential" },
      { id: "Premium", label: "Premium" },
      { id: "Urban", label: "Urban" },
      { id: "Comfort", label: "Comfort" },
      { id: "Athletic", label: "Athletic" },
      { id: "Classic", label: "Classic" },
      { id: "Executive", label: "Executive" },
      { id: "Tactical", label: "Tactical" },
      { id: "Street", label: "Street" },
      { id: "Golf", label: "Golf" },
      { id: "Retro", label: "Retro" },
      { id: "Sport", label: "Sport" },
      { id: "Business", label: "Business" },
      { id: "Basic", label: "Basic" },
      { id: "Summer", label: "Summer" },
      { id: "Casual", label: "Casual" },
      { id: "Outdoor", label: "Outdoor" },
      { id: "Sports", label: "Sports" },
      { id: "Accessory", label: "Accessory" },
      { id: "Beach", label: "Beach" },
      { id: "Winter", label: "Winter" },
      { id: "Formal", label: "Formal" },
      // Women's brands
      { id: "Elegant", label: "Elegant" },
      { id: "Office", label: "Office" },
      { id: "Luxury", label: "Luxury" },
      { id: "Cozy", label: "Cozy" },
      { id: "Beach", label: "Beach" },
      { id: "Professional", label: "Professional" },
      { id: "Yoga", label: "Yoga" },
      { id: "Tropical", label: "Tropical" },
      { id: "Denim", label: "Denim" },
      { id: "Trendy", label: "Trendy" },
      { id: "Cute", label: "Cute" },
      { id: "Spring", label: "Spring" },
      { id: "Fashion", label: "Fashion" },
      { id: "Modern", label: "Modern" },
      { id: "Comfort", label: "Comfort" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
  {
    label: "Colors (comma separated)",
    name: "colors",
    componentType: "input",
    type: "text",
    placeholder: "red, blue, green, black",
  },
  {
    label: "Sizes (comma separated)",
    name: "sizes",
    componentType: "input",
    type: "text",
    placeholder: "S, M, L, XL, XXL",
  },
  {
    label: "Material",
    name: "material",
    componentType: "select",
    options: [
      { id: "cotton", label: "Cotton" },
      { id: "polyester", label: "Polyester" },
      { id: "wool", label: "Wool" },
      { id: "denim", label: "Denim" },
      { id: "leather", label: "Leather" },
      { id: "silk", label: "Silk" },
      { id: "linen", label: "Linen" },
      { id: "nylon", label: "Nylon" },
      { id: "spandex", label: "Spandex" },
      { id: "rayon", label: "Rayon" },
    ],
  },
  {
    label: "Fit",
    name: "fit",
    componentType: "select",
    options: [
      { id: "slim", label: "Slim" },
      { id: "regular", label: "Regular" },
      { id: "relaxed", label: "Relaxed" },
      { id: "oversized", label: "Oversized" },
    ],
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "men",
    label: "Men",
    path: "/shop/mens",
  },
  {
    id: "women",
    label: "Women",
    path: "/shop/womens",
  },
  {
    id: "kids",
    label: "Kids",
    path: "/shop/kids",
  },
  {
    id: "contact",
    label: "Contact Us",
    path: "/shop/contact",
  },
  {
    id: "about",
    label: "About Us",
    path: "/shop/about",
  },
  {
    id: "blog",
    label: "Blog",
    path: "/shop/blog",
  },
  // {
  //   id: "search",
  //   label: "Search",
  //   path: "/shop/search",
  // },
];

// ... (rest of the code remains the same)
export const categoryOptionsMap = {
  men: "Men",
  women: "Women",
  kids: "Kids",
};

export const brandOptionsMap = {
  nike: "Nike",
  adidas: "Adidas",
  puma: "Puma",
  levi: "Levi",
  zara: "Zara",
  "h&m": "H&M",
};

export const filterOptions = {
  category: [
    { id: "men", label: "Men" },
    { id: "women", label: "Women" },
    { id: "kids", label: "Kids" },
  ],
  subcategory: [
    { id: "tops", label: "Tops" },
    { id: "bottoms", label: "Bottoms" },
    { id: "sports", label: "Sports" },
    { id: "outerwear", label: "Outerwear" },
    { id: "formal", label: "Formal" },
    { id: "casual", label: "Casual" },
    { id: "footwear", label: "Footwear" },
    // { id: "accessories", label: "Accessories" },
    // { id: "swimwear", label: "Swimwear" },
  ],
  brand: [
    { id: "nike", label: "Nike" },
    { id: "adidas", label: "Adidas" },
    { id: "puma", label: "Puma" },
    { id: "reebok", label: "Reebok" },
    { id: "under-armour", label: "Under Armour" },
    { id: "new-balance", label: "New Balance" },
    { id: "asics", label: "ASICS" },
    { id: "skechers", label: "Skechers" },
    { id: "vans", label: "Vans" },
    { id: "converse", label: "Converse" },
    { id: "essential", label: "Essential" },
    { id: "premium", label: "Premium" },
    { id: "urban", label: "Urban" },
    { id: "comfort", label: "Comfort" },
    { id: "athletic", label: "Athletic" },
    { id: "classic", label: "Classic" },
    { id: "executive", label: "Executive" },
    { id: "tactical", label: "Tactical" },
    { id: "street", label: "Street" },
    { id: "golf", label: "Golf" },
    { id: "retro", label: "Retro" },
    { id: "sport", label: "Sport" },
    { id: "business", label: "Business" },
    { id: "basic", label: "Basic" },
    { id: "summer", label: "Summer" },
    { id: "outdoor", label: "Outdoor" },
    { id: "accessory", label: "Accessory" },
    { id: "beach", label: "Beach" },
    { id: "winter", label: "Winter" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];
