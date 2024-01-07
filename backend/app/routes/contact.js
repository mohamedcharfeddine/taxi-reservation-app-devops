import express from "express";
import { ContactController } from "../controllers/contact.js";
import { validateToken } from "../exception/validateToken.js";
import { checkUserRole } from "../middlewares/middleware.js";

const router = express.Router();

router.post("/addMessage", ContactController.createContact);

router.get("/displayMessage", ContactController.getContacts);

export const contactRouter = router;
