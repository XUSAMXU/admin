export function getToken () {
	return window.sessionStorage.getItem('token')
}

export function setToken (token) {
	return window.sessionStorage.setItem('token', token)
}

export function resetToken () {
	return window.sessionStorage.removeItem('token')
} 