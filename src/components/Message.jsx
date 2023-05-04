import React from "react";
import { useSelector } from "react-redux";

const Message = () => {
  const message = useSelector((state) => state.message);

  return (
    <>
      <div
        className="toast-container position-fixed"
        style={{ top: "64px", right: "15px" }}
      >
        {message.title && (
          <div
            className="toast show"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className={`toast-header text-white bg-${message.type}`}>
              <strong className="me-auto">{message.title}</strong>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="toast"
                aria-label="Close"
              />
            </div>
            <div className="toast-body">{message.text}</div>
          </div>
        )}
      </div>
    </>
  );
};

export default Message;
