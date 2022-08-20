import React, { useContext } from "react";
import { CalendarContext } from "../context/CalendarContext";

const ModalEventDetails = (props) => {
  const { eventDate } = props;
  const { toggleModalDetails } = useContext(CalendarContext);
  const handleSubmit = () => {
    console.log("submit");
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="modal_wrapper">
        <div className="modal_content">
          <div className="modal_header">
            <div>Event</div>
            <div className="exit" onClick={() => toggleModalDetails(false)}>
              &times;
            </div>
          </div>
          <div className="modal_body">
            <div className="row">
              {/* <div className="col-lg-12">{new Date(eventDate)}</div> */}
            </div>
          </div>
          <div className="modal_footer">
            <button
              className="btn btn-secondary"
              onClick={() => toggleModalDetails(false)}
            >
              Cancel
            </button>
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ModalEventDetails;
