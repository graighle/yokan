export function ArrayReplacedAt(array, pos, replaced){
	return [
		...array.slice(0, pos),
		replaced,
		...array.slice(pos + 1),
	];
}

export function ArraySwapped(array, pos1, pos2){
	const minIndex = Math.min(pos1, pos2);
	const maxIndex = Math.max(pos1, pos2);

	return [
		...array.slice(0, minIndex),
		array[maxIndex],
		...array.slice(minIndex + 1, maxIndex),
		array[minIndex],
		...array.slice(maxIndex + 1),
	];
}

