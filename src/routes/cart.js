import { getCartByUserId , addToCart,removeFromCart } from "../controllers/cart";
import { checklogin } from "../middlewares/checkPermission";
import express from "express";

const router = express.Router()

router.get('/user/:userId/cart', getCartByUserId);
// Thêm sản phẩm vào giỏ hàng
router.post('/user/:userId/cart/add/:productId',checklogin, addToCart);

// Xóa sản phẩm khỏi giỏ hàng
router.delete('/user/:userId/cart/remove/:itemId', removeFromCart);

export default  router;