import Cart from "../models/cart";
import Product from "../models/product";

export const getCartByUserId =async (req, res) =>{
    try {
        const {userId} = req.params

        const cart = await Cart.findOne({user : userId}).populate('items.product')
        if(!cart){
            return res.status(404).json({message: 'không có sản phẩm nào trong giỏ hàng'})
        }
        return res.status(200).json({message:"hiển thị sản phẩm ",data:cart})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

// Thêm sản phẩm vào giỏ hàng
export const addToCart = async (req, res) => {
    try {
      const body = req.body;
      const {userId, productId ,quantity} = body
      const product = await Product.findById(productId); // Lấy thông tin sản phẩm từ database
      if (!product) {
        return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
      }
      const price = product.price * quantity
      const cart = await Cart.findOneAndUpdate(
        { user: userId },
        { $push: { items: { product:product._id, quantity: quantity, price: price  } } },
        { new: true, upsert: true }
      );
      return res.status(200).json(cart);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  // Xóa sản phẩm khỏi giỏ hàng
export  const removeFromCart = async (req, res) => {
    try {
      const { userId, id } = req.params;
      const cart = await Cart.findOneAndUpdate(
        { user: userId },
        { $pull: { items: { _id: id } } },
        { new: true }
      );
      return res.status(200).json(cart);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
};