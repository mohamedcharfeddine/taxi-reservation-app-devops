import express from "express";
import { NotificationController } from "../controllers/notification.js";

const router = express.Router();

router.post("/", NotificationController.createNotification);

router.get("/", NotificationController.getNotifications);

router.get("/getpaginated", NotificationController.getPaginatedNotifications);

router.put("/:id/markAsRead", NotificationController.markNotificationAsRead);

router.delete("/:id", NotificationController.deleteNotification);

router.put("/markAllRead", NotificationController.markAllNotificationsAsRead);

export const notificationRouter = router;
