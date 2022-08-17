import { useEffect } from "react";
import { useState, createContext } from "react";

export const CalendarContext = createContext();

const ContextProvider = (props) => {
  const [isAddModalOpen, toggleModalAdd] = useState(false);
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

  useEffect(() => {
    console.log(events);
  }, [events]);

  return (
    <CalendarContext.Provider
      value={{ events, addEvent, isAddModalOpen, toggleModalAdd }}
    >
      {props.children}
    </CalendarContext.Provider>
  );
};

export default ContextProvider;
