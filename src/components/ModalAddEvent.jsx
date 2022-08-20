import React, { useState } from "react";
import { useContext } from "react";
import { CalendarContext } from "../context/CalendarContext";

const ModalAddEvent = (props) => {
  const { eventDate } = props;
  const { addEvent, toggleModalAdd } = useContext(CalendarContext);
  const [data, setData] = useState("");

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addEvent({ ...data, date: eventDate });
    setData("");
    toggleModalAdd(false);
    useForceUpdate();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="modal_wrapper">
        <div className="modal_content">
          <div className="modal_header">
            <div>Add event</div>
            <div className="exit" onClick={() => toggleModalAdd(false)}>
              &times;
            </div>
          </div>
          <div className="modal_body">
            <div className="row">
              <div className="form-group col-lg-12">
                <label>Date & Time</label>
                <input
                  type="text"
                  className="form-control-plaintext"
                  value={eventDate}
                />
              </div>
              <div className="form-group col-lg-12">
                <label>Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  onChange={handleInput}
                  required
                />
              </div>
              <div className="form-group col-lg-12">
                <label>Description</label>
                <textarea
                  type="text"
                  className="form-control"
                  name="description"
                  onChange={handleInput}
                  required
                />
              </div>
            </div>
          </div>
          <div className="modal_footer">
            <button
              className="btn btn-secondary"
              onClick={() => toggleModalAdd(false)}
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

export default ModalAddEvent;
