import { useState } from "react";
import { SiGooglepodcasts } from "react-icons/si";
import { BsCalendar3 } from "react-icons/bs";
import { FaRoute } from "react-icons/fa";
import { MdAdsClick, MdGroups2 } from "react-icons/md";
import {
	BiUserCircle,
	BiPhoneCall,
	BiTimeFive,
	BiLogoGmail,
} from "react-icons/bi";
import { reserverProduct } from "src/pages/api/appConfig";
import { FaLuggageCart } from "react-icons/fa";
import { useTranslation } from "next-i18next";
import Reveal from "@/utils/Reveal";
import Image from "next/image";
const Book = ({ image }) => {
	const { t } = useTranslation("common");
	const initialFormData = {
		name: "",
		email: "",
		phoneNumber: "",
		passengerNumber: "1",
		startDestination: "",
		endDestination: "",
		date: null,
		time: null,
		isRoundTrip: false,
		baggageCount: "",
		message: "",
	};

	const [reservationData, setreservationData] = useState(initialFormData);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (
			!reservationData.name ||
			!reservationData.phoneNumber ||
			!reservationData.startDestination ||
			!reservationData.endDestination ||
			!reservationData.date ||
			!reservationData.time
		) {
			window.alert("Veuillez remplir tous les champs requis.");
			return;
		}

		if (reservationData.passengerNumber > 7) {
			window.alert("Le nombre de passagers ne peut pas dépasser 7.");
			return;
		}

		const isConfirmed = window.confirm("Confirmez-vous la réservation ?");

		if (isConfirmed) {
			try {
				await reserverProduct(reservationData);
				setreservationData(initialFormData);
				window.alert(
					"Vous recevrez un SMS de confirmation dans quelques minutes."
				);
			} catch (error) {
				console.error("Erreur lors de la création de la réservation", error);
			}
		}
	};
	const handleChange = (e) => {
		const { name, value } = e.target;

		setreservationData({ ...reservationData, [name]: value });
	};
	const currentDate = new Date().toISOString().split("T")[0];
	const handleTimeChange = (e) => {
		const timeString = e.target.value; // "HH:MM" format
		const [hours, minutes] = timeString.split(":").map(Number);

		const selectedDateTime = new Date(reservationData.date);
		const currentTime = new Date();

		selectedDateTime.setHours(hours, minutes);

		if (selectedDateTime <= currentTime) {
			window.alert(
				"L'heure doit être au moins une heure plus tard que l'heure actuelle."
			);
		} else {
			setreservationData({ ...reservationData, time: selectedDateTime });
		}
	};
	const formatTimeForInput = (date) => {
		if (!date) return "";

		const hh = String(date.getHours()).padStart(2, "0");
		const mm = String(date.getMinutes()).padStart(2, "0");
		return `${hh}:${mm}`;
	};

	return (
		<>
			<Reveal
				variants={{
					hidden: { opacity: 0, y: 270 },
					visible: { opacity: 1, y: 0 },
				}}
				transition={{
					duration: 1,
					ease: [0, 0.71, 0.2, 1.01],
				}}>
				<section
					id="book-section"
					className="flex flex-col justify-center my-20 ">
					<div className="flex flex-col justify-center items-center gap-2 mt-11">
						<div className="flex justify-center items-center gap-4">
							<SiGooglepodcasts size={32} />
							<span className="text-4xl font-bold">{t("bookingTitle")}</span>
						</div>
						<span className="text-xl font-bold text-primary">Online</span>
					</div>
					<div className="flex justify-center items-center gap-4 text-justify mt-14 flex-col xl:flex-row">
						<form
							className=" w-3/4 xl:w-2/4 mx-12 xl:-ml-10 font-medium text-base/loose text-secondary "
							onSubmit={handleSubmit}>
							<div className="grid md:grid-cols-2 md:gap-2">
								<div className="relative z-0 w-full mb-4 md:mb-2 group">
									<div className="relative">
										<input
											type="text"
											name="name"
											value={reservationData.name}
											onChange={handleChange}
											id="your-name"
											className="block font-normal py-5 px-3 w-full text-sm text-gray-900 bg-primary rounded-lg border-0 border-b-2 border-gray-300 appearance-none peer"
											placeholder={t("bookInputNameLabel")}
											required
										/>
										<label
											htmlFor="name"
											className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
											{t("bookInputNameLabel")}
										</label>
										<div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
											<BiUserCircle size={29} color="Black" />
										</div>
									</div>
								</div>
								<div className="relative z-0 w-full mb-4 md:mb-2 group">
									<div className="relative">
										<input
											type="email"
											name="email"
											value={reservationData.email}
											onChange={handleChange}
											id="your-email"
											className="block font-normal py-5 px-3 w-full text-sm text-gray-900 bg-primary rounded-lg border-0 border-b-2 border-gray-300 appearance-none peer"
											placeholder={t("bookInputEmailLabel")}
										/>
										<label
											htmlFor="email"
											className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
											{t("bookInputEmailLabel")}
										</label>
										<div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
											<BiLogoGmail size={29} color="Black" />
										</div>
									</div>
								</div>
								<div className="relative z-0 w-full mb-4 md:mb-2 group">
									<div className="relative">
										<input
											type="text"
											name="phoneNumber"
											value={reservationData.phoneNumber}
											onChange={handleChange}
											id="phone_number"
											className="block font-normal py-5 px-3 w-full text-sm text-gray-900 bg-primary rounded-lg border-0 border-b-2 border-gray-300 appearance-none peer"
											placeholder={t("bookInputPhoneLabel")}
											required
										/>
										<label
											htmlFor="phone_number"
											className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
											{t("bookInputPhoneLabel")}
										</label>
										<div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
											<BiPhoneCall size={29} color="Black" />
										</div>
									</div>
								</div>
								<div className="relative z-0 w-full mb-4 md:mb-2 group">
									<div className="relative">
										<select
											name="isRoundTrip"
											value={reservationData.isRoundTrip}
											onChange={handleChange}
											id="allez_retour"
											className="block font-normal py-5 px-3 w-full text-sm text-gray-900 bg-primary rounded-lg border-0 border-b-2 border-gray-300 appearance-none peer">
											<option value="false">{t("bookInputOption1")}</option>
											<option value="true">{t("bookInputOption2")}</option>
										</select>
										<label
											htmlFor="allez_retour"
											className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
											{t("bookInputOptionLabel")}
										</label>

										<div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
											<MdAdsClick size={29} color="Black" />
										</div>
									</div>
								</div>
								<div className="relative z-0 w-full mb-4 md:mb-2 group">
									<div className="relative">
										<input
											type="number"
											name="baggageCount"
											id="baggageCount"
											className="block font-normal py-5 px-3 w-full text-sm text-gray-900 bg-primary rounded-lg border-0 border-b-2 border-gray-300 appearance-none peer"
											placeholder={t("bookInputClientBagadeLabel")}
										/>
										<label
											htmlFor="baggageCount"
											className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
											{t("bookInputClientBagadeLabel")}
										</label>
										<div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
											<FaLuggageCart size={29} color="Black" />
										</div>
									</div>
								</div>
								<div className="relative z-0 w-full mb-4 md:mb-2 group">
									<div className="relative">
										<input
											type="number"
											name="passengerNumber"
											value={reservationData.passengerNumber}
											onChange={handleChange}
											id="passengerNumber"
											className="block font-normal py-5 px-3 w-full text-sm text-gray-900 bg-primary rounded-lg border-0 border-b-2 border-gray-300 appearance-none peer"
											placeholder="Aantal passagiers"
										/>
										<label
											htmlFor="passengerNumber"
											className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
											{t("bookInputClientPassengerLabel")}
										</label>
										<div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
											<MdGroups2 size={29} color="Black" />
										</div>
									</div>
								</div>
								<div className="relative z-0 w-full mb-4 md:mb-2 group">
									<div className="relative">
										<input
											type="text"
											name="startDestination"
											value={reservationData.startDestination}
											onChange={handleChange}
											id="startDestination"
											className="block font-normal py-5 px-3 w-full text-sm text-gray-900 bg-primary rounded-lg border-0 border-b-2 border-gray-300 appearance-none peer"
											placeholder={t("bookInputStartDestinationLabel")}
											required
										/>
										<label
											htmlFor="startDestination"
											className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
											{t("bookInputStartDestinationLabel")}
										</label>
										<div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
											<FaRoute size={29} color="Black" />
										</div>
									</div>
								</div>
								<div className="relative z-0 w-full mb-4 md:mb-2 group">
									<div className="relative">
										<input
											type="text"
											name="endDestination"
											value={reservationData.endDestination}
											onChange={handleChange}
											id="end-destination"
											className="block font-normal py-5 px-3 w-full text-sm text-gray-900 bg-primary rounded-lg border-0 border-b-2 border-gray-300 appearance-none peer"
											placeholder={t("bookInputEndDestinationLabel")}
											required
										/>
										<label
											htmlFor="end-destination"
											className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
											{t("bookInputEndDestinationLabel")}
										</label>
										<div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
											<FaRoute size={29} color="Black" />
										</div>
									</div>
								</div>
								<div className="relative z-1 w-full mb-4 md:mb-2 group">
									<div className="relative">
										<input
											required
											type="date"
											value={reservationData.date}
											onChange={(e) =>
												setreservationData({
													...reservationData,
													date: e.target.value,
												})
											}
											min={new Date().toISOString().split("T")[0]}
											placeholder={t("bookInputDateLabel")}
											className="block font-normal py-5 px-3 w-full text-sm text-gray-900 bg-primary rounded-lg border-0 border-b-2 border-gray-300 appearance-none peer"
										/>

										<div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
											<BsCalendar3 size={29} color="Black" />
										</div>
									</div>
								</div>
								<div className="relative z-1 w-full mb-4 md:mb-2 group">
									<div className="relative">
										<input
											type="time"
											value={formatTimeForInput(reservationData.time)}
											onChange={handleTimeChange}
											placeholder={t("bookInputTimeLabel")}
											className="block font-normal py-5 px-3 w-full text-sm text-gray-900 bg-primary rounded-lg border-0 border-b-2 border-gray-300 appearance-none peer"
											required
										/>

										<div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
											<BiTimeFive size={29} color="Black" />
										</div>
									</div>
								</div>
							</div>
							<div className="grid md:grid-cols-1 md:gap-4">
								<div className="relative z-0 w-full mb-4 md:mt-2 group">
									<div className="relative">
										<input
											type="text"
											name="message"
											value={reservationData.message}
											onChange={handleChange}
											id="add-message"
											className="block font-normal py-10 px-3 w-full text-sm text-gray-900 bg-primary rounded-lg border-0 border-b-2 border-gray-300 appearance-none peer"
											placeholder={t("bookInputMessageLabel")}
										/>
										<label
											htmlFor="message"
											className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
											{t("bookInputMessageLabel")}
										</label>
									</div>
								</div>
							</div>
							<button
								aria-label="submit"
								type="submit"
								className="text-white bg-dark focus:ring-4 font-medium rounded-lg text-xl w-full sm:w-auto px-6 py-3 text-center">
								{t("bookButton")}
							</button>
						</form>
						<Reveal
							variants={{
								hidden: { opacity: 0, scale: 0.5 },
								visible: { opacity: 1, scale: 1 },
							}}
							transition={{
								duration: 1,
								ease: [0, 0.71, 0.2, 1.01],
							}}>
							<div className="relative flex justify-end w-[250px] xl:w-[500px] before:absolute">
								<Image
									loading="eager"
									className="z-10 object-cover xl:mr-6 mr-5 mb-5"
									src={image}
									layout="responsive"
									width={427}
									height={456}
									alt="booking_taxi"
								/>
							</div>
						</Reveal>
					</div>
				</section>
			</Reveal>
		</>
	);
};

export default Book;
