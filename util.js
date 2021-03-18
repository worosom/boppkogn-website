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

export const imageURI = (route, i, image, origin) => {
  const image_title = image.title || ''
  const _route = route.params.artist ? `/artists/${route.params.artist}` : `/events/${route.params.slug}`
  return `${_route}/gallery/${i}_${encodeURIComponent(image_title.split('/').join('_'))}/?origin=${origin || encodeURIComponent(route.fullPath)}`
}

export const mod = (a, n) => {
  return ((a%n)+n)%n;
}

export async function artistData({route, $content}) {
  const data = await $content(`en/artists/${route.params.artist}`).fetch()
  const all_events = await $content('en/events').fetch()
  const events = all_events.filter(event => event.artists.filter(({artist}) => artist.relation == data.slug).length)
  let i = 0
  let media = (await Promise.all(all_events.map(async  ({slug, media}) => {
    if (media) {
      const _media = media.filter(({image}) => image.artists && image.artists.filter(({relation}) => relation == data.slug).length > 0)
      _media.forEach(async m => {
	m.image.artists = await Promise.all(m.image.artists.map(async ({relation}) => await $content(`en/artists/${relation}`).fetch()))
        m.slug = slug
        m.uri = imageURI(route, i, m.image)
        i += 1
      })
      return _media
    }
  }))).flat().filter(m => !!m)
  data.media && (media = Array.concat(data.media,  media))
  return {
    ...data,
    events,
    media
  }
}

const fallbackCopyTextToClipboard = (text, cb) => {
  const textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand('copy');
    if (successful) {
      cb(msg)
    }
  } catch (err) {
  }
  document.body.removeChild(textArea);
}
export const copyTextToClipboard = (text, cb) => {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text, cb);
    return;
  }
  navigator.clipboard.writeText(text).then(cb, err => {});
}
