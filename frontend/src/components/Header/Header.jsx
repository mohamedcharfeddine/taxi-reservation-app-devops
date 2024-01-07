import Reveal from "@/utils/Reveal";
import { useTranslation } from "next-i18next";
import Link from "next/link";
const Header = () => {
	const { t } = useTranslation("common");
	const phoneNumber = "+21694055007";
	const openWhatsApp = () => {
		const whatsappUrl = `https://wa.me/${phoneNumber}`;
		window.open(whatsappUrl, "_blank");
	};
	return (
		<>
			<section
				className="relative bg-cover bg-center"
				style={{ backgroundImage: `url('/assets/header.webp')` }}>
				<Reveal
					variants={{
						hidden: { opacity: 0, x: -170 },
						visible: { opacity: 1, x: 0 },
					}}
					transition={{
						duration: 1,
						ease: [0, 0.71, 0.2, 1.01],
					}}>
					<div className="px-4 mx-auto max-w-screen-xl py-24 lg:py-56 relative">
						<h1 className="my-4 text-4xl text-center xl:text-start font-extrabold tracking-tight leading-none text-primary md:text-5xl lg:text-6xl">
							{t("bannerTitle")}
						</h1>
						<div className="text-white -mt-3 text-xl text-center xl:text-start">
							{t("bannerSubTitle")}
						</div>
						<div className="text-white text-2xl py-8 space-y-8 text-center xl:text-start">
							{t("bannerDescribe")}
						</div>

						<div className="flex flex-col xl:flex-row xl:justify-start justify-center items-center">
							<Link passHref legacyBehavior href={`tel:${phoneNumber}`}>
								<a className="inline-flex justify-start items-center py-3 px-5 text-base font-bold text-center text-dark rounded-full bg-primary w-50 cursor-pointer">
									{t("bannerButton")}
								</a>
							</Link>

							<Link passHref legacyBehavior href={`tel:${phoneNumber}`}>
								<span className="inline-flex justify-start items-center py-3 px-5 text-base font-bold text-center text-white cursor-pointer">
									{phoneNumber}
								</span>
							</Link>
						</div>
					</div>
				</Reveal>
			</section>
		</>
	);
};

export default Header;
