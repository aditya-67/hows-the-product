import React from "react";
import "./Stars.css";

function Stars({ type, rating, passRatingToModal, reviewNumber }) {
  const checkRating = (e) => {
    passRatingToModal(e.target.value);
  };
  return (
    <fieldset className="rate" id={type !== "edit" ? "display" : "review"}>
      {/* Create an array from 1 to 10 and reverse it */}
      {Array.from({ length: 10 }, (_, k) => k + 1)
        .reverse()
        .map((star) => {
          return type === "display" ? (
            <>
              <input
                type="radio"
                id={"rating" + star + "-" + type}
                name={"rating" + star + "-" + type}
                value={star}
                key={"input-" + star + "-" + type}
                checked={"rating" + star + "-display" === rating ? true : false}
                readOnly
              />
              <label
                className={star % 2 !== 0 ? "half" : null}
                htmlFor={"rating" + star + "-" + type}
                title={(star / 2).toFixed(1) + " stars"}
                key={"label-" + star + "-" + type}
              ></label>
            </>
          ) : type === "display-review" ? (
            <>
              <input
                type="radio"
                id={"rating" + star + "-" + type + "-" + reviewNumber}
                name={"rating" + star + "-" + type + "-" + reviewNumber}
                value={star}
                key={"input-" + star + "-" + type + "-" + reviewNumber}
                checked={
                  "rating" + star + "-" + reviewNumber === rating ? true : false
                }
                readOnly
              />
              <label
                className={star % 2 !== 0 ? "half" : null}
                htmlFor={"rating" + star + "-" + type + "-" + reviewNumber}
                title={(star / 2).toFixed(1) + " stars"}
                key={"label-" + star + "-" + type + "-" + reviewNumber}
              ></label>
            </>
          ) : (
            <>
              <input
                type="radio"
                id={"rating" + star + "-" + type}
                name={"rating" + star + "-" + type}
                value={star}
                key={"input" + star + type}
                onClick={checkRating}
              />
              <label
                className={star % 2 !== 0 ? "half" : null}
                htmlFor={"rating" + star + "-" + type}
                title={(star / 2).toFixed(1) + " stars"}
                key={"label" + star + type}
              ></label>
            </>
          );
        })}
    </fieldset>
  );
}

export default Stars;
