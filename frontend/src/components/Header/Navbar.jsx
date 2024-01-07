import { useState, useCallback, Fragment } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import LanguageDropdown from "../switchlanguage/LanguageDropdown";

const links = [
	{ href: "/", label: "startpagina" },
	{ href: "/AboutUs", label: "over" },
	{ href: "/Services/Services", label: "diensten" },
	{ href: "/Booking", label: "reserveren" },
	{ href: "/Region", label: "regios" },
];

const NavbarLink = ({ href, label, toggleMenu }) => {
	const router = useRouter();
	const { t } = useTranslation("common");

	return (
		<Link passHref legacyBehavior href={href}>
			<span
				className={`${
					router.pathname === href
						? "text-primary underline-offset-4 underline cursor-pointer"
						: "text-black cursor-pointer"
				} w-[80px] text-center`}
				onClick={toggleMenu}>
				{t(label)}
			</span>
		</Link>
	);
};

const Navbar = () => {
	const { t } = useTranslation("common");
	const [showMenu, setShowMenu] = useState(false);
	const toggleMenu = useCallback(() => setShowMenu(!showMenu), [showMenu]);

	return (
		<Fragment>
			<nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200 lg:h-[90px]">
				<div className="max-w-screen-xl flex items-center justify-between mx-auto p-2 h-full">
					<Link passHref legacyBehavior href="/">
						<span className="flex items-center ">
							<Image
								loading="eager"
								src="/assets/logo-nav.webp"
								alt="taxi-vip"
								width={200}
								height={(180 * 16) / 9}
							/>
						</span>
					</Link>
					<div className="flex md:order-2 gap-4">
						<button
							name={t("reserveren")}
							type="button"
							className="bg-primary text-dark rounded-full focus:ring-4 focus:outline-none font-medium text-xs px-3 py-2 text-center ml-5 md:mr-0 md:text-[16px] w-[110px]">
							<Link passHref legacyBehavior href="/#book-section">
								{t("reserveren")}
							</Link>
						</button>
						<button
							name={t("contact")}
							type="button"
							className="bg-dark text-primary rounded-full focus:ring-4 focus:outline-none font-medium text-xs px-3 py-2 text-center mr-0 md:mr-0 md:text-[16px] w-[100px]">
							<Link passHref legacyBehavior href="/Contact">
								{t("contact")}
							</Link>
						</button>
						<div className="hidden md:block w-[110px]">
							<LanguageDropdown />
						</div>
						<button
							name="menu"
							data-collapse-toggle="navbar-sticky"
							type="button"
							className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
							aria-controls="navbar-sticky"
							aria-expanded="false"
							aria-label="submit"
							onClick={toggleMenu}>
							<AiOutlineMenu size={24} />
						</button>
					</div>
					<div className="hidden md:block" id="navbar-sticky">
						<div className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white w-[465px]">
							{links.map((link) => (
								<NavbarLink key={link.href} {...link} />
							))}
						</div>
					</div>
				</div>
			</nav>
			<div
				className={
					showMenu
						? "fixed top-[52px] left-0 w-full z-50 bg-white border-t shadow-lg flex flex-col justify-between items-start"
						: "hidden"
				}>
				<div className="flex flex-col space-y-4 p-4 w-full">
					{links.map((link) => (
						<div
							key={link.href}
							className="text-left text-lg text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light">
							<NavbarLink {...link} toggleMenu={toggleMenu} />
						</div>
					))}
					<div className="w-[80px] mb-4 ml-1">
						<LanguageDropdown />
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default Navbar;
