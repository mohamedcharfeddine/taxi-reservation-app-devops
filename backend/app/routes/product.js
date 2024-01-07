import express from "express";
import { ProductController } from "../controllers/product.js";
import { validateToken } from "../exception/validateToken.js";
import { checkUserRole } from "../middlewares/middleware.js";

import multer from "multer";
import path from "path";
const router = express.Router();
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads");
	},
	filename: (req, file, cb) => {
		cb(
			null,
			file.fieldname + "-" + Date.now() + "-" + path.extname(file.originalname)
		);
	},
});

const upload = multer({ storage: storage }).single("image");

router.get("/", ProductController.listProduct);

router.get("/services", ProductController.getAllProductClient);

router.get("/:id", ProductController.showProduct);
router.get("/showProductAdmin/:id", ProductController.showProductAdmin);

router.post(
	"/addProduct",
	validateToken,
	checkUserRole("admin"),
	upload,
	ProductController.addProduct
);

router.put(
	"/:id",
	validateToken,
	upload,
	checkUserRole("admin"),
	ProductController.updateProduct
);

router.delete(
	"/:id",
	validateToken,
	checkUserRole("admin"),
	ProductController.destroyProduct
);

router.put("/:id/favorite", validateToken, ProductController.toggleFavorite);

export const productRouter = router;
