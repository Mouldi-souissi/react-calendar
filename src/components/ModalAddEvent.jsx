import React, { useState } from "react";
import { generateGuid } from "../functions/uuid";
import { useStore } from "../store/store";

const ModalAddEvent = (props) => {
  const { eventDate } = props;
  const [data, setData] = useState("");

  const addEvent = useStore((state) => state.addEvent);
  const toggleModalAdd = useStore((state) => state.toggleModalAdd);

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    addEvent({ ...data, date: new Date(eventDate), id: generateGuid() });
    setData("");
    toggleModalAdd(false);
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
                {/* <input
                  type="text"
                  className="form-control-plaintext"
                  value={eventDate}
                /> */}
                <div className="form-control">{eventDate}</div>
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
