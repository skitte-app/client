import React from "react";

export function MsgComponent(props) {
  const { msg, title, handleClose, handleBtn1, handleBtn2, status } = props;
  let msgType =
    status === "error" ? "error" : status === "success" ? "success" : "ok";
  return (
    <div className="skt-message">
      <div className="message" msg-type={msgType}>
        <div className="skt-message-header border-b border-green-200">
          <div className="skt-message-header-msg-icon"></div>
          <div
            className="skt-message-header-msg-close pointer bg-red-400 hover:bg-red-600 flex justify-start"
            onClick={handleClose}
          >
            x
          </div>
          {title ? (
            <div className="skt-message-header-msg-title flex justify-center">
              {title}
            </div>
          ) : null}
        </div>
        <div className="skt-message-body p-5 border-b border-gray-300">
          <p>{msg}</p>
        </div>
        <div className="skt-message-bottom flex justify-end p-3">
          {handleBtn1 && !props.btn1 === "" && (
            <button className="mr-2" onClick={handleBtn1}>
              {props.btn1}
            </button>
          )}
          {handleBtn2 && !props.btn2 === null && (
            <button className="mr-2" onClick={handleBtn2}>
              {props.btn2}
            </button>
          )}
          <button onClick={handleClose}>
            {props.msgbtn ? props.msgbtn : "Ok"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function AlertComponent(props) {
  const { msg, status } = props;
  let msgType = status === 0 ? "error" : status === 1 ? "success" : "none";
  return (
    <div className="skt-alert-message w-full h-auto p-3 flex justify-center bg-gray-700 border border-gray-800 rounded-lg shadow">
      <span className={`skt-alert-${msgType}`}>{msg}</span>
    </div>
  );
}
