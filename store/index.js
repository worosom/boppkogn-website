import moment from 'moment'

export const state = () => ({
  about: {
    abstract: [],
    translations: []
  },
  events: []
})

export const mutations = {
  setEvents(state, list) {
    state.events = list
  },
  setAbout(state, list) {
    state.about = list
  }
}

export const getters = {
  todaysDate: _ => moment(),
  upcoming: state => state.events.filter(ev => {
    return moment().diff(ev.date) <= 0
  }).sort((a, b) => -moment(a.date).diff(b.date)),
  previous: state => state.events.filter(ev => {
    return moment().diff(ev.date) > 0
  }).sort((a, b) => -moment(a.date).diff(b.date))
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
        event.date = moment(event.date, 'YYYY-MM-DD hh:mma').utc().utcOffset(-7)
        events.push(event)
      })
      const about = require('~/assets/content/about/about.yml')
      await store.commit('setEvents', events)
      await store.commit('setAbout', about)
    }
  }
}
