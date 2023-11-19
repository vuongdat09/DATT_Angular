import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"
import Category from "./category";
import { string } from "joi";

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    desc: {
        type: String, 
    },
    image: {
        type: String,
    },
    quantity:{
        type: Number,
        required: true,
        min: 0
    },
    sale:{
        type:Number,
        min: 0
    },
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: "Category"
    }
}, {
    timestamps: true,
    versionKey: false
})

productSchema.pre("save", async function (next) {
    const product = this;
    try {
        const result = await Category.updateOne({
            _id: product.categoryId
        }, {
            $push: {
                product: product._id
            }
        });
        next();
    } catch (error) {
        next(error)
    }
})

productSchema.plugin(mongoosePaginate)

export default mongoose.model('Product', productSchema)