import React from 'react';
import pic from '../../constants/no-dp.png';
import {
    Card, CardBody,
    CardTitle, Button, FormGroup
} from 'reactstrap';
class Profile extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <div class="jumbotron jumbotron-fluid">
                    <div class="container">
                        <img src={pic}></img>
                        <div>
                            Mark Stinson
                    </div>
                    </div>
                </div>
                <Card>
                    <CardBody>
                        <CardTitle>Your Details</CardTitle>
                            <div>
                            <br/>
                                First Name :
                            </div>
                            <br/>
                            <div>
                                Last Name :
                            </div>
                            <br/>
                            <div>
                                Email :
                            </div>
                            <br/>
                            <div>
                                Phone Number :
                            </div>
                            <br/>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

export default Profile;