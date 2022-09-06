import React from "react";
import { useStore } from "../store/store";

const ModalEventDetails = (props) => {
  const { eventDate, event } = props;
  const toggleModalDetails = useStore((state) => state.toggleModalDetails);
  const toggleEditModal = useStore((state) => state.toggleEditModal);
  const handleSubmit = (e) => {
    e.preventDefault();
    toggleModalDetails();
    toggleEditModal();
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="modal_wrapper">
        <div
          className="modal_content text-white"
          style={{ background: "black", border: "2px solid white" }}
        >
          <div className="modal_header">
            <div>Event</div>
            <div className="exit" onClick={() => toggleModalDetails()}>
              &times;
            </div>
          </div>
          <div className="modal_body">
            <div className="row">
              <div className="col-lg-12 mb-5">
                <label>Date & Time</label>
                <div>{eventDate}</div>
              </div>
              <div className="col-lg-12 mb-5">
                <label>Title</label>
                <div>{event.title}</div>
              </div>
              <div className="col-lg-12 mb-5">
                <label>Description</label>
                <div>{event.description}</div>
              </div>
            </div>
          </div>
          <div className="modal_footer">
            <button
              className="btn btn-secondary"
              onClick={() => toggleModalDetails()}
            >
              Cancel
            </button>
            <button className="btn btn-primary" type="submit">
              edit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ModalEventDetails;
