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
  password: String
};
module.exports = {
    productsSchema: productsSchema,
    usersSchema: usersSchema
};
