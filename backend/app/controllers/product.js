import { handler } from "../exception/handler.js";
import { Product } from "../models/products.js";
export class ProductController {
	static async listProduct(req, res) {
		try {
			const page = req.query.page || 1;
			const limit = req.query.limit || 3;
			const offset = (page - 1) * limit;
			const lang = req.query.lang || "en";

			const favoriteProducts = await Product.find({
				deletedAt: null,
				isFavorite: true,
			});

			const nonFavoriteProducts = await Product.find({
				deletedAt: null,
				isFavorite: { $ne: true },
			}).sort({ createdAt: -1 });

			const combinedProducts = [...favoriteProducts, ...nonFavoriteProducts];

			const totalCount = combinedProducts.length;
			const totalPages = Math.ceil(totalCount / limit);
			const paginatedProducts = combinedProducts.slice(offset, offset + limit);

			const imageIds = paginatedProducts.map((product) => product.id);
			const images = await Product.find({
				_id: { $in: imageIds },
				deletedAt: null,
			}).select("image");

			const productImages = {};
			if (Array.isArray(images)) {
				for (const product of paginatedProducts) {
					const matchingImage = images.find((image) => image.id === product.id);
					if (matchingImage) {
						productImages[product.id] = matchingImage.image;
					} else {
						productImages[product.id] = "";
					}
				}
			} else {
				for (const product of paginatedProducts) {
					productImages[product.id] = "";
				}
			}

			const localizedProducts = paginatedProducts.map((product) => {
				const localizedProduct = {
					_id: product._id,
					langue: lang,
					image: product.image,
					user_id: product.user_id,
					deletedAt: product.deletedAt,
					createdAt: product.createdAt,
					__v: product.__v,
					name: "",
					description: "",
					isFavorite: product.isFavorite,
				};

				switch (lang) {
					case "fr":
						localizedProduct.name = product.name_fr;
						localizedProduct.description = product.description_fr;
						break;
					case "en":
						localizedProduct.name = product.name_en;
						localizedProduct.description = product.description_en;
						break;
					default:
						localizedProduct.name = product.name_fl;
						localizedProduct.description = product.description_fl;
				}

				return localizedProduct;
			});

			return res.json({
				products: localizedProducts,
				productImages,
				currentPage: page,
				totalPages,
			});
		} catch (error) {
			return handler(res, "PRODUCTS_LIST_FETCH", error.message);
		}
	}

	static async getAllProductClient(req, res) {
		try {
			const lang = req.query.lang || "fl";
			const products = await Product.find({ deletedAt: null }).sort({
				isFavorite: -1,
				createdAt: -1,
			});
			const images = await Product.find().select("image");
			const productImages = {};
			if (Array.isArray(images)) {
				for (const product of products) {
					const matchingImage = images.find((image) => image.id === product.id);

					if (matchingImage) {
						productImages[product.id] = matchingImage.image;
					} else {
						productImages[product.id] = "";
					}
				}
			} else {
				for (const product of products) {
					productImages[product.id] = "";
				}
			}

			const localizedProducts = products.map((product) => {
				const localizedProduct = {
					_id: product._id,
					langue: lang,
					image: product.image,
					user_id: product.user_id,
					deletedAt: product.deletedAt,
					createdAt: product.createdAt,
					__v: product.__v,
					name: "",
					description: "",
					isFavorite: product.isFavorite,
				};

				switch (lang) {
					case "fr":
						localizedProduct.name = product.name_fr;
						localizedProduct.description = product.description_fr;
						break;
					case "en":
						localizedProduct.name = product.name_en;
						localizedProduct.description = product.description_en;
						break;
					default:
						localizedProduct.name = product.name_fl;
						localizedProduct.description = product.description_fl;
				}

				return localizedProduct;
			});

			return res.json({ products: localizedProducts, productImages });
		} catch (error) {
			return handler(res, "PRODUCTS_LIST_FETCH", error.message);
		}
	}

