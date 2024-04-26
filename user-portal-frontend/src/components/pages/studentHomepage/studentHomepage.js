import React from "react";
import { connect } from "react-redux";
import LogoutButton from "../../atoms/LogoutButton/LogoutButton";
import Auth from "../../../helper/Auth";
import { Navigate } from "react-router-dom";
import { getUserDetails } from "../../../redux/actions/loginAction";
import { Typography, withStyles, AppBar, Toolbar, Button } from "@material-ui/core";
import AlertBox from '../../atoms/Alertbox/AlertBox';
import TestDetailsStudent from "../../templates/TestDetails/TestDetailsStudent";
import UpcomingStudentTestsDetails from "../../templates/TestDetails/UpcomingStudentTestsDetails";
import CompletedTestsDetailsStudent from "../../templates/TestDetails/CompletedTestsDetailsStudent";

const appbarHeight = 64;

const useStyles = (theme) => ({
  appbar: {
    height: appbarHeight,
    background: 'red',
  },
  title: {
    flexGrow: 1,
  },
  menuItem: {
    marginRight: theme.spacing(2),
    color: '#ffffff',
  },
});

class StudentHomepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: (<div>Welcome to Exam portal</div>),
      menuList: [{
        title: 'Home',
        content: (<div>Welcome to Exam portal</div>)
      }, {
        title: 'View All tests',
        content: <TestDetailsStudent />
      }, {
        title: 'Upcoming Tests',
        content: <UpcomingStudentTestsDetails />
      }, {
        title: 'Completed Tests',
        content: <CompletedTestsDetailsStudent />
      }]
    }
  }

  onMenuItemClick(content) {
    this.setState({
      ...this.state,
      content: content
    })
  }

  render() {
    if (!Auth.retriveToken() || Auth.retriveToken() === 'undefined') {
      return (<Navigate to='/' />);
    } else if (!this.props.user.isLoggedIn) {
      this.props.getUserDetails();
      return (<div></div>);
    } else if (this.props.user.userDetails.type !== 'STUDENT') {
      return (<Navigate to='/' />);
    }
    const { classes } = this.props;
    return (
      <div>
        <AppBar
          elevation={0}
          position="fixed"
          className={classes.appbar}
        >
          <Toolbar>
            <Typography variant='h6' className={classes.title}>
              Student Homepage
            </Typography>
            {this.state.menuList.map((item, index) => (
              <Button key={index} className={classes.menuItem} onClick={() => this.onMenuItemClick(item.content)}>
                {item.title}
              </Button>
            ))}
            <LogoutButton />
          </Toolbar>
        </AppBar>
        <div style={{ paddingTop: appbarHeight }}>
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

export default withStyles(useStyles)(connect(mapStatetoProps, {
  getUserDetails
})(StudentHomepage)); 
