export const datum = dateString => {
  const date = dateString.split(' ')[0].split('-').map(x => Number(x))
  date[1] -= 1 
  const time = dateString.split(' ')[1].split(':')
  const hours = Number(time[0]) + (time.indexOf('pm') ? 12 : 0)
  const minutes = Number(time[1].slice(0, -2))
  return new Date(...date, hours, minutes)
}

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

export const imageURI = (route, i, image, origin, caller) => {
  const image_title = image.artists?.map(({slug, relation}) => slug || relation).join('_') || ''
  const _route = route.params.artist ? `/artists/${route.params.artist}` : `/events/${route.params.slug}`
  let uri = `${_route}/gallery/${i}_${encodeURIComponent(image_title)}/`
  if (origin) {
    uri += `?origin=${origin || encodeURIComponent(route.fullPath + '#pics')}`
  }
  return uri
}

export const mod = (a, n) => {
  return ((a%n)+n)%n;
}

export async function artistData({route, $content}) {
  // const metaget = require('metaget')
  const data = await $content(`en/artists/${route.params.artist}`).fetch()
  const all_events = await $content('en/events').fetch()
  const events = all_events.filter(event => event.artists.filter(({artist}) => artist.relation == data.slug).length)
  let i = 0
  let media = (await Promise.all(all_events.map(async ({slug, media}) => {
    if (media) {
      let _media = media.filter(({image}) => image.artists && image.artists.filter(({relation}) => relation == data.slug).length > 0)
      _media = await Promise.all(_media.map(async m => {
	return {
	  ...m,
	  image: {
	    ...m.image,
	    artists: await Promise.all(m.image.artists.filter(a => !!a).map(async ({relation}) => ({...await $content(`en/artists/${relation}`).fetch(), relation}))),
	    slug
	  },
	  uri: imageURI(route, i++, m.image)
	}
      }))
      return _media
    }
  }))).flat().filter(m => !!m)
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
  navigator.clipboard.writeText(text).then(cb, err => fallbackCopyTextToClipboard(text, cb));
}

export const ast2str = ({type, value, children}) => {
  switch (type) {
    case 'text':
      return value;
    case 'root':
    case 'element':
      return children.reduce((a, b) => a + (typeof b == 'object' ? ast2str(b) : b), '')
    default:
      return b || ''
  }
}
