/* eslint-disable @next/next/no-html-link-for-pages */
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
	const whatsappNumber = "+21694055007";
	const { t } = useTranslation("common");
	const phoneNumber = "+21694055007";

	return (
		<footer className="bg-black">
			<div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
				<div className="md:flex md:justify-between">
					<div className="mb-6 md:mb-0 md:mr-5">
						<a href="/" className="flex items-center">
							<Image
								loading="eager"
								width={100}
								height={(50 * 16) / 9}
								src="/assets/logo-footer.webp"
								className="h-auto mr-3 w-[1050px]"
								alt="Taxivip Logo"
							/>
						</a>
					</div>
					<div className="grid grid-cols-1 gap-8 sm:gap-0 sm:grid-cols-4 ">
						<div className="text-center sm:text-left">
							<span className="mb-6  text-sm md:text-base font-semibold text-gray-100 uppercase  ">
								{t("footerlinksinformation")}
							</span>
							<ul className="text-gray-100 dark:text-gray-400 text-[14px] md:text-base">
								<li className="mb-4">
									<a href="#" className="hover:underline">
										{t("footerlinksupport")}
									</a>
								</li>
								<li>
									<a href="/#faq-section" className="hover:underline">
										{t("footerlinkfaq")}
									</a>
								</li>
							</ul>
						</div>
						<div className="text-center sm:text-left">
							<span className="mb-6 text-sm md:text-base font-semibold text-gray-100 uppercase  ">
								{t("footerlinkcompany")}
							</span>
							<ul className="text-gray-100 dark:text-gray-400 text-[14px] md:text-base">
								<li className="mb-4">
									<a href="/AboutUs" className="hover:underline">
										{t("footerlinkabout")}
									</a>
								</li>
								<li>
									<a href="/Contact" className="hover:underline">
										{t("footerlinkcontact")}
									</a>
								</li>
							</ul>
						</div>
						<div className=" justify-center items-center text-center sm:text-left md:mr-7 px-2">
							<span className="mb-6 text-sm  md:text-base font-semibold text-gray-100 uppercase   ">
								{t("MEANS OF PAYMENT")}
							</span>
							<ul className="text-gray-100 dark:text-gray-400 text-xs md:text-base">
								<li className="mb-4">
									<p>{t("paymentdescribe")} </p>
								</li>
							</ul>
							<div className="flex justify-center items-center  m-auto">
								<Image
									loading="eager"
									width={40}
									height={(40 * 16) / 9}
									src="/assets/master.webp"
									alt="https://www.mastercard.us/en-us.html"
								/>
								<Image
									loading="eager"
									width={40}
									height={(40 * 16) / 9}
									src="/assets/visa.webp"
									alt="https://usa.visa.com/"
									className="mr-2"
								/>
								<Image
									loading="eager"
									width={40}
									height={(40 * 16) / 9}
									src="/assets/payc.webp"
									alt="https://www.payconiq.be/en"
								/>
							</div>
						</div>
						<div className=" text-center sm:text-left">
							<p className="mb-6 text-max-w-xs  lg:text-base font-semibold text-gray-100 uppercase  ">
								Leuvensesteenweg, Mechelen, België{" "}
							</p>
							<Link passHref legacyBehavior href={`tel:${phoneNumber}`}>
								<p className="mb-6 text-xs lg:text-base font-semibold text-gray-100 uppercase   cursor-pointer">
									+32-484510519
								</p>
							</Link>
							<p className="mb-6 text-[10px] lg:text-base font-semibold text-gray-100 uppercase   underline cursor-pointer">
								<a href="mailto:Info@taxivipmechelen.be">
									Info@taxivipmechelen.be
								</a>
							</p>
							<p className="mb-6 text-xs lg:text-base font-semibold text-gray-100 uppercase  ">
								24/24 7/7
							</p>
							<p className="mb-6 text-xs lg:text-base font-semibold text-gray-100 uppercase  ">
								Tva : 0721 401 767
							</p>
						</div>
					</div>
				</div>
				<hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-3" />
				<div className="sm:flex sm:items-center sm:justify-between text-center sm:text-left">
					<span className="text-sm text-yellow-400 sm:text-center dark:text-gray-400">
						{`© ${new Date().getFullYear()}, Made with `}
						❤️ All rights reserved.
					</span>
					<div className="flex mt-2 space-x-5 sm:justify-center sm:mt-0 w-fit  sm:mx-0 mx-auto">
						<a
							aria-label="facebook link"
							className="bg-yellow-400 rounded-full p-2"
							href="https://facebook.com/"
							target="_blank"
							nonce="facebook">
							<FaFacebookF size={20} color="white" />
						</a>
						<a
							aria-label="twitter link"
							className="bg-yellow-400 rounded-full p-2"
							href="https://twitter.com/">
							<FaTwitter size={20} color="white" />
						</a>
						<a
							aria-label="instagram link"
							className="bg-yellow-400 rounded-full p-2"
							href="https://www.instagram.com/">
							<FaInstagram size={20} color="white" />
						</a>
						<a
							aria-label="youtube link"
							className="bg-yellow-400 rounded-full p-2"
							href="https://www.youtube.com/">
							<FaYoutube size={20} color="white" />
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
