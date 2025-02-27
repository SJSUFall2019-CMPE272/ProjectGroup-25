import React,{useState} from 'react';

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  ListGroupItem,
  ListGroup,
  Container,
  Row,
  Col,
  Collapse
} from "reactstrap";
import {connect} from 'react-redux';
import RecommendationCard from "./../RecommendationCard/RecommendationCard"


const RecommendationsCardCarousal = (props) => {
  const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

return(
  <>
<br/>
<Container>

  <Row>
<Col>
  <Card className="card-plain">
    <h2>{props.inputs.title}</h2>
  <Row>
    <RecommendationCard uni={this.props.results[0]} />
    <RecommendationCard uni={this.props.results[1]} />
    <RecommendationCard uni={this.props.results[2]}/>
    <Collapse isOpen={isOpen}>
    <RecommendationCard uni={this.props.results[3]}/>
    <RecommendationCard uni={this.props.results[4]} />
    <RecommendationCard uni={this.props.results[5]} />
    <RecommendationCard uni={this.props.results[6]} />
    <RecommendationCard uni={this.props.results[7]}/>
    <RecommendationCard uni={this.props.results[8]}/>
    </Collapse>
  </Row>
  <Row>
    <Col className="text-right">

    <Button className="btn-round" color="primary" size="lg" onClick={toggle}>
      See More <i className="fas fa-arrow-right"/>
    </Button>
  </Col>
  </Row>

</Card>
</Col>
</Row>
</Container>

</>
);
}

const mapStateToProps = (state) => {
  const { results} = state.results;
  return {results};

}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecommendationsCardCarousal);