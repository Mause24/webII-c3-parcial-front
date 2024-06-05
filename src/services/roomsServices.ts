import { ResponseBody, RoomBodyResponse, RoomsBodyRequest } from "@/interfaces"
import { API } from "@/providers"

export const getAllUserRooms = async () => {
	const response = await API.get<ResponseBody<RoomBodyResponse[]>>("/rooms")

	if (response.status === 200 && response.data.data) {
		return response.data.data
	}

	throw new Error(response.data.message)
}

export const createRoom = async (body: RoomsBodyRequest) => {
	const response = await API.post<ResponseBody<RoomBodyResponse>>(
		"/rooms",
		body
	)

	if (response.status === 201 && response.data.data) {
		return response.data.data
	}

	throw new Error(response.data.message)
}

export const updateRoomById = async (
	roomId: number,
	body: Partial<RoomsBodyRequest>
) => {
	const response = await API.patch<ResponseBody<RoomBodyResponse>>(
		`/rooms/${roomId}`,
		body
	)

	if (response.status === 200 && response.data.data) {
		return response.data.data
	}

	throw new Error(response.data.message)
}

export const deleteRoomById = async (roomId: number) => {
	const response = await API.delete<ResponseBody<undefined>>(
		`/rooms/${roomId}`
	)

	if (response.status === 200) {
		return true
	}

	throw new Error(response.data.message)
}
