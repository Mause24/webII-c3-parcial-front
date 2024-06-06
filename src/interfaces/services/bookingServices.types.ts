import { User } from "@/stores"
import { RoomBodyResponse } from "./roomsServices.types"

export interface BookingBodyRequest {
	name: string
	cellphone: string
	bookingDate: Date | null
	checkInDate: Date | null
	checkOutDate: Date | null
	roomNumber: number
}
export interface BookingTableBody {
	id: number
	name: string
	cellphone: string
	bookingDate: Date
	checkInDate: Date | null
	checkOutDate: Date | null
	roomNumber: { label: string; value: number }
}

export interface BookingBodyResponse {
	id: number
	name: string
	cellphone: string
	bookingDate: string
	checkInDate: string
	checkOutDate: string
	roomNumber: number
	clientId: number
	Room: RoomBodyResponse
	User: UserBooking
}

export interface UserBooking extends Omit<User, "Profile"> {
	profileId: number
}
