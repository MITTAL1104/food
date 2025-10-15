import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{type:String,required:true,unique:true},
    image:{type:String,required:true},
    foods:[{type:mongoose.Schema.Types.ObjectId,ref:"food"}]
})

const categoryModel = mongoose.models.category || mongoose.model("category",categorySchema);

export default categoryModel;