import create from "zustand";
import { generateGrid } from "../functions/calendarLogic";

export const useStore = create((set) => ({
  date: new Date(),
  startTime: "06:00",
  endTime: "06:30",
  timeInterval: 15,
  grid: [],
  events: [
    {
      id: "qsdfqdsf32569sqdf1111111",
      date: new Date("2022-08-22T06:00:00"),
      title: "test",
      description: "test desc",
    },
    {
      id: "qsdfqdsf32569sqdfgfdg255f",
      date: new Date("2022-08-23T06:15:00"),
      title: "test2",
      description: "test2 desc",
    },
  ],

  isAddModalOpen: false,
  isDetailsModalOpen: false,
  isEditModalOpen: false,

  generateGrid: (date, startTime, endTime, timeInterval, events) => {
    const generatedGrid = generateGrid(
      date,
      startTime,
      endTime,
      timeInterval,
      events
    );
    set({ grid: generatedGrid });
  },

  toggleModalAdd: () => {
    set((state) => ({ isAddModalOpen: !state.isAddModalOpen }));
  },
  toggleModalDetails: () => {
    set((state) => ({ isDetailsModalOpen: !state.isDetailsModalOpen }));
  },
  toggleEditModal: () => {
    set((state) => ({ isEditModalOpen: !state.isEditModalOpen }));
  },
  addEvent: (event) => {
    set((state) => ({ events: [...state.events, event] }));
  },

  setDate: (date) => {
    set({ date: date });
  },

  editEvent: (id, editedEvent) => {
    set((state) => ({
      events: [...state.events.filter((event) => event.id !== id), editedEvent],
    }));
  },
}));
