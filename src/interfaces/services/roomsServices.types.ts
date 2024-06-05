export interface RoomsBodyRequest {
	roomNumber: number
	price: number
	type: string
}

export interface RoomBodyResponse {
	code: number
	roomNumber: number
	price: number
	type: string
}
