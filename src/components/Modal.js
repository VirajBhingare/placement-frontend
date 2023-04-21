import React from "react";

import "../styles/modal.css";

const Modal = ({ setModal, resume }) => {
  return (
    <div className="backshadow col-12">
      <div className="custom-modal col-md-10 col-10 mx-auto">
        <div className="delete-icon" onClick={() => setModal(false)}>
          x
        </div>

        {resume !== null && (
          <embed
            type="application/pdf"
            src={resume}
            width={100 + "%"}
            height={100 + "%"}
          ></embed>
          //   <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js">
          //     <Viewer fileUrl={resume} plugins={[defaultLayoutPluginInstance]} />;
          //   </Worker>
        )}
      </div>
    </div>
  );
};

export default Modal;
