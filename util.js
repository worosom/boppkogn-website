export const datum = (date) => new Date(Date.parse(date.slice(0, -2) + ' ' + date.slice(-2)))

export function throttle (callback, delay, options = {}) {
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

export const imageURI = (route, i, image) => {
  const image_title = image.title || ''
  const _route = route.params.artist ? `/artists/${route.params.artist}` : `/events/${route.params.slug}`
  return `${_route}/gallery/${i}_${encodeURIComponent(image_title.split('/').join('_'))}/`
}
