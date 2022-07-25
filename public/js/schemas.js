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
  id: String,
  password: String
};
module.exports = {
    productsSchema: productsSchema,
    usersSchema: usersSchema
};
