import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
  card_main:{
    background:'linear-gradient(45deg, lightblue 40%, white 90%)',
    display:'inline-block',
    padding:'40px 0px 20px 20px',
    margin:30,
    borderRadius:10,
    width: '200px',
    marginLeft: 150,
    boxShadow: '10px 10px 8px #888888;',
    fontStyle: 'italic',
    fontWeight: 'bold',
    
    color: 'darkblue',
    
  },
  name:{
    marginBottom:20,
    marginLeft:10,
    fontSize:30,
    fontWeight:500
  },
  d:{
    display:'flex',
    color:'darkblue'
  },
  d1:{
    paddingTop:10,
    fontSize:40,
    fontWeight:700
  },
  d2:{
    paddingTop:30,
    fontSize:20,
    fontWeight:600
  },
  img:{
    marginLeft:30,
    width:120,
    height:100
  }
})

export const MainCard = (props)=>{
  const classes = useStyles();
  return(
    <div className={classes.card_main}>
      <div className={classes.name}>
        {props.title}
      </div>
      <div className={classes.d}>
        <span className={classes.d1}>{props.value}</span>
        <span className={classes.d2}>/{props.total}</span>
       
      </div>
    </div>
  )
}