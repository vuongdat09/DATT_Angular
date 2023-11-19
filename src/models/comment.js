import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  content: {
    type: String,
    required: true
  }
}, { timestamps: true });

const ratingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  rating: {
    type: Number,
    required: true
  }
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);
const Rating = mongoose.model('Rating', ratingSchema);

export { Comment, Rating };
