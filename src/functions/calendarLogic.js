import { format, addDays, startOfWeek, isSameDay, isToday } from "date-fns";

export const generateWeekDays = (date) => {
  const weekDays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  let daysOfWeek = [];
  const weekStart = startOfWeek(date, { weekStartsOn: 1 });

  for (let i = 0; i < 7; i++) {
    daysOfWeek.push({
      date: addDays(weekStart, i),
      day: format(addDays(weekStart, i), "d") + " " + weekDays[i],
    });
  }

  return daysOfWeek;
};

const generateTimeLine = (startTime, endTime, timeInterval) => {
  let timeLine = [];

  const displayTime = (totalMin) => {
    const hours = Math.floor(totalMin / 60);
    const minuts = Math.floor(totalMin % 60);

    return `${hours < 10 ? "0" + hours.toString() : hours}:${
      minuts < 10 ? "0" + minuts.toString() : minuts
    }`;
  };

  const startPoint = {
    value: startTime,
    hours: Number(startTime.substring(0, 2)),
    minutes: Number(startTime.substring(3, 5)),
    totalMin:
      Number(startTime.substring(0, 2)) * 60 +
      Number(startTime.substring(3, 5)),
  };

  timeLine.push(startPoint);

  let totalMin = startPoint.totalMin;
  let totalMinEnd =
    Number(endTime.substring(0, 2)) * 60 + Number(endTime.substring(3, 5));
  while (timeLine[timeLine.length - 1].totalMin <= totalMinEnd - timeInterval) {
    totalMin = totalMin + timeInterval;

    timeLine.push({
      value: displayTime(totalMin),
      totalMin: totalMin,
      hours: Math.floor(totalMin / 60),
      minutes: Math.floor(totalMin % 60),
    });
  }
  return timeLine;
};

const isPast = (date) => {
  if (new Date().setHours(0, 0, 0, 0) - date.setHours(0, 0, 0, 0) <= 0) {
    return false;
  }

  return true;
};

const generateCell = (d, t, events) => {
  const isDatePast = isPast(new Date(d.date));
  const isTimePast = new Date().getHours() - t.hours > 0;

  for (let i in events) {
    const date = events[i].date;
    const isSame_Day = isSameDay(d.date, date);
    const isSameTime =
      t.hours - date.getHours() === 0 && t.minutes - date.getMinutes() === 0;

    if (isSame_Day && isSameTime) {
      return { date: d, time: t, isEvent: true, event: events[i] };
    }
  }
  return {
    date: d,
    time: t,
    isEvent: false,
    isPast: isToday(d.date) ? isTimePast : isDatePast,
  };
};
export const generateGrid = (
  date,
  startTime,
  endTime,
  timeInterval,
  events
) => {
  const x = generateWeekDays(date);
  const y = generateTimeLine(startTime, endTime, timeInterval);

  let grid = [];

  for (let i in y) {
    let row = [];

    for (let j in x) {
      const cell = generateCell(x[j], y[i], events);
      row.push(cell);
    }
    grid.push(row);
  }

  return grid;
};
