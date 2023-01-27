import create from "zustand";
import { generateGrid } from "../functions/calendarLogic";

let twoDaysAgo = new Date();
twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
twoDaysAgo.setHours(10, 0);

let today = new Date();
today.setHours(8, 0);

export const useStore = create((set) => ({
  date: new Date(),
  startTime: "08:00",
  endTime: "18:30",
  timeInterval: 120,
  grid: [],
  events: [
    {
      id: "qsdfqdsf32569sqdf1111111",
      date: twoDaysAgo,
      title: "Box",
      description: "Box",
    },
    {
      id: "qsdfqdsf32569sqdfgfdg255f",
      date: today,
      title: "Pizza",
      description: "Pizza",
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
