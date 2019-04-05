import dayjs from 'dayjs'
import moment from 'moment'

const parseDate = date => {
  return {
    day: dayjs(date).format('DD/MM/YYYY'),
    hour: dayjs(date).format('HH:mm')
  }
}

export const calculateTimeToFull = (
  stamina = { currentHours: 0, currentMinutes: 0 },
  eventDate = parseDate(new Date())
) => {
  const { currentHours, currentMinutes } = stamina
  const minutesAtReducedGainTime = 40 * 60
  const minutesAtFull = 41 * 60 + 59
  const minutesToEvent = moment(eventDate).diff(new Date(), 'minutes')
  const staminaToMinutes = +currentHours * 60 + +currentMinutes

  if (staminaToMinutes >= minutesAtFull) return { message: 'You are already at 41:59 stamina.', date: '' }

  const differenceFromFullAtReduced = (minutesAtFull - staminaToMinutes) * 10
  const minutesToReduced =
    minutesAtReducedGainTime - staminaToMinutes > 0 ? (minutesAtReducedGainTime - staminaToMinutes) * 3 : 0
  const timeToFull =
    staminaToMinutes >= minutesAtReducedGainTime ? differenceFromFullAtReduced + 10 : minutesToReduced + 1210

  const time = {}
  time.days = timeToFull / (24 * 60) >= 1 ? Math.floor(timeToFull / (24 * 60)) : 0
  time.hours = timeToFull - time.days * 24 * 60 > 0 ? Math.floor((timeToFull - time.days * 24 * 60) / 60) : 0
  time.minutes =
    timeToFull - (time.days * 24 * 60 + time.hours * 60) > 0 ? timeToFull - (time.days * 24 * 60 + time.hours * 60) : 0
  const hasEnoughTime = minutesToEvent >= time.days * 24 * 60 + time.hours * 60 + time.minutes
  if (!hasEnoughTime) return { message: 'There is not enough time to recover your stamina.', date: '' }
  const logoutDate = moment(eventDate)
    .subtract(time.days, 'days')
    .subtract(time.hours, 'hours')
    .subtract(time.minutes, 'minutes')
    .format('DD-MM-YYYY - hh:mm a')
  return { date: logoutDate }
}
