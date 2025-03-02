export const getTimeDifference = (createdAt: string, abbr = false) => {
	const now = new Date()
	const past = new Date(createdAt)
	const diffMs = now.getTime() - past.getTime()

	const seconds = Math.floor(diffMs / 1000)
	const minutes = Math.floor(seconds / 60)
	const hours = Math.floor(minutes / 60)
	const days = Math.floor(hours / 24)

	if (abbr) {
		if (days > 0) return `${days}d ago`
		if (hours > 0) return `${hours}h ago`
		if (minutes > 0) return `${minutes}m ago`
	} else {
		if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`
		if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`
		if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
	}
	return 'Just now'
}
