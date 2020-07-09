export default function throttle (callback, delay, options = {}) {
	let timeout
	let lastState
	let currentArgs
	const throttled = (state, ...args) => {
		currentArgs = args
		if (timeout && state === lastState) return
		let leading = options.leading
		if (typeof leading === 'function') {
			leading = leading(state, lastState)
		}
		if ((!timeout || (state !== lastState)) && leading) {
			callback(state, ...currentArgs)
		}
		lastState = state
		clearTimeout(timeout)
		timeout = setTimeout(() => {
			callback(state, ...currentArgs)
			timeout = 0
		}, delay)
	}
	throttled._clear = () => {
		clearTimeout(timeout)
		timeout = null
	}
	return throttled
}
