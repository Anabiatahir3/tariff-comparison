import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  showModal: () => void;
};

const Modal = (props: Props) => {
  return (
    <div className="fixed inset-9 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center">
      {props.children}
      <button onClick={props.showModal}>Close Modal</button>
    </div>
  );
};

export default Modal;
