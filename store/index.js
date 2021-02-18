export const state = () => ({
  about: {
    abstract: [],
    translations: []
  },
  events: []
})

const datum = (date) => new Date(Date.parse(date.slice(0, -2) + ' ' + date.slice(-2)))

export const mutations = {
  setEvents(state, list) {
    state.events = list.map(event => ({...event, date: datum(event.date)}))
  },
  setAbout(state, list) {
    state.about = list
  }
}

export const getters = {
  todaysDate: _ => new Date(),
  upcoming: state => state.events.filter(ev => {
    return new Date() - ev.date <= 0
  }).sort((a, b) => - (a.date - b.date)),
  previous: state => state.events.filter(ev => {
    return new Date() - ev.date > 0
  }).sort((a, b) => - (a.date - b.date))
}

export const actions = {
  async nuxtServerInit(store) {
    if (process.server) {
      const fs = require('fs')
      const events_path = 'assets/content/events'
      const events = store.state.events
      fs.readdirSync(events_path)
            .filter(filename => filename.endsWith('yml'))
            .forEach(filename => {
        const event = require(`~/${events_path}/${filename}`)
        events.push(event)
      })
      const about = require('~/assets/content/about/about.yml')
      await store.commit('setEvents', events)
      await store.commit('setAbout', about)
    }
  }
}
