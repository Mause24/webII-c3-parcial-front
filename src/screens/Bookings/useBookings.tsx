import { Button } from "@/components"
import { BookingBodyRequest, BookingTableBody } from "@/interfaces"
import {
	createBooking,
	deleteBookingById,
	getAllUserBookings,
	getAllUserRooms,
	updateBookingById,
} from "@/services"
import { AlertProps, Tooltip } from "@mui/material"
import {
	GridColDef,
	GridRenderCellParams,
	GridTreeNodeWithRender,
	ValueOptions,
} from "@mui/x-data-grid"
import clsx from "clsx"
import { FormikHelpers, useFormik } from "formik"
import { useCallback, useEffect, useState } from "react"
import * as Yup from "yup"

export const useBookings = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [snackbar, setSnackbar] = useState<Pick<
		AlertProps,
		"children" | "severity"
	> | null>(null)
	const [rowId, setRowId] = useState<number | string | undefined>()
	const [data, setData] = useState<BookingTableBody[]>([])
	const [rooms, setRooms] = useState<{ label: string; value: number }[]>([])
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
	const formik = useFormik({
		initialValues: {
			name: "",
			cellphone: "",
			bookingDate: null,
			checkInDate: null,
			checkOutDate: null,
			roomNumber: 0,
		},
		validationSchema: validationSchema,
		onSubmit: (values: BookingBodyRequest, formControl) => {
			onSubmit(values, formControl)
		},
	})

	const onEdit =
		(
			params: GridRenderCellParams<
				BookingTableBody,
				any,
				any,
				GridTreeNodeWithRender
			>
		) =>
		async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
			try {
				e.stopPropagation()

				const bodyRequest = {
					...params.row,
					roomNumber: Number(params.row.roomNumber),
					id: undefined,
				}

				const response = await updateBookingById(
					Number(params.row.id),
					bodyRequest
				)

				if (response) {
					setSnackbar({
						children: "Se ha actualizado correctamente!",
						severity: "success",
					})
					setRowId(undefined)
				}
			} catch (error) {
				console.error(error)
				onCancelEdit()
			}
		}
	const onCancelEdit = () => {
		setRowId(undefined)
		setData(state => [...state])
	}
	const onDeleteRow =
		(id: number) =>
		async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
			try {
				e.stopPropagation()
				const response = await deleteBookingById(id)
				if (response) {
					setData(state => state.filter(row => row.id !== id))
					setSnackbar({
						children: "La fila se ha eliminado correctamente!",
						severity: "success",
					})
				}
			} catch (error) {
				setSnackbar({
					children: "Error al eliminar la fila!",
					severity: "error",
				})
				setData(state => [...state])
				console.error(error)
			}
		}

	const columns: GridColDef<BookingTableBody>[] = [
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
			type: "singleSelect",
			valueOptions: rooms,
			getOptionLabel: value => {
				if (typeof value === "object") {
					return value?.label
				}
				return value
			},
			getOptionValue: value => {
				if (typeof value === "object") {
					return value.value
				}
				return value
			},
			valueGetter: (value: ValueOptions) => {
				if (typeof value === "object") {
					return value.value
				}
				return value
			},
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
						BookingTableBody,
						any,
						any,
						GridTreeNodeWithRender
					>
				) => {
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
							<Tooltip title={"Editar Fila"}>
								<Button
									className="!p-0 !px-2 !h-auto !rounded-full"
									onClick={onEdit(params)}
									label="E"
									disabled={rowId !== params.id}
								/>
							</Tooltip>
							<Tooltip title={"Cancelar Edicion"}>
								<Button
									className="!p-0 !px-2 !h-auto !rounded-full"
									onClick={onCancelEdit}
									label="C"
									disabled={rowId !== params.id}
								/>
							</Tooltip>
							<Tooltip title={"Eliminar Fila"}>
								<Button
									className="!p-0 !px-2 !h-auto !rounded-full"
									onClick={onDeleteRow(params.row.id)}
									label="E"
								/>
							</Tooltip>
						</div>
					)
				},
				[rowId]
			),
		},
	]

	const handleCloseModal = () => {
		setIsOpen(state => !state)
		formik.resetForm()
	}

	const handleCloseSnackbar = () => setSnackbar(null)

	const onSubmit = async (
		values: BookingBodyRequest,
		formControl: FormikHelpers<BookingBodyRequest>
	): Promise<void> => {
		try {
			const response = await createBooking(values)
			if (response) {
				setData(state => [
					...state,
					{
						id: response.id,
						name: response.name,
						bookingDate: new Date(response.bookingDate),
						cellphone: response.cellphone,
						checkInDate: response.checkInDate
							? new Date(response.checkInDate)
							: null,
						checkOutDate: response.checkOutDate
							? new Date(response.checkOutDate)
							: null,
						roomNumber: {
							label: String(response.Room.roomNumber),
							value: response.Room.code,
						},
					},
				])
				setSnackbar({
					children: "Se creo correctamente la fila!",
					severity: "success",
				})
				setIsOpen(false)
			}
		} catch (error) {
			handleProcessRowError(error as Error)
		} finally {
			formControl.setSubmitting(false)
			formControl.resetForm()
		}
	}

	const getData = async () => {
		try {
			const responseData = await getAllUserBookings()
			setData(
				responseData.map(item => ({
					id: item.id,
					name: item.name,
					bookingDate: new Date(item.bookingDate),
					cellphone: item.cellphone,
					checkInDate: item.checkInDate
						? new Date(item.checkInDate)
						: null,
					checkOutDate: item.checkOutDate
						? new Date(item.checkOutDate)
						: null,
					roomNumber: {
						label: String(item.Room.roomNumber),
						value: item.Room.code,
					},
				}))
			)
		} catch (error) {
			handleProcessRowError(error as Error)
		}
	}

	const getRooms = async () => {
		try {
			const responseData = await getAllUserRooms()
			setRooms(
				responseData.map(item => ({
					label: String(item.roomNumber),
					value: item.code,
				}))
			)
		} catch (error) {
			handleProcessRowError(error as Error)
		}
	}

	const handleProcessRowError = (error: Error) => {
		setSnackbar({ children: error.message, severity: "error" })
	}

	useEffect(() => {
		getRooms()
		getData()
	}, [])

	return {
		isOpen,
		columns,
		data,
		setIsOpen,
		snackbar,
		handleCloseSnackbar,
		handleCloseModal,
		formik,
		onCancelEdit,
		rooms,
		setRowId,
	}
}
