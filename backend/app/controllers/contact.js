import { Contact } from "../models/contact.js";
import { handler } from "../exception/handler.js";
import { Notification } from "../models/notification.js";

export class ContactController {
	static async createContact(req, res) {
		try {
			const newContact = new Contact(req.body);
			await newContact.save();
			const content = "A new message has been sent.";

			const notification = new Notification({
				content,
				type: "contact",
			});

			await notification.save();
			const io = req.app.get("io");
			io.emit("nouvelle_notification", notification);

			res.status(201).json(newContact);
		} catch (error) {
			return handler(res, "ADD_CONTACT", error.message);
		}
	}

	static async getContacts(req, res) {
		try {
			const page = req.query.page || 1;
			const limit = req.query.limit || 10;
			const offset = (page - 1) * limit;
			const totalCount = await Contact.countDocuments({ deletedAt: null });

			const contacts = await Contact.find()
				.sort({ createdAt: -1 })
				.limit(limit)
				.skip(offset);
			res
				.status(200)
				.json({
					contacts,
					currentPage: page,
					totalPages: Math.ceil(totalCount / limit),
				});
		} catch (error) {
			return handler(res, "LIST_CONTACT", error.message);
		}
	}
}
