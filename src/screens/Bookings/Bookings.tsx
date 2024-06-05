import { Button, CustomModal, Icon, Input, Text } from "@/components"
import { ICONS } from "@/Constants"
import {
	Alert,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Snackbar,
} from "@mui/material"
import Box from "@mui/material/Box"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import clsx from "clsx"
import { isEmpty } from "lodash"
import { useBookings } from "./useBookings"

export const Bookings = () => {
	const {
		columns,
		isOpen,
		data,
		setIsOpen,
		handleCloseSnackbar,
		snackbar,
		rooms,
		setRowId,
		formik,
		handleCloseModal,
	} = useBookings()

	return (
		<div
			className={clsx(
				"w-full",
				"min-h-[calc(100dvh-290px)]",
				"py-4",
				"flex",
				"flex-col",
				"gap-y-4",
				"justify-center",
				"items-start"
			)}
		>
			<CustomModal
				onClose={handleCloseModal}
				visible={isOpen}
				onlyChild={false}
			>
				<form
					onSubmit={formik.handleSubmit}
					className={clsx(
						"flex",
						"flex-col",
						"gap-y-4",
						"py-4",
						"w-full",
						"rounded-md"
					)}
				>
					<Text
						type="h2"
						props={{
							className: clsx(
								"text-2xl",
								"text-primary-normal",
								"text-center"
							),
						}}
					>
						Hacer una reserva
					</Text>

					<Input
						type="text"
						label="Nombre de la reserva"
						id="name"
						name="name"
						autoComplete="name"
						customType="googleInput"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.name}
						error={
							formik.touched.name ? formik.errors.name : undefined
						}
						required
					/>

					<Input
						type="tel"
						label="Telefono"
						id="cellphone"
						name="cellphone"
						customType="googleInput"
						autoComplete="tel"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.cellphone}
						error={
							formik.touched.cellphone
								? formik.errors.cellphone
								: undefined
						}
						required
					/>

					<Input
						type="date"
						label="Fecha de reserva"
						id="bookingDate"
						name="bookingDate"
						autoComplete="shipping bday-day webauthn"
						customType="googleInput"
						min={new Date().toISOString().split("T")[0]}
						onChange={evt =>
							formik.setFieldValue(
								"bookingDate",
								new Date(evt.target.value)
							)
						}
						onBlur={formik.handleBlur}
						value={
							formik.values.bookingDate
								? formik.values.bookingDate
										.toISOString()
										.slice(0, 10)
								: undefined
						}
						error={
							formik.touched.bookingDate
								? (formik.errors.bookingDate as string)
								: undefined
						}
						required
					/>

					<FormControl fullWidth>
						<InputLabel id="roomNumber">
							N° de habitacion
						</InputLabel>
						<Select
							id="roomNumber"
							name="roomNumber"
							labelId="roomNumber"
							label="N° de habitacion"
							onChange={evt =>
								formik.setFieldValue(
									"roomNumber",
									Number(evt.target.value)
								)
							}
							onBlur={formik.handleBlur}
							error={
								formik.touched.roomNumber
									? Boolean(formik.errors.roomNumber)
									: undefined
							}
							required
						>
							{rooms?.length > 0 &&
								rooms.map(item => (
									<MenuItem
										key={item.value}
										value={item.value}
									>
										{item.label}
									</MenuItem>
								))}
						</Select>
					</FormControl>

					<Button
						type="submit"
						disabled={
							formik.isSubmitting || !isEmpty(formik.errors)
						}
						label="Crear reserva"
					/>
				</form>
			</CustomModal>

			<Button
				onClick={() => setIsOpen(true)}
				type="button"
				className="flex items-center gap-x-2"
			>
				<Icon
					src={ICONS.closeIcon}
					fillPath
					className={clsx("!w-4", "!h-4", "text-white", "rotate-45")}
				/>
				<Text type="span" color="white" weight="bold" size="xl">
					Crear
				</Text>
			</Button>
			<Box sx={{ flex: 1, width: "100%" }}>
				<DataGrid
					editMode="row"
					rows={data}
					columns={columns}
					initialState={{
						pagination: {
							paginationModel: {
								pageSize: 10,
							},
						},
					}}
					disableRowSelectionOnClick
					density="standard"
					disableDensitySelector
					pageSizeOptions={[10, 25, 50]}
					onRowEditStart={() => setRowId(undefined)}
					onRowEditStop={params => setRowId(params.id)}
					slots={{ toolbar: GridToolbar }}
				/>
			</Box>
			{!!snackbar && (
				<Snackbar
					open
					anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
					onClose={handleCloseSnackbar}
					autoHideDuration={6000}
				>
					<Alert {...snackbar} onClose={handleCloseSnackbar} />
				</Snackbar>
			)}
		</div>
	)
}
