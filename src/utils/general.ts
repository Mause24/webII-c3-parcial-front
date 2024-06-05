export const sleep = (ms: number) => {
	const esperarHasta = new Date().getTime() + ms
	while (new Date().getTime() < esperarHasta) continue
}
