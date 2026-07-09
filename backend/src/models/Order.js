import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    unique: true,
    required: true
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [
    {
      book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
      },
      chapter: Number,
      price: Number,
      quantity: { type: Number, default: 1 }
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  platformFee: Number,
  authorEarnings: Number,
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['orange', 'moov', 'wave', 'card'],
    default: 'orange'
  },
  transactionId: String,
  paymentStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  currency: {
    type: String,
    default: 'XOF'
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  completedAt: Date,
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

orderSchema.index({ buyer: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ createdAt: -1 });
orderSchema.index({ transactionId: 1 });

const Order = mongoose.model('Order', orderSchema);

export default Order;
