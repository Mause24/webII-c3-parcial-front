import { Button, Text } from "@/components"
import { useAuthStore } from "@/stores"
import clsx from "clsx"
import { useNavigate } from "react-router-dom"

export const Home = (): JSX.Element => {
	const { isAdmin } = useAuthStore()
	const navigate = useNavigate()

	return (
		<div
			className={clsx(
				"w-full",
				"min-h-[calc(100dvh-290px)]",
				"py-4",
				"flex",
				"flex-col",
				"gap-y-4",
				"justify-center",
				"items-center"
			)}
		>
			<Text type="h1">Panel de inicio</Text>
			<div
				className={clsx(
					"flex",
					"justify-center",
					"items-center",
					"gap-x-4"
				)}
			>
				<Button
					variant="transparent"
					onClick={() => navigate("/home/bookings")}
				>
					<div
						className={clsx(
							"flex",
							"justify-center",
							"items-center",
							"transition-all",
							"duration-[200ms]",
							"ease-linear",
							"border-2",
							"border-primary-normal",
							"w-60",
							"h-60",
							"rounded-2xl",
							"hover:scale-110",
							"hover:bg-primary-normal",
							"[&:hover>*]:text-white"
						)}
					>
						<Text
							props={{
								className: clsx(
									"transition-all",
									"duration-[200ms]",
									"ease-linear"
								),
							}}
							type="h3"
						>
							Gestionar Reservas
						</Text>
					</div>
				</Button>
				{isAdmin() && (
					<Button
						variant="transparent"
						onClick={() => navigate("/admin/rooms")}
					>
						<div
							className={clsx(
								"flex",
								"justify-center",
								"items-center",
								"transition-all",
								"duration-[200ms]",
								"ease-linear",
								"border-2",
								"border-primary-normal",
								"w-60",
								"h-60",
								"rounded-2xl",
								"hover:scale-110",
								"hover:bg-primary-normal",
								"[&:hover>*]:text-white"
							)}
						>
							<Text
								props={{
									className: clsx(
										"transition-all",
										"duration-[200ms]",
										"ease-linear"
									),
								}}
								type="h3"
							>
								Gestionar Habitaciones
							</Text>
						</div>
					</Button>
				)}
			</div>
		</div>
	)
}
