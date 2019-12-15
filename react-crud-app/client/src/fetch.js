export default function fetch () {
	return new Promise((resolve) => {
		setTimeout(() => resolve([
			{ value: 'Vladimir Agutin' },
			{ value: 'Aliaksandr Agutin' },
			{ value: 'Aliaksandr Meladze' },
			{ value: 'Aliaksandr Valeri' },
			{ value: 'Aliaksandr Pushkin' },
			{ value: 'Valeri Meladze' },
		]), 1000);
	});
}
