import mongoose from 'mongoose';

const CartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true,
    min: 0
  }
});

const CartSchema = new mongoose.Schema({
  items: [CartItemSchema],
  total: {
    type: Number,
    default: 0
  }, 
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true,
  versionKey: false
});

const Cart = mongoose.model('Cart', CartSchema);

export default Cart;
