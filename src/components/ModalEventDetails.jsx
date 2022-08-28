import React from "react";

const ModalEventDetails = (props) => {
  const { eventDate } = props;
  const toggleModalDetails = useStore((state) => state.toggleModalDetails);
  const handleSubmit = () => {
    console.log("submit");
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="modal_wrapper">
        <div className="modal_content">
          <div className="modal_header">
            <div>Event</div>
            <div className="exit" onClick={() => toggleModalDetails()}>
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
              onClick={() => toggleModalDetails()}
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
