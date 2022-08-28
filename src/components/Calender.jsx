import React, { useEffect, useState } from "react";
import {
  format,
  getMonth,
  nextMonday,
  previousMonday,
  isSameDay,
} from "date-fns";
import ModalAddEvent from "./ModalAddEvent";
import ModalEventDetails from "./ModalEventDetails";
import { useStore } from "../store/store";
import { generateWeekDays } from "../functions/calendarLogic";

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
  // ************* state ****************
  const [eventDate, setEventDate] = useState("");
  // ************* state ****************

  // ************* store ****************
  const generateGrid = useStore((state) => state.generateGrid);
  const grid = useStore((state) => state.grid);
  const date = useStore((state) => state.date);
  const startTime = useStore((state) => state.startTime);
  const endTime = useStore((state) => state.endTime);
  const timeInterval = useStore((state) => state.timeInterval);
  const events = useStore((state) => state.events);
  const toggleModalAdd = useStore((state) => state.toggleModalAdd);
  const toggleModalDetails = useStore((state) => state.toggleModalDetails);
  const isAddModalOpen = useStore((state) => state.isAddModalOpen);
  const isDetailsModalOpen = useStore((state) => state.isDetailsModalOpen);
  const setDate = useStore((state) => state.setDate);
  // ************* store ****************

  useEffect(() => {
    const outsideClick = (e) => {
      const modal = document.querySelector(".modal_wrapper");
      if (e.target === modal) {
        toggleModalAdd(false);
        toggleModalDetails(false);
      }
    };
    window.addEventListener("click", outsideClick);
    return () => window.removeEventListener("click", outsideClick);
  }, []);

  const generateDate = (d, t) => {
    const eventDate = new Date(d.date);
    console.log(eventDate);
    eventDate.setHours(t.hours);
    eventDate.setMinutes(t.minutes);
    setEventDate(eventDate);
    toggleModalAdd(true);
    // toggleModalDetails(true);
  };

  useEffect(() => {
    generateGrid(date, startTime, endTime, timeInterval, events);
  }, [events]);

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
                {generateWeekDays(date).map((d) => (
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
              {grid.map((row, i) => {
                return (
                  <tr key={i}>
                    <td scope="row" className="time-cell">
                      {row[i].time.value}
                    </td>
                    {row.map((cell) => (
                      <td
                        key={cell.date.date}
                        className={cell.isEvent ? "event" : "cell"}
                        onClick={() => generateDate(cell.date, cell.time)}
                      >
                        {cell.isEvent && cell.event.title}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {isAddModalOpen && <ModalAddEvent eventDate={eventDate} />}
        {isDetailsModalOpen && <ModalEventDetails eventDate={eventDate} />}
      </div>
    </div>
  );
};

export default Calender;
