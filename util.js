export const datum = (date) => new Date(Date.parse(date.slice(0, -2) + ' ' + date.slice(-2)))
