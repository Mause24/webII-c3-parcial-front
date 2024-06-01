import { Button, CustomModal, Icon, Input, Text } from "@/components"
import { ICONS } from "@/Constants"
import { Box } from "@mui/material"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import clsx from "clsx"
import { Formik } from "formik"
import { useRooms } from "./useRooms"

export const Rooms = () => {
	const { columns, isOpen, rows, setIsOpen, onSubmit, validationSchema } =
		useRooms()
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
						roomNumber: 0,
						price: 0,
						type: "",
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
								Crear una habitacion
							</Text>

							<Input
								type="text"
								label="N° de habitacion"
								id="roomNumber"
								name="roomNumber"
								autoComplete="roomNumber"
								customType="googleInput"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.roomNumber}
								error={
									touched.roomNumber
										? errors.roomNumber
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
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.price}
								error={touched.price ? errors.price : undefined}
								required
							/>

							<Input
								type="text"
								label="Tipo de habitacion"
								id="type"
								name="type"
								customType="googleInput"
								autoComplete="cc-type"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.type}
								error={touched.type ? errors.type : undefined}
								required
							/>

							<Button
								type="submit"
								disabled={isSubmitting}
								title="Crear habitacion"
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
					rows={rows}
					columns={columns}
					initialState={{
						pagination: {
							paginationModel: {
								pageSize: 10,
							},
						},
					}}
					getRowId={row => `r-${row.roomNumber}-${row.type}`}
					checkboxSelection
					disableRowSelectionOnClick
					density="standard"
					disableDensitySelector
					slots={{ toolbar: GridToolbar }}
				/>
			</Box>
		</div>
	)
}
