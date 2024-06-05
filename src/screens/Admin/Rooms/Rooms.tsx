import { Button, CustomModal, Icon, Input, Text } from "@/components"
import { ICONS } from "@/Constants"
import { Alert, Box, Snackbar } from "@mui/material"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import clsx from "clsx"
import { isEmpty } from "lodash"
import { useRooms } from "./useRooms"

export const Rooms = () => {
	const {
		columns,
		isOpen,
		rows,
		setIsOpen,
		handleCloseSnackbar,
		formik,
		handleCloseModal,
		snackbar,
		setRowId,
	} = useRooms()

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
						Crear una habitacion
					</Text>

					<Input
						type="number"
						label="N° de habitacion"
						id="roomNumber"
						name="roomNumber"
						autoComplete="cc-number"
						customType="googleInput"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.roomNumber}
						error={
							formik.touched.roomNumber
								? formik.errors.roomNumber
								: undefined
						}
						required
					/>

					<Input
						type="number"
						label="Precio"
						id="price"
						name="price"
						customType="googleInput"
						autoComplete="cc-number"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.price}
						error={
							formik.touched.price
								? formik.errors.price
								: undefined
						}
						required
					/>

					<Input
						type="text"
						label="Tipo de habitacion"
						id="type"
						name="type"
						customType="googleInput"
						autoComplete="cc-type"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.type}
						error={
							formik.touched.type ? formik.errors.type : undefined
						}
						required
					/>

					<Button
						type="submit"
						disabled={
							formik.isSubmitting || !isEmpty(formik.errors)
						}
						label="Crear habitacion"
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
					rows={rows}
					columns={columns}
					initialState={{
						pagination: {
							paginationModel: {
								pageSize: 10,
							},
						},
					}}
					disableRowSelectionOnClick
					onRowEditStart={() => setRowId(undefined)}
					onRowEditStop={params => setRowId(params.id)}
					disableDensitySelector
					getRowId={params => params.code}
					pageSizeOptions={[10, 25, 50]}
					density="standard"
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
