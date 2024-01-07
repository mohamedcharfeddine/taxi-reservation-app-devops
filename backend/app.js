import mongoose from "mongoose";
import express from "express";
import { productRouter } from "./app/routes/product.js";
import { usersRouter } from "./app/routes/user.js";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" assert { type: "json" };
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { reservationRouter } from "./app/routes/reservation.js";
import { contactRouter } from "./app/routes/contact.js";
import { notificationRouter } from "./app/routes/notification.js";
import http from "http";
import { Server } from "socket.io";
import { User } from "./app/models/user.js";
import bcrypt from "bcrypt";
import compression from "compression";

dotenv.config();

mongoose
	.connect(`${process.env.MONGO_URI}`, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Connected to database");
		createInitialUser();
	})
	.catch((err) => console.log("Unable to connect", err));

const app = express();
app.use(compression());
app.use(express.json());
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(
	session({
		secret: "taxireservationapp",
		resave: false,
		saveUninitialized: true,
	})
);

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
		credentials: true,
	},
});
app.set("io", io);
io.on("connection", (socket) => {
	console.log("Un utilisateur s'est connecté !");

	socket.on("disconnect", () => {
		console.log("Un utilisateur s'est déconnecté !");
	});
});

server.listen(8080, () => {
	console.log("Serveur WebSocket écoutant sur le port 8080");
});

app.get("/", (req, res) => {
	res.send("Welcome to the API");
});

app.use("/api/products", productRouter);
app.use("/api/user", usersRouter);
app.use("/api/reservation", reservationRouter);
app.use("/api/contact", contactRouter);
app.use("/api/notifications", notificationRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
async function createInitialUser() {
	// Check if the user already exists
	const userExists = await User.findOne({ email: "admin@admin.com" });

	if (!userExists) {
		// Create a new user
		const newUser = new User({
			username: "Admin",
			email: "admin@admin.com",
			password: await bcrypt.hash("adminadmin", 10),
			role: "admin",
		});

		await newUser.save();
		console.log("Initial user created!");
	} else {
		console.log("Initial user already exists!");
	}
}
