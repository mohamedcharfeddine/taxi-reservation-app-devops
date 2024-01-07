import { Reservation } from "../models/reservation.js";
import { Notification } from "../models/notification.js";
import { handler } from "../exception/handler.js";
import moment from "moment/moment.js";

export class ReservationController {
	static async createReservation(req, res) {
		try {
			const reservation = new Reservation(req.body);
			await reservation.save();

			const content = "A new reservation has been made.";

			const notification = new Notification({
				content,
				type: "reservation",
			});

			await notification.save();
			const io = req.app.get("io");
			io.emit("nouvelle_notification", notification);

			res.status(201).json(reservation);
		} catch (error) {
			return handler(res, "CREATE_RESERVATION", error.message);
		}
	}

	static async getAllReservations(req, res) {
		try {
			const page = req.query.page || 1;
			const limit = req.query.limit || 10;
			const offset = (page - 1) * limit;
			const totalCount = await Reservation.countDocuments();

			const reservations = await Reservation.find()
				.sort({ createdAt: -1 })
				.limit(limit)
				.skip(offset);

			res
				.status(200)
				.json({
					reservations,
					currentPage: page,
					totalPages: Math.ceil(totalCount / limit),
				});
		} catch (error) {
			return handler(res, "GET_RESERVATION", error.message);
		}
	}

	static async acceptReservation(req, res) {
		const { id } = req.params;
		try {
			const reservation = await Reservation.findByIdAndUpdate(
				id,
				{ status: "accepte" },
				{ new: true }
			);

			if (!reservation) {
				return handler(
					res,
					"RESERVATION_NOT_FOUND",
					"Réservation introuvable."
				);
			}

			res.status(200).json(reservation);
		} catch (error) {
			return handler(res, "ACCEPT_RESERVATION", error.message);
		}
	}

	static async rejectReservation(req, res) {
		const { id } = req.params;
		try {
			const reservation = await Reservation.findByIdAndUpdate(
				id,
				{ status: "refuse" },
				{ new: true }
			);

			if (!reservation) {
				return handler(
					res,
					"RESERVATION_NOT_FOUND",
					"Réservation introuvable."
				);
			}

			res.status(200).json(reservation);
		} catch (error) {
			return handler(res, "REJECT_RESERVATION", error.message);
		}
	}

	static async countTotalReservations(req, res) {
		try {
			const count = await Reservation.countDocuments();
			res.status(200).json(count);
		} catch (error) {
			return handler(res, "COUNT_TOTAL_RESERVATIONS", error.message);
		}
	}
	static async countAcceptedReservations(req, res) {
		try {
			const count = await Reservation.countDocuments({ status: "accepte" });
			res.status(200).json(count);
		} catch (error) {
			return handler(res, "COUNT_ACCEPTED_RESERVATIONS", error.message);
		}
	}

	static async countRejectedReservations(req, res) {
		try {
			const count = await Reservation.countDocuments({ status: "refuse" });
			res.status(200).json(count);
		} catch (error) {
			return handler(res, "COUNT_REJECTED_RESERVATIONS", error.message);
		}
	}

	static async countPendingReservations(req, res) {
		try {
			const count = await Reservation.countDocuments({ status: "en attente" });
			res.status(200).json(count);
		} catch (error) {
			return handler(res, "COUNT_PENDING_RESERVATIONS", error.message);
		}
	}
	static async weeklyReservationStats(req, res) {
		try {
			const currentDate = moment();

			const weeklyStats = [];

			for (let i = 6; i >= 0; i--) {
				const startDate = currentDate
					.clone()
					.subtract(i, "days")
					.startOf("day");
				const endDate = currentDate.clone().subtract(i, "days").endOf("day");

				const reservations = await Reservation.find({
					createdAt: { $gte: startDate, $lte: endDate },
				});

				const dayOfWeek = startDate.format("ddd");
				weeklyStats.push({ day: dayOfWeek, count: reservations.length });
			}

			res.status(200).json(weeklyStats);
		} catch (error) {
			return handler(res, "WEEKLY_RESERVATION_STATS", error.message);
		}
	}

	static async dailyReservationStats(req, res) {
		try {
			const currentDate = moment();
			const startDate = currentDate.clone().startOf("day");
			const endDate = currentDate.clone().endOf("day");

			const reservations = await Reservation.find({
				date: { $gte: startDate, $lte: endDate },
				status: "accepte", // Filter by the 'accepte' status
			});

			const day = startDate.format("ddd");
			res.status(200).json(reservations);
		} catch (error) {
			return handler(res, "DAILY_RESERVATION_STATS", error.message);
		}
	}
}
