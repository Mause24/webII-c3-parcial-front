import { Bookings, Home } from "@/screens"
import { Route, Routes } from "react-router-dom"

export const PrivateRouter = (): JSX.Element => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="bookings" element={<Bookings />} />
		</Routes>
	)
}
