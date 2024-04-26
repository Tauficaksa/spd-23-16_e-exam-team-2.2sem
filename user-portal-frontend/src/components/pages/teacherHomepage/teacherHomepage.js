import React from "react";
import { connect } from "react-redux";
import LogoutButton from "../../atoms/LogoutButton/LogoutButton";
import Auth from "../../../helper/Auth";
import { Navigate } from "react-router-dom";
import { getUserDetails} from "../../../redux/actions/loginAction";
import AddQuestionForm from "../../templates/AddQuestionForm/AddQuestionForm";
import AlertBox from '../../atoms/Alertbox/AlertBox';
import { AppBar, Toolbar, Typography, withStyles, Button } from "@material-ui/core";
import QuestionDetails from "../../templates/QuestionDetails/questionDetails";
import CreateTestForm from "../../templates/CreateTestForm/CreateTestForm";
import TestDetails from "../../templates/TestDetails/TestDetails";

const appbarHeight = 64;

const useStyles = (theme)=>({
  appbar: {
    height: appbarHeight,
    background: 'red',
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    marginLeft: theme.spacing(2),
  },
  menuItem: {
    marginLeft: theme.spacing(2),
  },
});

class TeacherHomepage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      content: (<div>Welcome to Exam portal</div>),
    };
  }

  handleMenuItemClick = (content) => {
    this.setState({
      content: content
    });
  }

  render(){
    const { classes } = this.props;

    if(!Auth.retriveToken() || Auth.retriveToken()==='undefined'){
      return (<Navigate to='/'/>);
    } else if(!this.props.user.isLoggedIn) {
      this.props.getUserDetails();
      return (<div></div>);
    } else if(this.props.user.userDetails.type !== 'TEACHER') {
      return (<Navigate to='/'/>);
    }

    return(
      <div>
        <AppBar
          elevation={0}
          className={classes.appbar}
        >
          <Toolbar className={classes.flex}>
            <Typography variant='h5' className={classes.title}>
              Teacher Homepage
            </Typography>
            <div>
              <Button color="inherit" className={classes.menuItem} onClick={() => this.handleMenuItemClick(<AddQuestionForm />)}>Add Question</Button>
              <Button color="inherit" className={classes.menuItem} onClick={() => this.handleMenuItemClick(<QuestionDetails />)}>Questions</Button>
              <Button color="inherit" className={classes.menuItem} onClick={() => this.handleMenuItemClick(<CreateTestForm />)}>Create Test</Button>
              <Button color="inherit" className={classes.menuItem} onClick={() => this.handleMenuItemClick(<TestDetails />)}>View Tests</Button>
              <LogoutButton />
            </div>
          </Toolbar>
        </AppBar>
        <div className={classes.content}>
          <AlertBox />
          {this.state.content}
        </div>
      </div>
    )
  }
}

const mapStatetoProps = state => ({
  user: state.user
})

export default withStyles(useStyles)(connect(mapStatetoProps,{
  getUserDetails
})(TeacherHomepage));
