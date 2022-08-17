import React, { useEffect, useState } from "react";
import {
  format,
  addDays,
  startOfWeek,
  getMonth,
  nextMonday,
  previousMonday,
  isSameDay,
} from "date-fns";
import ModalAddEvent from "./ModalAddEvent";
import { useContext } from "react";
import { CalendarContext } from "../context/CalendarContext";

const weekDays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Calender = () => {
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState("06:00");
  const [endTime, setEndtTime] = useState("06:30");
  const [timeInterval, setTimeInterval] = useState(15);
  const [eventDate, setEventDate] = useState("");
  const { events, toggleModalAdd, isAddModalOpen } =
    useContext(CalendarContext);

  const generateWeekDays = () => {
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

  const generateTimeLine = () => {
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
    while (
      timeLine[timeLine.length - 1].totalMin <=
      totalMinEnd - timeInterval
    ) {
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

  const generateCell = (d, t) => {
    for (let i in events) {
      const date = events[i].date;
      const isSame_Day = isSameDay(d.date, date);
      const isSameTime =
        t.hours - date.getHours() === 0 && t.minutes - date.getMinutes() === 0;

      if (isSame_Day && isSameTime) {
        return { date: d, time: t, isEvent: true, event: events[i] };
      } else {
        return { date: d, time: t, isEvent: false };
      }
    }
  };
  const generateGrid = () => {
    const x = generateWeekDays();
    const y = generateTimeLine();
    let grid = [];

    for (let i in x) {
      for (let j in y) {
        const cell = generateCell(x[i], y[j]);
        grid.push(cell);
      }
    }

    console.log(grid);
    return grid;
  };

  // useEffect(() => {
  //   const generatedGrid = generateGrid();
  //   setGrid(generateGrid);
  // }, []);

  const closeModalAdd = () => {
    toggleModalAdd(false);
  };

  const generateDate = (d, t) => {
    const eventDate = new Date(d.date);
    eventDate.setHours(t.hours);
    eventDate.setMinutes(t.minutes);
    setEventDate(eventDate);
    toggleModalAdd(true);
  };

  const handleCellClass = (d, t) => {
    for (let i in events) {
      const date = events[i].date;
      const isSame_Day = isSameDay(d.date, date);
      const isSameTime =
        t.hours - date.getHours() === 0 && t.minutes - date.getMinutes() === 0;

      if (isSame_Day && isSameTime) {
        return "event";
      }
    }
  };
  const handleEventDetails = (d, t) => {
    for (let i in events) {
      const date = events[i].date;
      const isSame_Day = isSameDay(d.date, date);
      const isSameTime =
        t.hours - date.getHours() === 0 && t.minutes - date.getMinutes() === 0;

      if (isSame_Day && isSameTime) {
        return events[i].title;
      }
    }
  };

  return (
    <div className="container card p-2 shadow mt-3">
      <div className="calendar-header col-12">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            {/* <div style={{ fontSize: "18px" }}> {format(date, "dd")}</div> */}
            <div className="ms-4">
              <div style={{ fontSize: "25px" }}>{months[getMonth(date)]}</div>
              <div style={{ fontSize: "24px" }}> {format(date, "yyyy")}</div>
            </div>
          </div>
          <div className="d-flex">
            <div className="prev" onClick={() => setDate(previousMonday(date))}>
              &#10094;
            </div>
            <div className="next" onClick={() => setDate(nextMonday(date))}>
              &#10095;
            </div>
          </div>
        </div>
      </div>

      <div className="calendar">
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th scope="col" className="days-cell">
                  Time \ Days
                </th>
                {generateWeekDays().map((d) => (
                  <th key={d.date} className="days-cell">
                    {isSameDay(d.date, new Date()) && (
                      <div className="circle"></div>
                    )}
                    {d.day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {generateTimeLine().map((t) => (
                <tr key={t.totalMin}>
                  <td scope="row" className="time-cell">
                    {t.value}
                  </td>
                  {generateWeekDays().map((d) => (
                    <td
                      key={d.date}
                      // data-bs-toggle="modal"
                      // data-bs-target="#FormModal"
                      onClick={() => generateDate(d, t)}
                      className={handleCellClass(d, t)}
                      style={{ cursor: "pointer" }}
                    >
                      {handleEventDetails(d, t)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {isAddModalOpen && (
          <ModalAddEvent
            handleClose={closeModalAdd}
            eventDate={eventDate}
            useForceUpdate={useForceUpdate}
          />
        )}
      </div>
    </div>
  );
};

export default Calender;
