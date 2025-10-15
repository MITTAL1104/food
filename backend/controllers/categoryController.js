import categoryModel from "../models/categoryModel.js";

const addCategory = async(req,res)=>{

    const {name} = req.body;
    const image_filename = req.file.filename;
    let foods =[];
    if(req.body.foods){
        foods=JSON.parse(req.body.foods);
    }

    if(!name || !image_filename){
        return res.json({success:false,message:"Name and image are required"});
    }

    //Check if category exists
    const existingCategory = await categoryModel.findOne({name});
    if(existingCategory){
        return res.json({success:false,message:"Category already exists"});
    }

    const category = new categoryModel({
        name,
        image:image_filename,
        foods,
    });

    try{
    await category.save();
    res.json({success:true,message:"Category Added"})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

const getAllCategories = async(req,res)=>{
    try{
        const categories = await categoryModel.find({});
        res.json({success:true,data:categories})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

const removeCategories = async(req,res)=>{
    const categoryId = req.body.id;

    //check for existence of the categoryId

    try{
        const category = await categoryModel.findById(categoryId);

        if(!category){
            return res.json({success:false,message:"Error"});
        }

        if(category.foods.length>0){
            return res.json({success:false,message:"Category cannot be deleted"})
        }

        await categoryModel.findByIdAndDelete(categoryId);
        res.json({success:true,message:"Category deleted"})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

export {addCategory,getAllCategories,removeCategories}
