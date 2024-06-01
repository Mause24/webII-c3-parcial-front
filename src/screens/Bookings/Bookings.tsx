import { Button, CustomModal, Icon, Input, Text } from "@/components"
import { ICONS } from "@/Constants"
import { Alert, Snackbar } from "@mui/material"
import Box from "@mui/material/Box"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import clsx from "clsx"
import { Formik } from "formik"
import { isEqual } from "lodash"
import { useBookings } from "./useBookings"

export const Bookings = () => {
	const {
		columns,
		isOpen,
		data,
		setIsOpen,
		onSubmit,
		validationSchema,
		handleCloseSnackbar,
		snackbar,
		setRowId,
		isCurrentRowEdited,
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
				onClose={() => setIsOpen(state => !state)}
				visible={isOpen}
				onlyChild={false}
			>
				<Formik
					initialValues={{
						name: "",
						cellphone: "",
						bookingDate: new Date(),
						checkInDate: null,
						checkOutDate: null,
						roomNumber: 0,
					}}
					validationSchema={validationSchema}
					onSubmit={(values, { setSubmitting }) => {
						onSubmit(values, setSubmitting)
					}}
				>
					{({
						values,
						errors,
						touched,
						handleChange,
						handleBlur,
						handleSubmit,
						isSubmitting,
						setFieldValue,
					}) => (
						<form
							onSubmit={handleSubmit}
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
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.name}
								error={touched.name ? errors.name : undefined}
								required
							/>

							<Input
								type="tel"
								label="Telefono"
								id="cellphone"
								name="cellphone"
								customType="googleInput"
								autoComplete="tel"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.cellphone}
								className="outl"
								error={
									touched.cellphone
										? errors.cellphone
										: undefined
								}
								required
							/>

							<Input
								type="date"
								label="Fecha de reserva"
								id="bookingDate"
								name="bookingDate"
								autoComplete="bookingDate"
								customType="googleInput"
								onChange={evt =>
									setFieldValue(
										"bookingDate",
										new Date(evt.target.value)
									)
								}
								onBlur={handleBlur}
								value={values.bookingDate
									.toISOString()
									.slice(0, 10)}
								error={
									touched.bookingDate
										? (errors.bookingDate as string)
										: undefined
								}
								required
							/>

							<Input
								type="number"
								label="N° de habitacion"
								id="roomNumber"
								name="roomNumber"
								customType="googleInput"
								autoComplete="cc-number"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.roomNumber}
								className="outl"
								error={
									touched.roomNumber
										? errors.roomNumber
										: undefined
								}
								required
							/>

							<Button
								type="submit"
								disabled={isSubmitting}
								title="Crear reserva"
							/>
						</form>
					)}
				</Formik>
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
					getRowId={row => `r-${row.name}-${row.roomNumber}`}
					checkboxSelection
					disableRowSelectionOnClick
					density="standard"
					disableDensitySelector
					processRowUpdate={(newRow, oldRow) => {
						isCurrentRowEdited.current = !isEqual(newRow, oldRow)
						return newRow
					}}
					onRowEditStop={params => {
						if (isCurrentRowEdited.current) {
							setRowId(params.id)
						}
					}}
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
