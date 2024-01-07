import { Notification } from "../models/notification.js";
import { handler } from "../exception/handler.js";

export class NotificationController {
	static async createNotification(req, res) {
		try {
			const { content } = req.body;

			const notification = new Notification({
				content,
			});

			await notification.save();

			const io = req.app.get("io");
			io.emit("nouvelle_notification", notification);

			res.status(201).json(notification);
		} catch (error) {
			return handler(res, "CREATE_NOTIFICATION", error.message);
		}
	}

	static async getNotifications(req, res) {
		try {
			const notifications = await Notification.find().sort({ createdAt: -1 });
			res.status(200).json(notifications);
		} catch (error) {
			return handler(res, "GET_NOTIFICATIONS", error.message);
		}
	}

	static async getPaginatedNotifications(req, res) {
		try {
			const { page, pageSize } = req.query;
			const pageInt = parseInt(page) || 1;
			const pageSizeInt = parseInt(pageSize) || 10;
			const skipCount = (pageInt - 1) * pageSizeInt;

			const notifications = await Notification.find()
				.sort({ createdAt: -1 })
				.skip(skipCount)
				.limit(pageSizeInt);

			res.status(200).json(notifications);
		} catch (error) {
			return handler(res, "GET_PAGINATED_NOTIFICATIONS", error.message);
		}
	}

	static async markNotificationAsRead(req, res) {
		try {
			const id = req.params.id;
			const notification = await Notification.findByIdAndUpdate(
				id,
				{ isRead: true },
				{ new: true }
			);
			res.status(200).json(notification);
		} catch (error) {
			return handler(res, "MARK_NOTIFICATION_AS_READ", error.message);
		}
	}

	static async deleteNotification(req, res) {
		try {
			const { id } = req.params;
			await Notification.findByIdAndDelete(id);
			res.status(204).send();
		} catch (error) {
			return handler(res, "DELETE_NOTIFICATION", error.message);
		}
	}

	static async markAllNotificationsAsRead(req, res) {
		try {
			await Notification.updateMany(
				{ isRead: false },
				{ $set: { isRead: true } }
			);
			res.status(200).json({ message: "All notifications marked as read" });
		} catch (error) {
			return handler(res, "UPDATE_NOTIFICATION", error.message);
		}
	}
}
