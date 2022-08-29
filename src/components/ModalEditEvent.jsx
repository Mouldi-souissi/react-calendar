import React, { useState } from "react";
import { useStore } from "../store/store";

const ModalEditEvent = (props) => {
  const { eventDate, event } = props;
  const [data, setData] = useState({ ...event });
  const toggleEditModal = useStore((state) => state.toggleEditModal);
  const editEvent = useStore((state) => state.editEvent);

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editEvent(event.id, data);
    setData({});
    toggleEditModal();
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="modal_wrapper">
        <div className="modal_content">
          <div className="modal_header">
            <div>Edit event</div>
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
                  value={data.title}
                />
              </div>
              <div className="form-group col-lg-12">
                <label>Description</label>
                <textarea
                  type="text"
                  className="form-control"
                  name="description"
                  onChange={handleInput}
                  value={data.description}
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
