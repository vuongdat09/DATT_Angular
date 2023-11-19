import mongoose from "mongoose";
import Product from "./product";
import MongoosePaginate from "mongoose-paginate-v2";
import MongooseDelete from "mongoose-delete";

const plugin =  [MongoosePaginate, MongooseDelete]

const categorySchema = mongoose.Schema({
    name: {
        type: String
    },
    desc: {
        type: String
    },
    product: [{
        type: mongoose.Types.ObjectId,
        ref: "Product"
    }]
},{timestamps: true , versionKey: false}
)

    categorySchema.pre('findOneAndDelete' , async function (next) {
        try {
            const products = await Product.find({
                categoryId : this._conditions._id
            })
            for (let i = 0; i < products.length; i++) {
                const product = products[i];
                product.categoryId.pull(this._conditions._id)
                await product.save()
            }
            return next()
        } catch (error) {
            next(error)
        }
    })
    plugin.forEach((plugin)=>{
        categorySchema.plugin(plugin)
    })

export default mongoose.model("Category", categorySchema)