import promocodeModel from "../models/promocodeModel.js";

//create promocode from admin panel
const createPromoCode = async(req,res)=>{
    const promo = new promocodeModel({
        code:req.body.code,
        discountType:req.body.discountType,
        discountValue:req.body.discountValue,
        minOrderValue:req.body.minOrderValue,
        maxDiscountValue:req.body.maxDiscountValue,
        expiresAt:req.body.expiresAt,
        usageLimit:req.body.usageLimit
    })

    try{
        await promo.save();
        res.json({success:true,message:"Promocode added"})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//delete promocode
const deletePromoCode = async(req,res)=>{
    try{
        await promocodeModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Promocode removed"})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//get promocode
const getPromoCode = async(req,res)=>{
    try{
        const promos = await promocodeModel.find({});
        res.json({success:true,data:promos});
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//validate a promo code being used
const validatePromoCode = async(req,res)=>{
    try{
        const {code,orderValue} = req.body;
        const promo = await promocodeModel.findOne({code});

        if(!promo){
            return res.json({success:false,message:"Invalid code"});
        }
        if(promo.expiresAt && promo.expiresAt<new Date()){
            return res.json({success:false,message:"Coupon expired"});
        }
        if(promo.usageLimit && promo.usedCount>=promo.usageLimit){
            return res.json({success:false,message:"Usage limit reached"});
        }
        if(orderValue<promo.minOrderValue){
            return res.json({success:false,message:`Please add items worth ₹${promo.minOrderValue-orderValue} more to apply this promo`});
        }
        res.json({success:true,data:promo});
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

export {createPromoCode,deletePromoCode,getPromoCode,validatePromoCode}


