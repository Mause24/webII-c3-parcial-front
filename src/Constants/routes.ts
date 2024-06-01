export const PUBLIC_ROUTES = [
	{
		name: "Iniciar Sesion",
		route: "/login",
	},
	{
		name: "Registro",
		route: "/register",
	},
]

export const PRIVATE_ROUTES = [
	{
		name: "Home",
		route: "/home",
	},
	{
		name: "Reservas",
		route: "/home/bookings",
	},
]

export const ADMIN_ROUTES = [
	{
		name: "Habitaciones",
		route: "/admin/rooms",
	},
].concat(PRIVATE_ROUTES)
