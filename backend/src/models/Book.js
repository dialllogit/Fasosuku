import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  cover: String,
  category: {
    type: String,
    required: true,
    enum: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography', 'Literature', 'Other']
  },
  institution: String,
  tags: [String],
  chapters: [
    {
      number: Number,
      title: String,
      description: String,
      price: Number,
      content: String,
      preview: Boolean,
      pageCount: Number,
      fileUrl: String,
      fileSize: Number,
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  totalPages: Number,
  language: {
    type: String,
    default: 'fr'
  },
  publishedAt: Date,
  status: {
    type: String,
    enum: ['draft', 'pending', 'published', 'suspended'],
    default: 'draft'
  },
  stats: {
    views: { type: Number, default: 0 },
    purchases: { type: Number, default: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviews: { type: Number, default: 0 },
    revenue: { type: Number, default: 0 }
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for search
bookSchema.index({ title: 'text', description: 'text', tags: 'text' });
bookSchema.index({ author: 1 });
bookSchema.index({ category: 1 });
bookSchema.index({ status: 1 });

const Book = mongoose.model('Book', bookSchema);

export default Book;
