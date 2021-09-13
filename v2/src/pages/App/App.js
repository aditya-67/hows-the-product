import "./App.css";
import ReviewCard from "../Card/Card";
import { Container, Row, Col } from "reactstrap";

function App() {
  return (
    <Container className="themed-container px-1 py-5 mx-auto" fluid={true}>
      <Row className="justify-content-center">
        <Col xl="7" lg="8" md="10" className="text-center mb-5">
          <ReviewCard />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
