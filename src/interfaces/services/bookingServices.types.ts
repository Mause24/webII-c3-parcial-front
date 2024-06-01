export interface BookingBodyRequest {
	name: string
	cellphone: string
	bookingDate: Date
	checkInDate: Date | null
	checkOutDate: Date | null
	roomNumber: number
}
