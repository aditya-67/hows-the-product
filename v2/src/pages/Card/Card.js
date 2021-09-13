import React, { useEffect, useState } from "react";
import { Card, CardBody, Button, Row, Col, Spinner } from "reactstrap";

import "./Card.css";
import Stars from "../../components/Stars/Stars";
import Reviews from "../../components/Reviews/Reviews";
import ReviewModal from "../../components/Modal/Modal";
import { getReviews } from "../../api/getReviews";

import io from "socket.io-client";

// Create socket connection to backend
let socket = io(process.env.REACT_APP_API_URL, {
  reconnect: true,
  transports: ["websocket"],
});

function ReviewCard() {
  const [showModal, setShowModal] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    // Listen for events from backend
    socket.on("send-review", (data) => {
      setReviews((reviews) => [...reviews, data]);
    });
    fetchReviews();
    return () => socket.disconnect();
  }, []);

  // Update avg. rating of product based on all ratings
  useEffect(() => {
    let avg = reviews.reduce(function (sum, current) {
      return sum + current.rating;
    }, 0);
    setAvgRating((avg / reviews.length).toFixed(1));
  }, [reviews]);

  // Fetch all reviews
  const fetchReviews = () => {
    getReviews()
      .then((data) => {
        if (data.length !== 0) {
          setReviews(data);
        }
        setLoader(false);
      })
      .catch((err) => console.log(err));
  };

  const toggle = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Card>
        <CardBody>
          <Row mb="4" className="d-flex">
            <Col md="12">
              <h1>This is the product</h1>
            </Col>
          </Row>
          {loader ? (
            <Spinner color="primary" children="" />
          ) : (
            <Row className="justify-content-between d-flex wait-until-load">
              <Col md="6" className="d-flex flex-column">
                <div className="d-inline-flex rating-box align-items-center">
                  {/* Avg. Rating */}
                  <h1 style={{ marginRight: "15px" }}>{avgRating}</h1>
                  {/* Stars for avg. rating */}
                  <Stars
                    type="display"
                    rating={"rating" + Math.round(avgRating * 2) + "-display"}
                  />
                </div>
              </Col>
              <Col
                md="3"
                className="d-flex flex-column align-items-center justify-content-center"
              >
                <Button
                  outline
                  color="primary"
                  onClick={() => setShowModal(true)}
                >
                  Add Review
                </Button>
              </Col>
            </Row>
          )}
          <hr />
          {/* REVIEWS */}
          <Reviews reviews={reviews} />
        </CardBody>
      </Card>
      {/* MODAL */}
      <ReviewModal modal={showModal} toggle={toggle} socket={socket} />
    </>
  );
}

export default ReviewCard;
