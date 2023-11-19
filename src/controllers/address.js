import Address from "../models/address";

export const createAddress = async (req , res) => {
    try {
        const { user, address, phone } = req.body;
        const newAddress = new Address({ user, address, phone });
        const savedAddress = await newAddress.save();
        return res.status(201).json(savedAddress);
    } catch ( err ) {
        return res.status(500).json({message: err.message})
    }
}
export const updateAddress = async (req , res) => {
    try {
        const {id} = req.params.id;
        const body = req.body;
        const address = await Address.findOneAndUpdate(id, body,{
            new: true,
        });

        return res.status(201).json(address);
    } catch ( err ) {
        return res.status(500).json({message: err.message})
    }
}
export const getAddress = async (req , res) => {
    try {
        const address = await Address.find().populate('user');
        return res.status(201).json({data:address});
    } catch ( err ) {
        return res.status(500).json({message: err.message})
    }
}

export const getOneAddress = async (req , res) => {
    try {
        const id  = req.params.id;
        const address = await Address.findById(id)
        return res.status(201).json({data:address});

    } catch ( err ) {
        return res.status(500).json({message: err.message})
    }
}
export const deleteAddress = async (req , res) => {
    try {
        const id = req.params.id;
        const address = await Address.findByIdAndDelete(id, {
          new: true,
        });
        if (!address) {
          return res.status(404).json({
            message: "sản phẩm không tồn tại",
          });
        }
        return res.status(200).json({
          message: "xóa sản phẩm thành công",
          address,
        });
      } catch (error) {
        return res.status(400).json({
          message: error.message,
        });
      }
}