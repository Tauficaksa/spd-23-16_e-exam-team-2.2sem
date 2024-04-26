import React from "react"
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import Alert from "../../../services/alert";
import Auth from "../../../services/Auth";
import { getAdminDetails } from "../../../redux/actions/loginAction";
import "./AddTeacher.css"
import axios from "axios";
import apis from "../../../services/Apis";

class AddTeacher extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name : "",
      email : "",
      password : "",
      confirmpassword : ""
    }
  }

  nameInputHandler = (event)=>{
    this.setState({
      ...this.state,
      name : event.target.value
    });
  }

  emailInputHandler = (event)=> {
    this.setState({
      ...this.state,
      email : event.target.value
    })
  }

  passwordInputHandler = (event)=> {
    this.setState({
      ...this.state,
      password : event.target.value
    })
  }

  confirmInputHandler = (event)=> {
    this.setState({
      ...this.state,
      confirmpassword : event.target.value
    })
  }
  
  handleSubmit= (event) => {
    event.preventDefault();
    if(this.state.confirmpassword !== this.state.password) {
      Alert('error','Invalid Input','Confirm Password does not match')  
    }
    console.log(this.state);
    axios.post(apis.BASE + apis.ADD_TEACHER, {
      username : this.state.name,
      email : this.state.email,
      password : this.state.password
    },{
      headers:{
        'Authorization':`Bearer ${Auth.retriveToken()}`
      }
    }).then(response => {
      console.log(response.data);
      if(response.data.success) {
        Alert('info','Success',response.data.message);
      } else {
        Alert('error','Failed',response.data.message);
      }
    })
  }

  render(){
    if(!Auth.retriveToken() || Auth.retriveToken()==='undefined'){
      return (<Navigate to='/'/>);
    } else if(!this.props.user.isLoggedIn) {
      this.props.getAdminDetails();
      return (<div></div>)
    }
    return (
      
      <form onSubmit={this.handleSubmit} className="form-class">
        <h2>Add Teacher</h2>
        <div>
          <label> Name </label>
          <br></br>
          <input type='Text' value={this.state.name} onChange={this.nameInputHandler} required/>
        </div>
        <br></br>
        <br></br>
        <div>
          <label> Email </label>
          <br></br>
          <input type='email' value={this.state.email} onChange={this.emailInputHandler} required/>
        </div>
        <br></br>
        <br></br>
        <div>
          <label> Password </label>
          <br></br>
          <input type='password' value={this.state.password} onChange={this.passwordInputHandler} required/>
        </div>
        <br></br>
        <br></br>
        <div>
          <label> Confirm Password </label>
          <br></br>
          <input type='password' value={this.state.confirmpassword} onChange={this.confirmInputHandler} required/>
        </div>
        <br></br>
        <br></br>
        <button className="button" type="submit"> Add Teacher</button>
        <br></br>
        <br></br>
        <button className="button"> <Link className="linkbtn" to='/home'>back</Link></button>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  user:state.user
});

export default connect(mapStateToProps,{
  getAdminDetails
})(AddTeacher);