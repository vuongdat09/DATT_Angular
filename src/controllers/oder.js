import Order from "../models/oder";


export const createOrder = async (req, res) => {
  try {
    const { address, total, products } = req.body;

    const order = await Order.create({
      address,
      total,
      products,
      status: 'pending',
    });

    return res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// controllers/order.controller.js

export const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;

    // Kiểm tra xem đơn hàng tồn tại hay không
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: 'Đơn hàng không tồn tại' });
    }
    // Hủy đơn hàng
    await Order.findByIdAndDelete(id);

    return res.status(200).json({ message: 'Đơn hàng đã được hủy thành công' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const getAllOrder = async (req, res) => {
    try {
      const order = await Order.find().populate('products.product').populate('address');
      return res.status(201).json({data: order });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
};



  
  