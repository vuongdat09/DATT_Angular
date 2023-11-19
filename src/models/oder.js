import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  address: {
    type: mongoose.Types.ObjectId,
    ref: 'Address',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'received', 'shipping', 'delivered'],
    default: 'pending'
  },
  total: {
    type: Number,
    required: true
  },
  products: [
    {
      product: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    }
  ]
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;
