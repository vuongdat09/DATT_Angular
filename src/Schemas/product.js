import joi from "joi";

const productShema = joi.object({
    name:joi.string().required(),
    price:joi.number().required(),
    desc:joi.string(),
    image:joi.string().required(),
    quantity:joi.number().required(),
    sale:joi.number(),
    categoryId:joi.string().required(),
})

export default productShema