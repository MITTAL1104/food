import express from "express";
import multer from  "multer";
import { addCategory, getAllCategories, removeCategories } from "../controllers/categoryController.js";

const categoryRouter = express.Router();

//Image storage for categories
const storage = multer.diskStorage({
    destination:"category_uploads",
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}${file.originalname}`);
    }
})

const upload = multer({storage})

categoryRouter.post("/add",upload.single("image"),addCategory);
categoryRouter.get("/list",getAllCategories);
categoryRouter.post("/remove",removeCategories)

export default categoryRouter;