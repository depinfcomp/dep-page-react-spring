import React from "react";
import "../css/sectionHeading.css";

const SectionHeadingComponent = ({ headingText }) => {
  return (
    <>
      <div className="fcen-section-heading-color-F1">
        <p style={{ fontSize: "60px" }} id="fcen-depmate-cuerpo-administrativo">
          {headingText}
        </p>
      </div>
      
    </>
  );
};

export default SectionHeadingComponent;
