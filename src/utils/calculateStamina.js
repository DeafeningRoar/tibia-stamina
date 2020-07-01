import moment from 'moment';

export const calculateTimeToFull = (
  stamina = { currentHours: 0, currentMinutes: 0 },
  eventDate = moment().format()
) => {
  const { currentHours, currentMinutes } = stamina;
  const minutesAtReducedGainTime = 39 * 60;
  const minutesAtFull = 41 * 60 + 59;
  const minutesToEvent = moment(eventDate).diff(new Date(), 'minutes');
  const staminaToMinutes = +currentHours * 60 + +currentMinutes;
  const greenStaminaMultiplier = 6;
  const regularStaminaMultiplier = 3;
  const extraGreenStaminaMinutes = 10;
  const minutesToChargeGreen =
    (minutesAtFull - minutesAtReducedGainTime) * greenStaminaMultiplier + extraGreenStaminaMinutes;

  if (staminaToMinutes >= minutesAtFull) return { message: 'You are already at 41:59 stamina.', date: '' };

  const differenceFromFullAtReduced = (minutesAtFull - staminaToMinutes) * greenStaminaMultiplier;
  const minutesToReduced =
    minutesAtReducedGainTime - staminaToMinutes > 0
      ? (minutesAtReducedGainTime - staminaToMinutes) * regularStaminaMultiplier
      : 0;
  const timeToFull =
    staminaToMinutes >= minutesAtReducedGainTime
      ? differenceFromFullAtReduced + extraGreenStaminaMinutes
      : minutesToReduced + minutesToChargeGreen;

  const hasEnoughTime = minutesToEvent >= timeToFull;
  if (!hasEnoughTime) return { message: 'There is not enough time to recover your stamina.', date: '' };

  return {
    date: moment(eventDate).subtract(timeToFull, 'minutes').format('MM-DD-YYYY - hh:mm a'),
  };
};
