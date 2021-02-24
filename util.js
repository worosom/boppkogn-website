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

const mod = (a, n) => {
  return ((a%n)+n)%n;
}

export async function artistData({route, $content}) {
  const data = await $content(`en/artists/${route.params.artist}`).fetch()
  const all_events = await $content('en/events').fetch()
  const events = all_events
    .filter(event => event.artists.filter(({artist}) => artist.relation == data.slug).length)
  let i = 0
  let media = all_events.map(({slug, media}) => {
    if (media) {
      const _media = media.filter(({image}) => image.artists && image.artists.filter(({relation}) => relation == data.slug).length > 0)
      _media.forEach(m => {
        m.slug = slug
        m.uri = imageURI(route, i, m.image)
        i += 1
      })
      return _media
    }
  }).flat().filter(m => !!m)
  data.media && (media = Array.concat(data.media,  media))
  return {
    ...data,
    events,
    media
  }
}
