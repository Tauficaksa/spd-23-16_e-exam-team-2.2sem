import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { registerStudentAction } from "../../../redux/actions/registerStudentAction";
import { connect } from "react-redux";
import { setAlert } from "../../../redux/actions/alertAction";

const useStyles = ()=>({

  inputfield: {
    display: 'block',
    margin: '20px',
    color: 'white', // Change font color to white
    '& .MuiInputLabel-root': {
      color: 'white', // Change font color to white for input labels
    },
  },
  btn : {
    margin : '0px 40px',
    color: 'white',
    backgroundColor: 'lightgreen', // Change button background color to lightgreen
    '&:hover': {
      backgroundColor: 'green', // Change button background color on hover
    },
    
    
  },
  formClass : {
    margin:'20px',
    display: 'inline-block',
    textAlign : 'center',
    border : '1px solid black',
    borderRadius: '10px',
    padding : '20px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    
    // background: 'linear-gradient(to right, rgb(46, 148, 181), aliceblue)',
    // background: 'linear-gradient(to bottom right, #ffffff, #f0f0f0)',

    transition: 'box-shadow 0.3s ease', // Add transition for smooth effect
    '&:hover': {
      boxShadow: '15px 15px 10px rgba(0, 0, 0, 0.5)', // Apply box shadow on hover
    },

    color: 'white',

    

    
  },

  // main: {
  //   backgroundImage: 'linear-gradient(to right, rgb(46, 148, 181), aliceblue)', // Gradient background
  //   minHeight: '100vh', // Set a minimum height to cover the whole viewport
  //   display: 'flex',
  //   justifyContent: 'center', // Center content horizontally
  //   alignItems: 'center', // Center content vertically
  //   margin: 0,
  //   padding: 0,
  //   position: 'fixed',
  //   top: 0,
  //   left: 0,
  //   height: '100vh',
  //   width: '100vw',
    
  //   zindex: -1,

  // },
  formTitle:{
    fontSize: '1.7em',
    color: 'lightgreen',
  },

  
  
})

class StudentRegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username : "",
      email : "",
      password : "",
      confirmPassword : ""
    }
  }

  usernameInputHandler = (event) => {
    this.setState({
      ...this.state,
      username : event.target.value
    });
  }

  emailInputHandler = (event) => {
    this.setState({
      ...this.state,
      email : event.target.value
    });
  }

  passwordInputHandler = (event) => {
    this.setState({
      ...this.state,
      password : event.target.value
    });
  }

  confirmpasswordInputHandler = (event) => {
    this.setState({
      ...this.state,
      confirmPassword : event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if(this.state.confirmPassword !== this.state.password) {
      this.props.setAlert({
        isAlert:false,
        type:"error",
        title:'Invalid Input',
        message : 'Confirm Password does not match',
      })  
      return;
    }
    this.props.registerStudentAction({
      username : this.state.username,
      email : this.state.email,
      password : this.state.password
    });
  }

  render() {
    return (
      <div className={this.props.classes.main}>

      
      <form className={this.props.classes.formClass} onSubmit={(event)=>(this.handleSubmit(event))}>
        <div className={this.props.classes.formTitle} color="primary">Register</div>
        <TextField
          variant='outlined'
          color="primary"
          className={this.props.classes.inputfield}
          label="Username"
          placeholder='enter username'
          type='text'
          error_text=''
          value={this.state.username}
          onChange={(event)=>(this.usernameInputHandler(event))}
          required
        />
        <TextField
          variant='outlined'
          color="primary"
          className={this.props.classes.inputfield}
          label="Email"
          placeholder='enter email'
          type='email'
          error_text=''
          value={this.state.email}
          onChange={(event)=>(this.emailInputHandler(event))}
          required
        />
        <TextField
          variant='outlined'
          color="primary"
          label="Password"
          className={this.props.classes.inputfield}
          placeholder='enter password'
          type='password'
          error_text=''
          value={this.state.password}
          onChange={(event)=>(this.passwordInputHandler(event))}
          required
        />
        <TextField
          variant='outlined'
          color="primary"
          label="Confirm Password"
          className={this.props.classes.inputfield}
          placeholder='enter password again'
          type='password'
          error_text=''
          value={this.state.confirmPassword}
          onChange={(event)=>(this.confirmpasswordInputHandler(event))}
          required
        />
        <Button 
          variant='contained'
          color="primary"
          type='submit'
          className={this.props.classes.btn}
        >
          Register
        </Button>
      </form>
      </div>
    )
  }
}

const mapStatetoProps = state => ({

})

export default withStyles(useStyles)(connect(mapStatetoProps,{
  registerStudentAction,
  setAlert
})(StudentRegisterForm));