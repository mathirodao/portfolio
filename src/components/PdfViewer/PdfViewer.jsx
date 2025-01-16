import React from "react";

const PdfViewer = ({ fileUrl }) => {
  return (
    <div>
      <embed src={fileUrl} width="100%" height="850rem" />
    </div>
  );
};

export default PdfViewer;
