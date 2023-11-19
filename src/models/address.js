import mongoose from 'mongoose';

const addressSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  }
}, { timestamps: true, versionKey: false });

export default mongoose.model('Address', addressSchema);
