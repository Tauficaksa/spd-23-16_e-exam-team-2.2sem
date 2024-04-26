import { withStyles} from "@material-ui/core/styles";
import React from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { logoutUser, getAdminDetails } from "../../../redux/actions/loginAction";
import { getDashboardCount } from "../../../redux/actions/dashboardDetails";
import Auth from "../../../services/Auth";
import { HomepageHeader } from "../../basic/header/header";
import logoImg from '../../basic/Homepage/main.jpg'
import { MainCard } from "../Card/card";
import TeacherImg from '../teacher.png';
import StudentImg from '../student.jfif';
import SubjectImg from '../subject.jfif';
import TeacherTable from "../teacherTable/teacherTable";
import SubjectTable from "../subjectTable/subjectTable";
import StudentTable from "../studentTable/studentTable";

const useStyles = (theme)=>({
  logout_btn : {
    marginLeft : '90%',
    marginTop: 50,
    background: 'lightblue',
    // padding: 10,
    borderRadius: 10,
    fontWeight: 'bold',
    color: 'black',
    textDecoration: 'none',
    cursor: 'pointer',
    border: 'none',
    padding: '10px 20px',

    


    
  },
  headerMargin : {
    marginTop : 40
  },
  inlineblock : {
    display : 'inline-block',
    
    padding: 10,
  },
  linkbtn : {
    color:'black',
    textDecoration: 'none',
    fontWeight: 'bold',
    

  }
})

class DashboardMain extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.expand = "none"
  }

  logout(obj) {
    obj.props.logoutUser();
    obj.forceUpdate();
  }

  handleTableExapand(type) {
    console.log("handle table")
    if(type === this.expand) {
      this.expand = "none"
    } else {
      this.expand = type
    }
    this.forceUpdate();
  }

  render(){
    console.log(this.props.user);
    if(!Auth.retriveToken() || Auth.retriveToken()==='undefined'){
      return (<Navigate to='/'/>);
    } else if(!this.props.user.isLoggedIn) {
      this.props.getAdminDetails();
      return (<div></div>);
    } else {
      if(!this.props.dashboardDetails.retrived){
        this.props.getDashboardCount();
      }
      let x;
      if(this.expand === "Teacher") {
        x = <TeacherTable/>;
      } else if (this.expand === "Student") {
        x = <StudentTable/>;
      } else if (this.expand === "Subject") {
        x = <SubjectTable/>;
      }
        return (
          <div>
            <HomepageHeader title='Exam Portal' img={logoImg}/>
            <div className={this.props.classes.headerMargin}></div>
            <button onClick={()=>(this.logout(this))} className={this.props.classes.logout_btn} >Logout</button>
            <MainCard title='Teacher' value={this.props.dashboardDetails.teacherActive} total={this.props.dashboardDetails.teacherActive + this.props.dashboardDetails.teacherBlocked}  image={TeacherImg} />
            <div className={this.props.classes.inlineblock}>
              <button ><Link to="/addTeacher" className={this.props.classes.linkbtn}>Add Teacher</Link></button>
              <br></br>
              <br></br>
              <button onClick={()=>(this.handleTableExapand("Teacher"))}>Show</button>
            </div>
            <MainCard title='Student' value={this.props.dashboardDetails.studentActive} total={this.props.dashboardDetails.studentActive + this.props.dashboardDetails.studentBlocked} image={StudentImg} />
            <button onClick={()=>(this.handleTableExapand("Student"))}>Show</button>
            <MainCard title='Subject' value={this.props.dashboardDetails.subjectActive} total={this.props.dashboardDetails.subjectActive + this.props.dashboardDetails.subjectBlocked} image={SubjectImg} />
            <div className={this.props.classes.inlineblock}>
              <button ><Link to="/addSubject" className={this.props.classes.linkbtn}>Add Subject</Link></button>
              <br></br>
              <br></br>
              <button onClick={()=>(this.handleTableExapand("Subject"))}>Show</button>
            </div>
            <br/>

            {x}
          </div>
        );

    }
    
  }
}

const mapStateToProps = state => ({
  user:state.user,
  dashboardDetails:state.dashboardDetails
});

export default withStyles(useStyles)(connect(mapStateToProps,{
  logoutUser,
  getAdminDetails,
  getDashboardCount,
})(DashboardMain));
