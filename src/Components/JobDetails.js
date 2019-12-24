import React, { useState } from "react";

export default function jobDetails({ jobType, detailChoice }) {
  const [jobSelected, setJobSelected] = useState(false);
  const [showDetails, toggleDetails] = useState(false);

  function tileClick() {
    if (jobType === "Parking_Lot" || jobType === "Driveway") {
      toggleDetails(!showDetails)
    }
    detailChoice(jobType, !jobSelected)
    setJobSelected(!jobSelected)
  }

  // const jobDetails = (
  //   <div className="detail">
  //       Do you want shoveling between cars?
  //     <button onClick={() => detailChoice("shoveling_between_cars", true)}>Yes</button>
  //     <button onClick={() => detailChoice(jobType, false)}>No</button>
  //   </div>
  // );

  return (
    <>
      <div className={jobSelected ? "job-type-tile details-shown" : "job-type-tile"}>

        <span
          className="clickable-span"
          onClick={() => tileClick()}>
          {jobType.split("_").join(" ")}
        </span>

        {/* showDetails ?
          <div className="job-type-tile details">
            { showDetails ? jobDetails : '' }
          </div>
          : ''
        */}
      </div>
    </>
  );
}
