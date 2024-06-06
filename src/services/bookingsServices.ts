import {
	BookingBodyRequest,
	BookingBodyResponse,
	ResponseBody,
} from "@/interfaces"
import { API } from "@/providers"

export const getAllBookings = async () => {
	const response =
		await API.get<ResponseBody<BookingBodyResponse[]>>("/booking")

	if (response.status === 200 && response.data.data) {
		return response.data.data
	}

	throw new Error(response.data.message)
}

export const getAllUserBookings = async () => {
	const response =
		await API.get<ResponseBody<BookingBodyResponse[]>>("/booking/user")

	if (response.status === 200 && response.data.data) {
		return response.data.data
	}

	throw new Error(response.data.message)
}

export const createBooking = async (body: BookingBodyRequest) => {
	const response = await API.post<ResponseBody<BookingBodyResponse>>(
		"/booking",
		body
	)

	if (response.status === 201 && response.data.data) {
		return response.data.data
	}

	throw new Error(response.data.message)
}

export const updateBookingById = async (
	bookingId: number,
	body: Partial<BookingBodyRequest>
) => {
	const response = await API.patch<ResponseBody<BookingBodyResponse>>(
		`/booking/${bookingId}`,
		body
	)

	if (response.status === 200 && response.data.data) {
		return response.data.data
	}

	throw new Error(response.data.message)
}
export const deleteBookingById = async (bookingId: number) => {
	const response = await API.delete<ResponseBody<undefined>>(
		`/booking/${bookingId}`
	)

	if (response.status === 200) {
		return true
	}

	throw new Error(response.data.message)
}
