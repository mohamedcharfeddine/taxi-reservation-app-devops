import express from "express";
import { validateToken } from "../exception/validateToken.js";

import { ReservationController } from "../controllers/reservation.js";
const router = express.Router();

router.post("/", ReservationController.createReservation);
router.get("/getAll", ReservationController.getAllReservations);
router.put("/reservations/:id/accept", ReservationController.acceptReservation);
router.put("/reservations/:id/reject", ReservationController.rejectReservation);
router.get("/total", ReservationController.countTotalReservations);
router.get("/totalAccepted", ReservationController.countAcceptedReservations);
router.get("/totalRejected", ReservationController.countRejectedReservations);
router.get("/totalPending", ReservationController.countPendingReservations);
router.get(
	"/weeklyReservationStats",
	ReservationController.weeklyReservationStats
);
router.get(
	"/dailyReservationStats",
	ReservationController.dailyReservationStats
);

export const reservationRouter = router;
