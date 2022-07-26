const productsSchema ={
  id: String,
  title: String,
  price: String,
  description: String,
  category: String,
  image: String,
  rating: {
  rate: String,
  count: String
  }
};

const usersSchema ={
  name: String,
  email: String,
  phone: String,
  password: String,
  cart: [{
    product:productsSchema,
    count:String
  }]
};
module.exports = {
    productsSchema: productsSchema,
    usersSchema: usersSchema
};
