import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";

const Service = ({
	imageUrl,
	title,
	description,
	seeMoreUrl,
	services,
	button,
	serviceId,
	btnStatic,
}) => {
	const { t } = useTranslation("common");

	return (
		<>
			<div className="text-center text-gray-500 flex flex-col justify-between items-center gap-6 cursor-pointer">
				<Image
					loading="eager"
					src={imageUrl}
					alt={title}
					width={350}
					height={(400 * 16) / 9}
				/>
				<div className="flex flex-col justify-start items-center  h-17">
					<div className="mb-1 text-3xl font-bold tracking-tight text-gray-900  ">
						<p>{title}</p>
					</div>
					{services && <p className="w-80 h-20 ">{description}</p>}
				</div>
				{button && (
					<Link passHref legacyBehavior href={`/Services/${serviceId}`}>
						<div
							aria-label={description}
							className="justify-center items-end mt-1 py-2 px-8 text-xl font-medium text-center text-white rounded-lg bg-dark">
							{t("serviceButton")}
						</div>
					</Link>
				)}
				{btnStatic && (
					<div className="justify-center items-end mt-1 py-2 px-8 text-xl font-medium text-center text-white rounded-lg bg-dark">
						{t("serviceButton")}
					</div>
				)}
			</div>
		</>
	);
};

export default Service;
