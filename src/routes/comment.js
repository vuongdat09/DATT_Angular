import express from 'express';
import { createComment 
    ,createRating
    ,deleteComment
    ,deleteRating
    ,getAverageRatingByProduct 
    ,getCommentsByProduct 
    ,getRatingsByUser
    ,updateComment
    ,updateRating
} from '../controllers/comment';

const router = express.Router();

// Bình luận
router.post('/comment', createComment);
router.put('/comment/:commentId', updateComment);
router.delete('/comment/:commentId', deleteComment);
router.get('/comment/product/:productId', getCommentsByProduct);

// Đánh giá
router.post('/rating', createRating);
router.put('/rating/:ratingId', updateRating);
router.delete('/rating/:ratingId', deleteRating);
router.get('/rating/user/:userId', getRatingsByUser);
router.get('/rating/product/:productId/average', getAverageRatingByProduct);

export default router;
