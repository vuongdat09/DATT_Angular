import { Comment , Rating } from "../models/comment"; // Thay đổi đường dẫn tới models nếu cần

// Controller để tạo bình luận
export const createComment = async (req, res) => {
  try {
    const { userId, productId, content } = req.body;
    const comment = await Comment.create({ userId, productId, content });
    return res.status(201).json({ comment });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Controller để tạo đánh giá
export const createRating = async (req, res) => {
  try {
    const { userId, productId, rating } = req.body;
    const newRating = await Rating.create({ userId, productId, rating });
    return res.status(201).json({ rating: newRating });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Controller để lấy tất cả bình luận theo sản phẩm
export const getCommentsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const comments = await Comment.find({ productId }).populate('userId');
    return res.status(200).json({ data:comments });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Controller để lấy đánh giá trung bình theo sản phẩm
export const getAverageRatingByProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const ratings = await Rating.find({ productId });
    const totalRatings = ratings.length;
    const sumRatings = ratings.reduce((acc, rating) => acc + rating.rating, 0);
    const averageRating = sumRatings / totalRatings;
    return res.status(200).json({ averageRating });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Sửa bình luận
export const updateComment = async (req, res) => {
    try {
      const { commentId } = req.params;
      const { content } = req.body;
      const updatedComment = await Comment.findByIdAndUpdate(commentId, { content }, { new: true });
      return res.status(200).json({ comment: updatedComment });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  // Xóa bình luận
  export const deleteComment = async (req, res) => {
    try {
      const { commentId } = req.params;
      await Comment.findByIdAndDelete(commentId);
      return res.status(200).json({ message: 'Bình luận đã được xóa' });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  // Sửa đánh giá
  export const updateRating = async (req, res) => {
    try {
      const { ratingId } = req.params;
      const { rating } = req.body;
      const updatedRating = await Rating.findByIdAndUpdate(ratingId, { rating }, { new: true });
      return res.status(200).json({ rating: updatedRating });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  // Xóa đánh giá
  export const deleteRating = async (req, res) => {
    try {
      const { ratingId } = req.params;
      await Rating.findByIdAndDelete(ratingId);
      return res.status(200).json({ message: 'Đánh giá đã được xóa' });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  // Lấy tất cả đánh giá bởi người dùng
  export const getRatingsByUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const ratings = await Rating.find({ userId });
      return res.status(200).json({ ratings });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
