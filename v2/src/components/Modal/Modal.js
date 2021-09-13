import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { InputGroup, Input } from "reactstrap";
import { postReview } from "../../api/postReview";
import Stars from "../Stars/Stars";

const ReviewModal = ({ modal, toggle, socket }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  useEffect(() => {
    setReview("");
    setRating(0);
  }, [modal]);

  const reviewChange = (e) => {
    setReview(e.target.value);
  };
  const passRatingToModal = (rating) => {
    setRating(rating);
  };

  // Post review from modal
  const submitReview = () => {
    let data = { review: review, rating: rating / 2 };
    postReview(data)
      .then((response) => {
        // Send event to backed with the data posted
        socket.emit("received-review", data);
        toggle();
      })
      .catch((err) => console.log(err));
  };
  return (
    <Modal isOpen={modal} fade={false}>
      <ModalHeader>What's your rating?</ModalHeader>
      <ModalBody>
        <h4>Rating</h4>
        <Stars type="edit" passRatingToModal={passRatingToModal} />
        <h4>Review</h4>
        <InputGroup>
          <Input placeholder="Write a review" onChange={reviewChange} />
        </InputGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Close
        </Button>
        <Button color="primary" onClick={submitReview} disabled={!review}>
          Submit Review
        </Button>{" "}
      </ModalFooter>
    </Modal>
  );
};

export default ReviewModal;
