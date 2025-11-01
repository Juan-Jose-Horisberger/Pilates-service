// Utilidad para obtener todos los lunes a sábado del mes
const getDaysOfMonth = (year, monthNumber) => {
  const days = [];
  const date = new Date(year, monthNumber - 1, 1); // 2025/11 - 1 = (noviembre)/01
  const daysOfWeek = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];

  //El while itera mientras la fecha siga perteneciendo al mes que queremos.
  while (date.getMonth() === monthNumber - 1) {
    const dayName = daysOfWeek[date.getDay()]

    if (dayName !== 'sunday') {
      days.push({
        date: new Date(date),
        dayOfWeek: dayName,
      })
    }

    //Si date era 2025-11-01, tras esto será 2025-11-02. Si era 2025-11-30, 
    //pasará a 2025-12-01 — y entonces date.getMonth() ya no será noviembre y el while terminará.
    date.setDate(date.getDate() + 1);
  }

  return days;
}

const getWeekNumberInMonth = (date) => {
  const day = date.getDate();
  const week = Math.ceil(day / 7);
  return week > 4 ? 4 : week;
}

module.exports = {
  getDaysOfMonth,
  getWeekNumberInMonth
}
