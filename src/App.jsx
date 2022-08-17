import "./App.css";
import Calender from "./components/Calender";
import ContextProvider from "./context/CalendarContext";

function App() {
  return (
    <div>
      <ContextProvider>
        <Calender />;
      </ContextProvider>
    </div>
  );
}

export default App;
