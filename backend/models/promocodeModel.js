import mongoose from "mongoose"

const promoCodeSchema = new mongoose.Schema({
    code:{type:String,required:true,unique:true},
    discountType:{type:String,enum:['percentage','fixed'],required:true},
    discountValue:{type:Number,required:true},
    minOrderValue:{type:Number,required:true},
    maxDiscountValue:{type:Number},
    expiresAt:{type:Date},
    usageLimit:{type:Number},
    usedCount:{type:Number,default:0}
})

const promocodeModel = mongoose.models.promocode || mongoose.model("promocode",promoCodeSchema);
export default promocodeModel;