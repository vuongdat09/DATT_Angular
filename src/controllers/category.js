import Joi from "joi";
import Category from "../models/category";
import { request } from "express";


const CategorySchema = Joi.object({
    name: Joi.string().required()
})



export const getAllCategory =async (req, res)=>{
    try {
        const category = await Category.find()
        if(category.length=== 0){
            return res.status(400).json({message:"không có danh mục nào"})
        }

        return res.json({category: category})
    } catch (error) {
        return res.status(400).json({message:error})
    }
}

export const addCategory = async (req,res)=>{
    try {
        const body = req.body;
        const category = await Category.create(body);
        if(!category){
            return res.status(400).json({message: "thêm danh mục không thành công"})
        }
        return res.status(200).json({message:category})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
export const getOneCategory = async (req,res)=>{
    try {
        const id = req.params.id
        const category = await Category.findById(id).populate('product');
        if(!category){
            return res.status(400).json({message: " danh mục không có"})
        }
        return res.status(200).json({message:category})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
export const getProductInCategory = async (req,res)=>{
    try {
        const id = req.params.id
        const category = await Category.findById(id);
        if(!category){
            return res.status(400).json({message: " danh mục không có"})
        }
        return res.status(200).json({message:category})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const UpdateCategory = async (req,res)=>{
    try {
        const id = req.params.id
        const body = req.body
        const category = await Category.findByIdAndUpdate(id,body,{new:true});
        if(!category){
            return res.status(400).json({message: " danh mục không có"})
        }
        return res.status(200).json({message:category})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
export const DeleteCategory = async (req,res)=>{
    try {
        const id = req.params.id
        const category = await Category.findByIdAndDelete(id);
        if(!category){
            return res.status(400).json({message: " danh mục không có"})
        }
        return res.status(200).json({message:category})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

