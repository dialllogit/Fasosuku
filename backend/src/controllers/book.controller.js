import Book from '../models/Book.js';
import { NotFoundError } from '../utils/errors.js';

export const searchBooks = async (req, res, next) => {
  try {
    const { q, category, page = 1, limit = 10 } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (q) filter.$text = { $search: q };
    filter.status = 'published';

    const skip = (page - 1) * limit;
    const books = await Book.find(filter)
      .populate('author', 'firstName lastName avatar')
      .skip(skip)
      .limit(limit);

    const total = await Book.countDocuments(filter);

    res.status(200).json({
      success: true,
      books,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id).populate('author');

    if (!book) {
      throw new NotFoundError('Book');
    }

    // Increment views
    book.stats.views += 1;
    await book.save();

    res.status(200).json({
      success: true,
      book
    });
  } catch (error) {
    next(error);
  }
};

export const createBook = async (req, res, next) => {
  try {
    const { title, description, category, chapters } = req.body;

    const book = await Book.create({
      title,
      description,
      category,
      chapters,
      author: req.user._id
    });

    res.status(201).json({
      success: true,
      message: 'Book created',
      book
    });
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      throw new NotFoundError('Book');
    }

    if (book.author.toString() !== req.user._id.toString()) {
      throw new Error('Not authorized to update this book');
    }

    Object.assign(book, req.body);
    await book.save();

    res.status(200).json({
      success: true,
      message: 'Book updated',
      book
    });
  } catch (error) {
    next(error);
  }
};
