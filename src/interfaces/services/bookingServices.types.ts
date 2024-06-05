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
	bookingDate: string // ISO 8601 date string
	checkInDate: string // ISO 8601 date string
	checkOutDate: string // ISO 8601 date string
	roomNumber: number
	clientId: number
	updatedAt: string // ISO 8601 date-time string
	createdAt: string // ISO 8601 date-time string
	Room: RoomBodyResponse
	User: UserBooking
}

export interface UserBooking extends Omit<User, "Profile"> {
	profileId: number
}
