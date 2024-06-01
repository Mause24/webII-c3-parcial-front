import { Button } from "@/components"
import { BookingBodyRequest } from "@/interfaces"
import { AlertProps } from "@mui/material"
import {
	GridColDef,
	GridRenderCellParams,
	GridTreeNodeWithRender,
} from "@mui/x-data-grid"
import clsx from "clsx"
import { useCallback, useRef, useState } from "react"
import * as Yup from "yup"

export const useBookings = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [snackbar, setSnackbar] = useState<Pick<
		AlertProps,
		"children" | "severity"
	> | null>(null)
	const [rowId, setRowId] = useState<number | string | undefined>()
	const isCurrentRowEdited = useRef<boolean>(false)

	const [data, setData] = useState<BookingBodyRequest[]>([
		{
			name: "Alice Johnson",
			cellphone: "+57 300 7172165",
			bookingDate: new Date("2023-05-01"),
			checkInDate: new Date("2023-06-01"),
			checkOutDate: new Date("2023-06-02"),
			roomNumber: 101,
		},
		{
			name: "Bob Smith",
			cellphone: "555-0102",
			bookingDate: new Date("2023-05-02"),
			checkInDate: new Date("2023-06-02"),
			checkOutDate: new Date("2023-06-03"),
			roomNumber: 102,
		},
		{
			name: "Charlie Brown",
			cellphone: "555-0103",
			bookingDate: new Date("2023-05-03"),
			checkInDate: null,
			checkOutDate: null,
			roomNumber: 103,
		},
		{
			name: "Diana Prince",
			cellphone: "555-0104",
			bookingDate: new Date("2023-05-04"),
			checkInDate: new Date("2023-06-04"),
			checkOutDate: null,
			roomNumber: 104,
		},
		{
			name: "Edward Elric",
			cellphone: "555-0105",
			bookingDate: new Date("2023-05-05"),
			checkInDate: new Date("2023-06-05"),
			checkOutDate: new Date("2023-06-06"),
			roomNumber: 105,
		},
		{
			name: "Fiona Gallagher",
			cellphone: "555-0106",
			bookingDate: new Date("2023-05-06"),
			checkInDate: null,
			checkOutDate: null,
			roomNumber: 106,
		},
		{
			name: "George Harrison",
			cellphone: "555-0107",
			bookingDate: new Date("2023-05-07"),
			checkInDate: new Date("2023-06-07"),
			checkOutDate: null,
			roomNumber: 107,
		},
		{
			name: "Hannah Montana",
			cellphone: "555-0108",
			bookingDate: new Date("2023-05-08"),
			checkInDate: new Date("2023-06-08"),
			checkOutDate: new Date("2023-06-09"),
			roomNumber: 108,
		},
		{
			name: "Isaac Newton",
			cellphone: "555-0109",
			bookingDate: new Date("2023-05-09"),
			checkInDate: null,
			checkOutDate: null,
			roomNumber: 109,
		},
		{
			name: "Jessica Jones",
			cellphone: "555-0110",
			bookingDate: new Date("2023-05-10"),
			checkInDate: new Date("2023-06-10"),
			checkOutDate: new Date("2023-06-11"),
			roomNumber: 110,
		},
		{
			name: "Kevin McCallister",
			cellphone: "555-0111",
			bookingDate: new Date("2023-05-11"),
			checkInDate: new Date("2023-06-11"),
			checkOutDate: new Date("2023-06-12"),
			roomNumber: 111,
		},
		{
			name: "Lara Croft",
			cellphone: "555-0112",
			bookingDate: new Date("2023-05-12"),
			checkInDate: null,
			checkOutDate: null,
			roomNumber: 112,
		},
		{
			name: "Michael Scott",
			cellphone: "555-0113",
			bookingDate: new Date("2023-05-13"),
			checkInDate: new Date("2023-06-13"),
			checkOutDate: null,
			roomNumber: 113,
		},
		{
			name: "Nancy Drew",
			cellphone: "555-0114",
			bookingDate: new Date("2023-05-14"),
			checkInDate: new Date("2023-06-14"),
			checkOutDate: new Date("2023-06-15"),
			roomNumber: 114,
		},
		{
			name: "Oliver Queen",
			cellphone: "555-0115",
			bookingDate: new Date("2023-05-15"),
			checkInDate: new Date("2023-06-15"),
			checkOutDate: new Date("2023-06-16"),
			roomNumber: 115,
		},
		{
			name: "Peter Parker",
			cellphone: "555-0116",
			bookingDate: new Date("2023-05-16"),
			checkInDate: new Date("2023-06-16"),
			checkOutDate: null,
			roomNumber: 116,
		},
		{
			name: "Quentin Tarantino",
			cellphone: "555-0117",
			bookingDate: new Date("2023-05-17"),
			checkInDate: new Date("2023-06-17"),
			checkOutDate: new Date("2023-06-18"),
			roomNumber: 117,
		},
		{
			name: "Rachel Green",
			cellphone: "555-0118",
			bookingDate: new Date("2023-05-18"),
			checkInDate: new Date("2023-06-18"),
			checkOutDate: new Date("2023-06-19"),
			roomNumber: 118,
		},
		{
			name: "Sheldon Cooper",
			cellphone: "555-0119",
			bookingDate: new Date("2023-05-19"),
			checkInDate: new Date("2023-06-19"),
			checkOutDate: new Date("2023-06-20"),
			roomNumber: 119,
		},
		{
			name: "Tony Stark",
			cellphone: "555-0120",
			bookingDate: new Date("2023-05-20"),
			checkInDate: new Date("2023-06-20"),
			checkOutDate: null,
			roomNumber: 120,
		},
	])

	const columns: GridColDef<BookingBodyRequest>[] = [
		{
			field: "name",
			headerName: "Nombre",
			type: "string",
			width: 150,
			editable: true,
		},
		{
			field: "cellphone",
			headerName: "Telefono",
			type: "string",
			width: 135,
			editable: true,
		},
		{
			field: "bookingDate",
			headerName: "Fecha de reserva",
			description:
				"Esta columna tiene la fecha en la que se hizo la reserva.",
			type: "date",
			align: "center",
			headerAlign: "center",
			width: 150,
			editable: true,
		},
		{
			field: "checkInDate",
			headerName: "Fecha de entrada",
			description:
				"Esta columna tiene la fecha en la que se hizo el ingreso de la reserva.",
			type: "date",
			align: "center",
			headerAlign: "center",
			width: 150,
			editable: true,
		},
		{
			field: "checkOutDate",
			headerName: "Fecha de salida",
			description:
				"Esta columna tiene la fecha en la que se hizo la salida de la reserva.",
			type: "date",
			align: "center",
			headerAlign: "center",
			width: 150,
			editable: true,
		},
		{
			field: "roomNumber",
			headerName: "N° de Habitacion",
			description: "This column has a value getter and is not sortable.",
			type: "number",
			align: "center",
			headerAlign: "center",
			width: 150,
			editable: true,
		},
		{
			field: "action",
			headerName: "Action",
			type: "actions",
			sortable: false,
			renderCell: useCallback(
				(
					params: GridRenderCellParams<
						BookingBodyRequest,
						any,
						any,
						GridTreeNodeWithRender
					>
				) => {
					const onClick = (
						e: React.MouseEvent<HTMLButtonElement, MouseEvent>
					) => {
						e.stopPropagation() // don't select this row after clicking
						return alert(JSON.stringify(params.row, null, 4))
					}

					return (
						<div
							className={clsx(
								"w-full",
								"h-full",
								"flex",
								"justify-center",
								"items-center",
								"gap-x-2"
							)}
						>
							<Button
								className="!p-0 !px-2 !h-auto !rounded-full"
								onClick={onClick}
								title="E"
								disabled={rowId !== params.id}
							/>
							<Button
								className="!p-0 !px-2 !h-auto !rounded-full"
								onClick={onClick}
								title="C"
								disabled={rowId !== params.id}
							/>
						</div>
					)
				},
				[rowId]
			),
		},
	]

	const handleCloseSnackbar = () => setSnackbar(null)

	const validationSchema = Yup.object().shape({
		name: Yup.string()
			.required("El nombre es obligatorio")
			.min(2, "El nombre debe tener al menos 2 caracteres")
			.max(50, "El nombre no debe exceder los 50 caracteres"),
		cellphone: Yup.string()
			.required("El teléfono es obligatorio")
			.matches(/^[0-9]+$/, "El teléfono debe contener solo números")
			.min(7, "El teléfono debe tener al menos 7 dígitos")
			.max(15, "El teléfono no debe exceder los 15 dígitos"),
		bookingDate: Yup.date()
			.required("La fecha de reserva es obligatoria")
			.default(() => new Date()),
	})

	const onEdit = async () => {
		try {
			console.log("Hola")
		} catch (error) {
			console.error(error)
		}
	}

	const onSubmit = async (
		values: BookingBodyRequest,
		setSubmitting: (isSubmitting: boolean) => void
	): Promise<void> => {
		try {
			console.log(values)
		} catch (error) {
			handleProcessRowUpdateError(error as Error)
		} finally {
			setSubmitting(false)
		}
	}

	const handleProcessRowUpdateError = (error: Error) => {
		setSnackbar({ children: error.message, severity: "error" })
	}

	return {
		isOpen,
		columns,
		data,
		setIsOpen,
		onSubmit,
		snackbar,
		handleCloseSnackbar,
		isCurrentRowEdited,
		setRowId,
		validationSchema,
	}
}
