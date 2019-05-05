import React, { Component } from 'react';
import {Redirect} from "react-router";
import cookie from "react-cookies";
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Layout, Container, Grid, Row, Col, Modal, ModalFooter, Button, Form, ModalBody, ModalTitle} from 'react-bootstrap';
import Navigationbar from '../navbar/Navigationbar'
import user_img from "../../resources/images/user.png"
import "../../resources/css/profile.css"
import Feed from '../feed/Feed'
import * as actions from '../../actions/profileActions';
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css';
import ModalHeader from 'react-bootstrap/ModalHeader';

class Profile extends Component {

  constructor(props){
    super(props)

    this.state={
     profile_options: ["Profile", "Questions", "Answers", "Following", "Followers", "Activity"],
     years: [1990,1991,1992,1993,1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
     selectedTab: "Profile",
     userDetails: {},
     firstName: "",
     lastName: "",
     show: false,
     show1: false,
     show2: false,
     show3: false,
     show4: false,
     image_file: "",
     position: "",
     company: "",
     careerStart: "",
     careerEnd: "",
     currentCompany: "off",
     school: "",
     concentration: "",
     secConcentration: "",
     degree: "",
     gradYear: "",
     address: "",
     city: "",
     locState: "",
     zipcode: "",
     locStart: "",
     locEnd: "",
     currentLocation: "off",
     hideEditor: true,
     hideEditorName: true,
     aboutMe: "",
     hideCareer: true,
     hideEducation: true,
     hideAddress: true,
     career: "",
     education: "",
     address: "",
     credentials: "",
    }

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow1 = this.handleShow1.bind(this);
    this.handleClose1 = this.handleClose1.bind(this);
    this.handleShow2 = this.handleShow2.bind(this);
    this.handleClose2 = this.handleClose2.bind(this);
    this.handleShow3 = this.handleShow3.bind(this);
    this.handleClose3 = this.handleClose3.bind(this);
    this.handleShow4 = this.handleShow4.bind(this);
    this.handleClose4 = this.handleClose4.bind(this);
    this.fileChange = this.fileChange.bind(this);
    this.saveCredentialsInternal = this.saveCredentialsInternal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeFN = this.handleChangeFN.bind(this);
    this.handleChangeLN = this.handleChangeLN.bind(this);
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleClose1() {
    this.setState({ show1: false });
  }

  handleShow1() {
    this.setState({ show1: true });
  }

  handleClose2() {
    this.setState({ show2: false });
  }

  handleShow2() {
    this.setState({ show2: true });
  }

  handleClose3() {
    this.setState({ show3: false });
  }

  handleShow3() {
    this.setState({ show3: true });
  }

  handleClose4() {
    this.setState({ show4: false });
  }

  handleShow4() {
    this.setState({ show4: true });
  }

  fileChange(event){
    this.setState({image_file: event.target.files});
  }

  componentDidMount(){
      console.log('id is:');
      console.log(cookie.load('cookie').id);
      this.props.getUserDetails(cookie.load('cookie').id)
  }

  componentWillReceiveProps(newProps){
      this.setState({
          aboutMe: newProps.aboutMe,
          firstName: newProps.firstName,
          lastName: newProps.lastName,
        //   credentials: newProps.credentials,
        //   career: newProps.career,
        //   education: newProps.credentials.education,
        //   location: newProps.credentials.location,
      })
  }
  onChangePosition(e){
      this.setState({position: e.target.value})
  }

  onChangeCompany(e){
      this.setState({company: e.target.value})
  }

  onChangeCareerStart(e){
      console.log(typeof(e.target.value));
      this.setState({careerStart: e.target.value})
  }

  onChangeCareerEnd(e){
      console.log(typeof(e.target.value));
      this.setState({careerEnd: e.target.value})
  }

  onChangeCurrentCompany(e){
      this.setState({currentCompany: e.target.value})
  }

  onChangeSchool(e){
      this.setState({school: e.target.value})
  }

  onChangeConcentration(e){
      this.setState({concentration: e.target.value})
  }

  onChangeSecConcentration(e){
      this.setState({secConcentration: e.target.value})
  }

  onChangeDegree(e){
      this.setState({degree: e.target.value})
  }

  onChangeGradYear(e){
      this.setState({gradYear: e.target.value})
  }

  onChangeAddress(e){
      this.setState({address: e.target.value})
  }

  onChangeCity(e){
      this.setState({city: e.target.value})
  }

  onChangeState(e){
      this.setState({locState: e.target.value})
  }
  
  onChangeZipcode(e){
      this.setState({zipcode: e.target.value})
  }

  onChangeLocationStart(e){
      this.setState({locStart: e.target.value})
  }

  onChangeLocationEnd(e){
      this.setState({locEnd: e.target.value})
  }

  onChangeCurrentLocation(e){
      this.setState({currentLocation: e.target.value})
  }

  handleChange(e) {
    this.setState({ aboutMe: e.target.value })
  }

  handleChangeFN(e){
      this.setState({
          firstName: e.target.value
      })
  }

  handleChangeLN(e){
      this.setState({
          lastName: e.target.value
      })
  }

  saveCredentialsInternal(type){
      this.props.saveCredentials(cookie.load('cookie').id, type, this.state.position, this.state.company, this.state.careerStart, this.state.careerEnd, this.state.currentCompany,
      this.state.school, this.state.concentration, this.state.secConcentration, this.state.degree, this.state.gradYear,
      this.state.address, this.state.city, this.state.locState, this.state.zipcode, this.state.locStart, this.state.locEnd, this.state.currentLocation
      )
  }
  render() {
    return(
        <div>
            <div>
                <Navigationbar></Navigationbar>
            </div>
            <Container id="profile_body">
                <Row id="profile_body_row">
                    <Col xs={9}>
                        <Row id="profile_main">
                            <Col id="user_image_col" xs={3}>
                                <div>
                                    <span><img id="user_image" src={user_img}></img><div onClick={this.handleShow}>Add Photo</div></span>
                                </div>
                                <Modal show={this.state.show} onHide={this.handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Add Profile Photo</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body><input type="file" onChange={this.fileChange}></input></Modal.Body>
                                    <ModalFooter>
                                        <Button onClick ={() => {this.props.saveProfilePicture(this.props.userDetails._id, this.state.image_file)}}>Save</Button>
                                    </ModalFooter>
                                </Modal>
                            </Col>
                            <Col xs={9}>
                                <div>
                                    <span hidden={!this.state.hideEditorName}>{this.props.userDetails.firstName} {this.props.userDetails.lastName}</span>
                                    <input type="text" hidden={this.state.hideEditorName} value={this.state.firstName} onChange={this.handleChangeFN}></input>
                                    <input type="text" hidden={this.state.hideEditorName} value={this.state.lastName} onChange={this.handleChangeLN}></input>
                                    {/* <h3>{this.props.userDetails.firstName} {this.props.userDetails.lastName}</h3> */}
                                    <button hidden={this.state.hideEditorName} onClick={() => this.setState({hideEditorName: true})}>Cancel</button>
                                    <button hidden={this.state.hideEditorName} onClick={this.props.saveName(this.state.firstName, this.state.lastName, cookie.load('cookie').id)}>Update</button>
                                    <button hidden={!this.state.hideEditorName} onClick={() => this.setState({hideEditorName: false})}>Edit</button>
                                    <p hidden={!this.state.hideEditor}>{this.props.userDetails.aboutMe ? this.props.userDetails.aboutMe : <a onClick={() => this.setState({hideEditor: false})}>Write a description about yourself</a>}</p>
                                    <span>{this.props.userDetails.aboutMe ? <button onClick={() => this.setState({hideEditor: false})}>Edit</button> : ""}</span>
                                    <div>
                                        <input type="text" value={this.state.aboutMe} onChange={this.handleChange} hidden={this.state.hideEditor}/>
                                        <button onClick={() => this.setState({hideEditor: true})} hidden={this.state.hideEditor}>Cancel</button>
                                        <button type="button" hidden={this.state.hideEditor} onClick={this.props.saveAboutMe(cookie.load('cookie').id, this.state.aboutMe)}>Update</button>
                                    </div>
                                    <p>{this.props && this.props.followers ? (this.props.followers).length : 0} followers</p>
                                </div>
                            </Col>
                        </Row>
                        <Row id="profile_details">
                            <Col id="list_of_actions" xs={3}>
                                <div id="feeds_title">
                                    <h6>Feeds</h6>
                                </div>
                                <div id="feeds_options">
                                    {
                                        this.state.profile_options.map((option,index) => {
                                            return <div  onClick={() => {
                                                this.setState({selectedTab : option})
                                            }} className="single-feeds-option" key={index}>
                                                <span>{option}</span>
                                            </div>
                                        })
                                    }
                                </div>
                            </Col>
                            <Col id="tab" xs={9}>
                                <div>
                                    {
                                        this.state.selectedTab === "Profile" ?
                                            <div>
                                                <div className="tab_details">
                                                    <h6>{ this.state.selectedTab }</h6>
                                                </div>
                                                <Feed></Feed>
                                            </div>
                                            :
                                            <span></span>
                                    }
                                    {
                                        this.state.selectedTab === "Questions" ?
                                            <div>
                                                <div className="tab_details">
                                                    <h6>{ this.state.selectedTab }</h6>
                                                </div>
                                                <Feed></Feed>
                                            </div>
                                            :
                                            <span></span>
                                    }
                                    {
                                        this.state.selectedTab === "Answers" ?
                                            <div>
                                                <div className="tab_details">
                                                    <h6>{ this.state.selectedTab }</h6>
                                                </div>
                                                <Feed></Feed>
                                            </div>
                                            :
                                            <span></span>
                                    }
                                    {
                                        this.state.selectedTab === "Followers" ?
                                            <div>
                                                <div className="tab_details">
                                                    <h6>{this.props && this.props.followers ? (this.props.followers).length : 0} followers</h6>
                                                </div>
                                                <Feed></Feed>
                                            </div>
                                            :
                                            <span></span>
                                    }
                                    {
                                        this.state.selectedTab === "Following" ?
                                            <div>
                                                <div className="tab_details">
                                                    <h6>{this.props && this.props.following ? (this.props.following).length : 0} following</h6>
                                                </div>
                                                <Feed></Feed>
                                            </div>
                                            :
                                            <span></span>
                                    }
                                    {
                                        this.state.selectedTab === "Activity" ?
                                            <div>
                                                <div className="tab_details">
                                                    <h6>{ this.state.selectedTab }</h6>
                                                </div>
                                                
                                            </div>
                                            :
                                            <span></span>
                                    }
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={3} id="credentials_languages">
                        <Row id="credentials">
                            <div id="credentials_title">
                                <h6 >Credentials & Highlights</h6>
                                <button onClick={this.handleShow4}>Edit</button>
                                <Modal show={this.state.show4} onHide={this.handleClose4}>
                                    <ModalHeader closeButton><ModalTitle>Edit Credentials</ModalTitle></ModalHeader>
                                    <ModalBody>
                                        <a>Add Credentials</a>
                                        <ul>
                                        {
                                            this.props.userDetails.credentials && this.props.userDetails.credentials.career ? this.props.userDetails.credentials.career.map((career, index) => {
                                               return(
                                                   <div>
                                                    <li>{career.position}</li>
                                                    <button onClick={() => this.setState({hideCareer: false})} hidden={!this.state.hideCareer}>Edit</button>
                                                    <div hidden={this.state.hideCareer}>
                                                        <input type="text" value={this.props.userDetails.credentials.career[index].position}></input>
                                                        <input type="text" value={this.props.userDetails.credentials.career[index].company}></input>
                                                        <input type="select" value={this.props.userDetails.credentials.career[index].startDate}></input>
                                                        <input type="select" value={this.props.userDetails.credentials.career[index].endDate}></input>
                                                        <input type="checkbox" value={this.props.userDetails.credentials.career[index].isCurrent}></input>
                                                        <button>Save</button>
                                                    </div>
                                                    </div>
                                               )  
                                            }) : ""
                                        }
                                        {
                                            this.props.userDetails.credentials && this.props.userDetails.credentials.education ? this.props.userDetails.credentials.education.map((education, index) => {
                                               return(
                                                    <li>{education.school}</li>
                                               )  
                                            }) : ""
                                        }
                                        {
                                            this.props.userDetails.credentials && this.props.userDetails.credentials.location ? this.props.userDetails.credentials.location.map((location, index) => {
                                               return(
                                                    <li>{location.address}</li>
                                               )  
                                            }) : ""
                                        }
                                        </ul>
                                    </ModalBody>
                                </Modal>
                            </div>
                            <ul>
                                {
                                    this.props.userDetails.credentials && this.props.userDetails.credentials.career && this.props.userDetails.credentials.career[(this.props.userDetails.credentials.career.length)-1]? <p> Worked at {this.props.userDetails.credentials.career[(this.props.userDetails.credentials.career.length)-1].company} as a  {this.props.userDetails.credentials.career[(this.props.userDetails.credentials.career.length)-1].position}</p>: 
                                
                                <li onClick={this.handleShow1}><a>Add employment credential</a></li>
                                }
                                    <Modal show={this.state.show1} onHide={this.handleClose1}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Edit credentials</Modal.Title><br/>
                                            {/* <div><h6>Credentials also appear on answers you write</h6></div> */}
                                        </Modal.Header>
                                        <Modal.Body>
                                            <h6>Add employment detail</h6>
                                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                                <Form.Label>Position</Form.Label>
                                                <Form.Control as="textarea" rows="1" onChange={this.onChangePosition.bind(this)}/>
                                            </Form.Group>
                                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                                <Form.Label>Company</Form.Label>
                                                <Form.Control as="textarea" rows="1" onChange={this.onChangeCompany.bind(this)}/>
                                            </Form.Group>
                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                <Form.Label>Start Year</Form.Label>
                                                <Form.Control as="select" onChange={this.onChangeCareerStart.bind(this)}>
                                                {
                                                    this.state.years.map((year, index) => {
                                                        return(
                                                            <option>{year}</option>
                                                        )
                                                        
                                                    })
                                                }
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                <Form.Label>End Year</Form.Label>
                                                <Form.Control as="select" onChange={this.onChangeCareerEnd.bind(this)}>
                                                {
                                                    this.state.years.map((year, index) => {
                                                        return(
                                                            <option>{year}</option>
                                                        )
                                                        
                                                    })
                                                }
                                                </Form.Control>
                                            </Form.Group>
                                            <Form>
                                                <Form.Check 
                                                    label="I currently work here"
                                                    onSelect={this.onChangeCurrentCompany}
                                                />
                                            </Form>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={this.handleClose1}>
                                            Close
                                            </Button>
                                            <Button variant="primary" onClick={() => this.saveCredentialsInternal("employment")}>
                                            Save Changes
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                    {
                                    this.props.userDetails.credentials && this.props.userDetails.credentials.education && this.props.userDetails.credentials.education[(this.props.userDetails.credentials.education.length)-1]? <p> Studied at {this.props.userDetails.credentials.education[(this.props.userDetails.credentials.education.length)-1].school} </p>: 
                                
                                <li onClick={this.handleShow2}><a>Add education credential</a></li>
                                    }
                                    <Modal show={this.state.show2} onHide={this.handleClose2}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Edit credentials</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <h6>Add education detail</h6>
                                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                                <Form.Label>School</Form.Label>
                                                <Form.Control as="textarea" rows="1" onChange={this.onChangeSchool.bind(this)}/>
                                                <Form.Label>Concentration</Form.Label>
                                                <Form.Control as="textarea" rows="1" onChange={this.onChangeConcentration.bind(this)}/>
                                                <Form.Label>Secondary Concentration</Form.Label>
                                                <Form.Control as="textarea" rows="1" onChange={this.onChangeSecConcentration.bind(this)}/>
                                                <Form.Label>Degree Type</Form.Label>
                                                <Form.Control as="textarea" rows="1" onChange={this.onChangeDegree.bind(this)}/>
                                            </Form.Group>
                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                <Form.Label>Graduation Year</Form.Label>
                                                <Form.Control as="select" onChange={this.onChangeGradYear.bind(this)}>
                                                {
                                                    [...this.state.years, 2020, 2021, 2022, 2023].map((year, index) => {
                                                        return(
                                                            <option>{year}</option>
                                                        )
                                                        
                                                    })
                                                }
                                                </Form.Control>
                                            </Form.Group>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={this.handleClose2}>
                                            Close
                                            </Button>
                                            <Button variant="primary" onClick={() => this.saveCredentialsInternal("education")}>
                                            Save Changes
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                    {
                                    this.props.userDetails.credentials && this.props.userDetails.credentials.location && this.props.userDetails.credentials.location[(this.props.userDetails.credentials.location.length)-1]? <p> Lived at {this.props.userDetails.credentials.location[(this.props.userDetails.credentials.location.length)-1].address} </p>: 
                                
                                <li onClick={this.handleShow3}><a>Add a location credential</a></li>
                                    }
                                    <Modal show={this.state.show3} onHide={this.handleClose3}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Edit Credentials</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <h6>Add location detail</h6>
                                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                                <Form.Label>Address</Form.Label>
                                                <Form.Control as="textarea" rows="1" onChange={this.onChangeAddress.bind(this)}/>
                                                <Form.Label>City</Form.Label>
                                                <Form.Control as="textarea" rows="1" onChange={this.onChangeCity.bind(this)}/>
                                                <Form.Label>State</Form.Label>
                                                <Form.Control as="textarea" rows="1" onChange={this.onChangeState.bind(this)}/>
                                                <Form.Label>ZipCode</Form.Label>
                                                <Form.Control as="textarea" rows="1" onChange={this.onChangeZipcode.bind(this)}/>
                                            </Form.Group>
                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                <Form.Label>Start Year</Form.Label>
                                                <Form.Control as="select" onChange={this.onChangeLocationStart.bind(this)}>
                                                {
                                                    this.state.years.map((year, index) => {
                                                        return(
                                                            <option>{year}</option>
                                                        )
                                                        
                                                    })
                                                }
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                <Form.Label>End Year</Form.Label>
                                                <Form.Control as="select" onChange={this.onChangeLocationEnd.bind(this)}>
                                                {
                                                    this.state.years.map((year, index) => {
                                                        return(
                                                            <option>{year}</option>
                                                        )
                                                        
                                                    })
                                                }
                                                </Form.Control>
                                            </Form.Group>
                                            <Form>
                                                <Form.Check 
                                                    label="I currently live here"
                                                    onSelect={this.onChangeCurrentLocation.bind(this)}
                                                />
                                            </Form>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={this.handleClose3}>
                                            Close
                                            </Button>
                                            <Button variant="primary" onClick={() => this.saveCredentialsInternal("location")}>
                                            Save Changes
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                <li>Knows Hindi</li>
                            </ul>
                        </Row>
                        <Row id="languages">
                            <div id="languages_title">
                                <h6>Knows About</h6>
                            </div>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
  }
}

function mapStatetoProps(state) {
    return{
        userDetails: state.profile.userDetails,
        firstName: state.profile.userDetails.firstName,
        lastName: state.profile.userDetails.lastName,
        aboutMe: state.profile.userDetails.aboutMe,
    }
}

function mapDispatchToProps(dispatch) {
    
    return {
        getUserDetails: (user_id) => dispatch(actions.getUserDetails(user_id)),
        saveProfilePicture: (user_id, image_file) => dispatch(actions.saveProfilePicture(user_id, image_file)),
        saveCredentials: (id, type, position, company, careerStart, careerEnd, currentCompany,
      school, concentration, secConcentration, degree, gradYear, address, city, locState, zipcode, locStart, locEnd, currentLocation) => dispatch(actions.saveCredentials(id, type, position, company, careerStart, careerEnd, currentCompany,
      school, concentration, secConcentration, degree, gradYear, address, city, locState, zipcode, locStart, locEnd, currentLocation)),
        saveAboutMe: (user_id, text) => dispatch(actions.saveAboutMe(user_id, text)),
        saveName: (firstName, lastName, user_id) => dispatch(actions.saveAboutMe(firstName, lastName, user_id)),
    };
}

export default connect(mapStatetoProps,mapDispatchToProps)(Profile);

