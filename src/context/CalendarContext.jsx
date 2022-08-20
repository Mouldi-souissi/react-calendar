import { useEffect } from "react";
import { useState, createContext } from "react";

export const CalendarContext = createContext();

const ContextProvider = (props) => {
  const [isAddModalOpen, toggleModalAdd] = useState(false);
  const [isDetailsModalOpen, toggleModalDetails] = useState(false);

  const [events, setEvents] = useState([
    {
      date: new Date("2022-08-15T06:00:00"),
      title: "test",
      description: "test desc",
    },
    {
      date: new Date("2022-09-09T06:00:00"),
      title: "test2",
      description: "test2 desc",
    },
  ]);

  const addEvent = (event) => {
    setEvents([...events, event]);
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

  useEffect(() => {
    console.log(events);
  }, [events]);

  return (
    <CalendarContext.Provider
      value={{
        events,
        addEvent,
        isAddModalOpen,
        toggleModalAdd,
        isDetailsModalOpen,
        toggleModalDetails,
      }}
    >
      {props.children}
    </CalendarContext.Provider>
  );
};

export default ContextProvider;
