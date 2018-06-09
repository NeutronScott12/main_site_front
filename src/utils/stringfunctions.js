export const capitaliseFirstword = input => {
	const augmented = String(input).replace(
		/^\w/,
		String(input)
			.split('')[0]
			.toUpperCase()
	)

	return augmented
}

export const sluggify = title => {
	return String(title)
		.replace(/ /g, '-')
		.toLowerCase()
}
