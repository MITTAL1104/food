import express from "express"
import { createPromoCode,deletePromoCode,getPromoCode,validatePromoCode } from "../controllers/promocodeController.js";
import authMiddleware from "../middleware/auth.js";

const promocodeRouter = express.Router();

promocodeRouter.post("/add",createPromoCode)
promocodeRouter.delete("/remove",deletePromoCode)
promocodeRouter.get("/get",getPromoCode)
promocodeRouter.post("/validate",validatePromoCode)

export default promocodeRouter;