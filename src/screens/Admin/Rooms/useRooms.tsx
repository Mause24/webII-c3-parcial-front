import { Button } from "@/components"
import { RoomBodyResponse, RoomsBodyRequest } from "@/interfaces"
import {
	createRoom,
	deleteRoomById,
	getAllUserRooms,
	updateRoomById,
} from "@/services"
import { AlertProps, Tooltip } from "@mui/material"
import {
	GridColDef,
	GridRenderCellParams,
	GridTreeNodeWithRender,
} from "@mui/x-data-grid"
import clsx from "clsx"
import { FormikHelpers, useFormik } from "formik"
import { useCallback, useEffect, useState } from "react"
import * as Yup from "yup"

export const useRooms = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [rows, setRows] = useState<RoomBodyResponse[]>([])
	const validationSchema = Yup.object().shape({
		roomNumber: Yup.number()
			.required("El número de habitación es obligatorio")
			.positive("El número de habitación debe ser un número positivo")
			.integer("El número de habitación debe ser un número entero"),
		price: Yup.number()
			.required("El precio es obligatorio")
			.min(0, "El precio no puede ser negativo")
			.positive("El precio debe ser un número positivo"),
		type: Yup.string().required("El tipo de habitación es obligatorio"),
	})
	const formik = useFormik({
		initialValues: {
			roomNumber: 0,
			price: 0,
			type: "",
		},
		validationSchema: validationSchema,
		onSubmit: (
			values: RoomsBodyRequest,
			formControl: FormikHelpers<RoomsBodyRequest>
		) => {
			onSubmit(values, formControl)
		},
	})
	const [snackbar, setSnackbar] = useState<Pick<
		AlertProps,
		"children" | "severity"
	> | null>(null)
	const [rowId, setRowId] = useState<number | string | undefined>()

	const columns: GridColDef<RoomBodyResponse>[] = [
		{
			field: "roomNumber",
			headerName: "N° de Habitacion",
			type: "number",
			width: 250,
			align: "center",
			headerAlign: "center",
			editable: true,
		},
		{
			field: "price",
			headerName: "Precio",
			type: "number",
			width: 250,
			align: "center",
			headerAlign: "center",
			editable: true,
		},
		{
			field: "type",
			headerName: "Tipo",
			type: "string",
			width: 250,
			align: "center",
			headerAlign: "center",
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
						RoomBodyResponse,
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
									onClick={onDeleteRow(params.row.code)}
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

	const onEdit =
		(
			params: GridRenderCellParams<
				RoomBodyResponse,
				any,
				any,
				GridTreeNodeWithRender
			>
		) =>
		async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
			try {
				e.stopPropagation()

				const bodyRequest = {
					code: undefined,
					price: params.row.price,
					roomNumber: params.row.roomNumber,
					type: params.row.type,
				}

				const response = await updateRoomById(
					Number(params.row.code),
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
		setRows(state => [...state])
	}

	const onDeleteRow =
		(id: number) =>
		async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
			try {
				e.stopPropagation()
				const response = await deleteRoomById(id)
				if (response) {
					setRows(state => state.filter(row => row.code !== id))
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
				setRows(state => [...state])
				console.error(error)
			}
		}

	const onSubmit = async (
		values: RoomsBodyRequest,
		formControl: FormikHelpers<RoomsBodyRequest>
	): Promise<void> => {
		try {
			const response = await createRoom(values)
			if (response) {
				setRows(state => [...state, response])
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
			const responseData = await getAllUserRooms()
			setRows(responseData)
		} catch (error) {
			handleProcessRowError(error as Error)
		}
	}

	const handleProcessRowError = (error: Error) => {
		setSnackbar({ children: error.message, severity: "error" })
	}

	useEffect(() => {
		getData()
	}, [])

	const handleCloseSnackbar = () => setSnackbar(null)

	return {
		isOpen,
		columns,
		rows,
		setIsOpen,
		snackbar,
		handleCloseSnackbar,
		setRowId,
		formik,
		handleCloseModal,
	}
}
