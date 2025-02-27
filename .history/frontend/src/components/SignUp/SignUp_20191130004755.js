import React from 'react';
import {
  Card, CardBody,
  CardTitle, Button, FormGroup
} from 'reactstrap';
import { AvForm, AvField,} from 'availity-reactstrap-validation';
import { FB_APP_ID, GOOGLE_CLIENT_ID } from '../../constants/constants';
import {baseURL} from './../../config/config'
import GoogleLogin from 'react-google-login';
import { onSignUpFailure, onSignUpSuccess} from './../../redux/actions/actions'
import FacebookLogin from 'react-facebook-login';
var md5 = require('md5');

class SignUp extends React.Component {

  constructor() {
    super();
    this.state = {
      emailId: null,
      password: null,
      firstName: null,
      lastName: "",
      displayPic: null,
      phone: null
    }
    this.signUp = this.signUp.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  responseGoogle = (response) => {
    console.log(response);
    var fname = response.profileObj.givenName.split(" ")[0];
    var lname = response.profileObj.givenName.split(" ")[1];
    this.setState({
      emailId : response.profileObj.email ,
      password : response.goodleId,
      firstName : fname,
      lastName : lname})
      this.signUp();
  }

  responseFacebook = (response,event) => {
    console.log(response);
    this.setState({emailId : response.email , password : response.id , firstName : response.name});
    this.signUp(event);
  }
  

  signUp(e) {
    if(e)
    e.preventDefault();
    var data = {
      "emailId" : this.state.emailId,
      "password" : this.state.password,
      "firstName" : this.state.firstName,
      "lastName" : this.state.lastName
    }
    fetch(baseURL+'/api/auth/signUp', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data)
    })
      .then((response) => {
        return response.json();
      }).then((jsonRes) => {
        if (jsonRes.success == false) {
          console.log("Couldnt signUp");
          this.props.signUpFailureDispatch();
        } else {
            this.props.signUpSuccessDispatch();
            this.props.history.push("/login");
        }
      })
  }

  handleInvalidSubmit = (event, errors, values) => {
    this.setState({ email: values.email, error: true });
  }

  changeHandler = (event) => {
    let key = event.target.name;
    let value = event.target.value;
    this.setState({ [key]: value });
  }

  handlePasswordChange = (event) => {
    var pword = md5(event.target.value);
    this.setState({ password: pword });
  }


  render() {
    return <div className="container">
      <Card>
        <CardBody>
          <CardTitle><h3>Sign up for a GoSAT account!</h3></CardTitle>
          <AvForm onInvalidSubmit={this.handleInvalidSubmit} onValidSubmit={this.signUp}>
            <FormGroup>
              <AvField type="text" label="First Name:" name="firstName" id="firstName" onChange={this.changeHandler} placeholder="name" required />
            </FormGroup>
            <FormGroup>
              <AvField type="text" name="lastName" label="Last Name:" id="lastName" onChange={this.changeHandler} placeholder="name" required />
            </FormGroup>
            <FormGroup>
              <AvField type="email" name="emailId" id="emailId" label="Email:" onChange={this.changeHandler} placeholder="email" required />
            </FormGroup>
            <FormGroup>
              <AvField type="password" name="password" id="password" label="Password:" onChange={this.handlePasswordChange} placeholder="password" required />
            </FormGroup>
            <Button type="submit" >Submit</Button>
          </AvForm>
          <FacebookLogin
              appId= {FB_APP_ID}
              fields="name,email,picture"
              callback={this.responseFacebook}
              icon="fa-facebook"
            />
            <GoogleLogin 
              clientId= {GOOGLE_CLIENT_ID}
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
            />
        </CardBody>
      </Card>
    </div>
  }
}

const mapStateToProps = (state) => {
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginSuccessDispatch: () => { dispatch(onSignUpSuccess()) },
    loginFailureDispatch: () => { dispatch(onSignUpFailure()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);