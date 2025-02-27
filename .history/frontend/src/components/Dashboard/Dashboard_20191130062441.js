import React from 'react';
import SideNav from '../SideNav/SideNav';
import Collapsible from 'react-collapsible';
import { Line, Circle } from 'rc-progress';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';
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
  Table
} from "reactstrap";

import DashboardButtonCard from "../DashboardButtonCard/DashboardButtonCard";
import DashboardPictureCard from "../DashboardPictureCard/DashboardPictureCard";
import DashboardExtraInsight from "../DashboardExtraInsight/DashboardExtraInsight";

import MyNavbar from "../Navbars/MyNavbar";
import Footer from "../Footer/Footer";



class Dashboard extends React.Component {

  constructor() {
    super();
  }

  render(){
    return (
<>
  <MyNavbar />
  <div className= "header-image"/>
  <Container>
    <Row>
      <Col className="text-center">
        <h1 className="title text-danger">GoSAT Dashboard</h1>
        <h3 className="title d-none d-sm-block">
          Get in-depth details and fine tune your dream here.
        </h3>
        <hr className="line-success hr-center"/>
      </Col>
    </Row>
    <Row>
      <DashboardPictureCard
        title={"UC Irvine"}
        imagePath={require("../../assets/img/uc-irvine.jpg")}
        chancePercentage={75}
        acceptance={75}
      />
      <DashboardPictureCard
        title={"UC Los Angeles"}
        imagePath={require("../../assets/img/uc-la.jpg")}
        chancePercentage={67}
        acceptance={42}
      />
      <DashboardPictureCard
        title={"UC Berkeley"}
        imagePath={require("../../assets/img/uc-berkeley.jpg")}
        chancePercentage={34}
        acceptance={12}
      />
    </Row>
    <Row>
      <Col>
        <Table responsive>
          <thead>
            <tr>
            <th> # </th>
            <th> University Name </th>
            <th> Your Chance of admit </th>
            <th> Acceptance Rate </th>
          </tr>
          </thead>
          <tbody>
            <tr>
              <td>4</td>
              <td>UC Merced</td>
              <td>45 %</td>
              <td>45 %</td>
            </tr>
            <tr>
              <td>5</td>
              <td>UC Santa Cruz</td>
              <td>45 %</td>
              <td>45 %</td>
            </tr>
            <tr>
              <td>6</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>7</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>8</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>9</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </Row>
    <Row>
      <Col>
        <h1 className="title text-center">Current Scores</h1>
        <hr className="line-success hr-center"/>
      </Col>
    </Row>
    <Row>
      <DashboardButtonCard title = "3.6" bodyText="GPA" buttonText="Update"/>
      <DashboardButtonCard title = "1462" bodyText="SAT" buttonText="Update"/>
      <DashboardButtonCard title = "32" bodyText="ACT" buttonText="Update"/>
      <DashboardButtonCard title = "12" bodyText="A-G courses" buttonText="Update"/>
      <DashboardButtonCard title = "5" bodyText="H courses" buttonText="Update"/>
    </Row>
    <Row>
      <DashboardExtraInsight />
    </Row>
  </Container>
<Footer/>
</>

  );
  }
}
const mapStateToProps = (state) => {
  const {univList, isLoggedIn, emailId} = state.app;
  return {univList , isLoggedIn , emailId};
}

const mapDispatchToProps = (dispatch) => {
  return {
      updateProfileDetailsSuccessDispatch: (payload) => { dispatch(onUpdateProfileDetailsSuccess(payload)) },
      updateProfileDetailsFailureDispatch: () => { dispatch(onUpdateProfileDetailsFailure()) },
      mlPredictionSuccessDispatch : (payload) => { dispatch(onMLPredictionSuccess(payload))},
      mlPredictionFailureDispatch : () => { dispatch(onMLPredictionFailure())}
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
