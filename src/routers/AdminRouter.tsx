import { Rooms } from "@/screens"
import { Route, Routes } from "react-router-dom"

export const AdminRouter = (): JSX.Element => {
	return (
		<Routes>
			<Route path="rooms" element={<Rooms />} />
		</Routes>
	)
}