	static async showProduct(req, res) {
		try {
			const productId = req.params.id;
			const lang = req.query.lang || "fl";
			let localizedProduct = null;

			const product = await Product.findById(productId);

			if (!product) {
				return handler(res, "GET_PRODUCT", "Produit non trouvé", 404);
			}

			switch (lang) {
				case "fr":
					localizedProduct = {
						_id: product._id,
						langue: "fr",
						name: product.name_fr,
						description: product.description_fr,
						image: product.image,
						isFavorite: product.isFavorite,
					};
					break;
				case "en":
					localizedProduct = {
						_id: product._id,
						langue: "en",
						name: product.name_en,
						description: product.description_en,
						image: product.image,
						isFavorite: product.isFavorite,
					};
					break;
				default:
					localizedProduct = {
						_id: product._id,
						langue: "fl",
						name: product.name_fl,
						description: product.description_fl,
						image: product.image,
						isFavorite: product.isFavorite,
					};
			}

			return res.json(localizedProduct);
		} catch (error) {
			return handler(res, "GET_PRODUCT", error.message, 404);
		}
	}

	static async showProductAdmin(req, res) {
		try {
			const product = await Product.findById(req.params.id);
			if (!product) {
				return handler(res, "GET_PRODUCT", "Produit non trouvé", 404);
			}
			return res.json(product);
		} catch (error) {
			return handler(res, "GET_PRODUCT", error.message, 404);
		}
	}

	static async addProduct(req, res) {
		try {
			const {
				name_fr,
				name_en,
				name_fl,
				description_fr,
				description_en,
				description_fl,
			} = req.body;
			const userId = req.user && req.user.id;
			const userRole = req.user && req.user.role;
			const image = "/" + req.file.path.replace("\\", "/");

			if (!userId || userRole !== "admin") {
				return res.status(401).send("You are not authorized");
			}
			const newProduct = new Product({
				user_id: req.user.id,
				name_fr,
				name_en,
				name_fl,
				description_fr,
				description_en,
				description_fl,
				image: req.file.filename,
			});
			const product = await newProduct.save();
			return res.json(product);
		} catch (error) {
			return handler(res, "ADD_PRODUCT", error.message);
		}
	}

	static async updateProduct(req, res) {
		const productId = req.params.id;
		const data = req.body;
		const userId = req.user && req.user.id;
		const userRole = req.user && req.user.role;

		try {
			if (!userId || userRole !== "admin") {
				return res.status(401).send("You are not authorized");
			}

			const product = await Product.findById(productId);
			if (!product) {
				return handler(res, "UPDATE_PRODUCT", "Product not found", 404);
			}

			if (req.file) {
				const image = req.file.filename;
				product.image = image;
			}

			product.set(data);
			await product.save();
			return res.json(product);
		} catch (error) {
			return handler(res, "UPDATE_PRODUCT", error.message);
		}
	}

	static async destroyProduct(req, res) {
		const productId = req.params.id;
		const userId = req.user && req.user.id;
		const userRole = req.user && req.user.role;

		try {
			if (!userId || userRole !== "admin") {
				return res.status(401).send("You are not authorized");
			}
			const product = await Product.findByIdAndUpdate(productId, {
				deletedAt: new Date(),
			});

			if (!product) {
				return handler(res, "DELETE_PRODUCT", "Product not found", 404);
			}
			return res.json({ msg: "SOFT_DELETE_SUCCESS" });
		} catch (error) {
			return handler(res, "DELETE_PRODUCT", error.message);
		}
	}

	static async toggleFavorite(req, res) {
		try {
			const productId = req.params.id;
			const userId = req.user && req.user.id;

			if (!userId) {
				return res.status(401).json({ message: "Unauthorized" });
			}

			const product = await Product.findById(productId);

			if (!product) {
				return res.status(404).json({ message: "Product not found" });
			}

			if (product.isFavorite) {
				product.isFavorite = false;
				await product.save();
				return res.json({ message: "Product removed from favorites", product });
			} else {
				product.isFavorite = true;
				await product.save();
				return res.json({ message: "Product added to favorites", product });
			}
		} catch (error) {
			return handler(res, "TOGGLE_FAVORITE_PRODUCT", error.message);
		}
	}
}
