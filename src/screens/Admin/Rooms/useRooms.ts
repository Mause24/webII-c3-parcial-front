import { RoomsBodyRequest } from "@/interfaces"
import { GridColDef } from "@mui/x-data-grid"
import { useState } from "react"
import * as Yup from "yup"
export const useRooms = () => {
	const [isOpen, setIsOpen] = useState(false)

	const rows = [
		{
			roomNumber: "101",
			price: 325.45,
			type: "Suite",
		},
		{
			roomNumber: "202",
			price: 278.99,
			type: "Single",
		},
		{
			roomNumber: "303",
			price: 456.78,
			type: "Penthouse",
		},
		{
			roomNumber: "104",
			price: 199.99,
			type: "Double",
		},
		{
			roomNumber: "205",
			price: 389.5,
			type: "Suite",
		},
		{
			roomNumber: "306",
			price: 250.0,
			type: "Single",
		},
		{
			roomNumber: "107",
			price: 523.67,
			type: "Penthouse",
		},
		{
			roomNumber: "208",
			price: 169.99,
			type: "Double",
		},
		{
			roomNumber: "309",
			price: 412.34,
			type: "Suite",
		},
		{
			roomNumber: "110",
			price: 299.99,
			type: "Single",
		},
		{
			roomNumber: "211",
			price: 356.78,
			type: "Penthouse",
		},
		{
			roomNumber: "312",
			price: 189.99,
			type: "Double",
		},
		{
			roomNumber: "113",
			price: 434.56,
			type: "Suite",
		},
		{
			roomNumber: "214",
			price: 275.0,
			type: "Single",
		},
		{
			roomNumber: "315",
			price: 543.21,
			type: "Penthouse",
		},
		{
			roomNumber: "116",
			price: 159.99,
			type: "Double",
		},
		{
			roomNumber: "217",
			price: 398.76,
			type: "Suite",
		},
		{
			roomNumber: "318",
			price: 249.99,
			type: "Single",
		},
		{
			roomNumber: "119",
			price: 512.34,
			type: "Penthouse",
		},
		{
			roomNumber: "220",
			price: 179.99,
			type: "Double",
		},
	]

	const columns: GridColDef<(typeof rows)[number]>[] = [
		{
			field: "roomNumber",
			headerName: "N° de Habitacion",
			type: "number",
			width: 250,
			align: "center",
			headerAlign: "center",
		},
		{
			field: "price",
			headerName: "Precio",
			type: "number",
			width: 250,
			align: "center",
			headerAlign: "center",
		},
		{
			field: "type",
			headerName: "Tipo",
			type: "string",
			width: 250,
			align: "center",
			headerAlign: "center",
		},
	]

	const validationSchema = Yup.object().shape({
		roomNumber: Yup.number()
			.required("El número de habitación es obligatorio")
			.positive("El número de habitación debe ser un número positivo")
			.integer("El número de habitación debe ser un número entero"),
		price: Yup.number()
			.required("El precio es obligatorio")
			.min(0, "El precio no puede ser negativo")
			.positive("El precio debe ser un número positivo"),
		type: Yup.string()
			.required("El tipo de habitación es obligatorio")
			.oneOf(
				["Single", "Double", "Suite", "Penthouse"],
				"El tipo de habitación debe ser válido"
			),
	})

	const onSubmit = async (
		values: RoomsBodyRequest,
		setSubmitting: (isSubmitting: boolean) => void
	): Promise<void> => {
		try {
			console.log(values)
		} catch (error) {
			console.error(error)
		} finally {
			setSubmitting(false)
		}
	}

	return {
		isOpen,
		columns,
		rows,
		setIsOpen,
		onSubmit,
		validationSchema,
	}
}
