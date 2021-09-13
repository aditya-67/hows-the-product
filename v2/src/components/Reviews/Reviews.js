import React from "react";
import { Col, Row } from "reactstrap";
import Stars from "../Stars/Stars";

function Reviews({ reviews }) {
  return (
    <Row className="d-flex">
      <Col md="12">
        <h4 className="text-left mb-4" style={{ textAlign: "left" }}>
          Reviews
        </h4>
        {/* Loop through all the reviews */}
        {reviews.map((element, index) => {
          return (
            <div className="single-review text-left d-flex align-items-center">
              {/* Display rating for each review */}
              <Stars
                type="display-review"
                rating={"rating" + element.rating * 2 + "-" + element.id}
                reviewNumber={element.id}
              />
              {/* Display review text for each review */}
              <h6 style={{ marginLeft: "20px" }}>
                {element.rating} out 5, {element.review}
              </h6>
            </div>
          );
        })}
      </Col>
    </Row>
  );
}

export default Reviews;
