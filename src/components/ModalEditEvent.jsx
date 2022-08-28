import React, { useState } from "react";
import { useStore } from "../store/store";

const ModalEditEvent = (props) => {
  const { eventDate, event } = props;
  const [data, setData] = useState("");
  const toggleEditModal = useStore((state) => state.toggleEditModal);

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("submit");
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="modal_wrapper">
        <div className="modal_content">
          <div className="modal_header">
            <div>Add event</div>
            <div className="exit" onClick={toggleEditModal}>
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
                  defaultValue={event.title}
                />
              </div>
              <div className="form-group col-lg-12">
                <label>Description</label>
                <textarea
                  type="text"
                  className="form-control"
                  name="description"
                  onChange={handleInput}
                  defaultValue={event.description}
                  required
                />
              </div>
            </div>
          </div>
          <div className="modal_footer">
            <button className="btn btn-secondary" onClick={toggleEditModal}>
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

export default ModalEditEvent;
