import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import img1 from "./img1.jpg";
import img2 from "./img2.jpg";
import img3 from "./img3.jpg";
import img4 from "./img4.jpg";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  grid: {
    flexGrow: 1,
    minHeight: "90vh",
    width: "95%",
    margin: "3rem auto 0px auto",
  },
  root: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "2rem",
  },
  card: {
    maxWidth: 345,
    margin: theme.spacing(2),
    transition: "transform 0.3s ease-in-out",
    '&:hover': {
      transform: "scale(1.05)",
    },
  },
  media: {
    height: 200,
  },
  heading: {
    marginBottom: "15px",
    color: theme.palette.primary.main,
    fontWeight: 700,
    fontSize: "1.5rem",
  },
  mon: {
    color: theme.palette.secondary.main,
    fontWeight: 700,
    fontSize: "1.5rem",
  },
  typ: {
    fontSize: "1rem",
  },
  desc: {
    marginTop: "10px",
    width: "90%",
  },
  detail: {
    fontSize: "1rem",
    fontWeight: 500,
  },
  button: {
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

const Recom = () => {
  const classes = useStyles();

  const rooms = [
    {
      img: img1,
      title: "Facility Room",
      price: "3000 RS",
      size: "30ft",
      capacity: "Max Person 5",
      services: "Wifi, Television, Bathroom...",
    },
    {
      img: img2,
      title: "Couple Room",
      price: "1500 RS",
      size: "30ft",
      capacity: "Max Person 5",
      services: "Wifi, Television, Bathroom...",
    },
    {
      img: img3,
      title: "Single Room",
      price: "900 RS",
      size: "30ft",
      capacity: "Max Person 5",
      services: "Wifi, Television, Bathroom...",
    },
    {
      img: img4,
      title: "Deluxe Room",
      price: "1000 RS",
      size: "30ft",
      capacity: "Max Person 5",
      services: "Wifi, Television, Bathroom...",
    },
  ];

  return (
    <>
      <Grid className={classes.grid} container direction="row" justifyContent="center" alignItems="center">
        {rooms.map((room, index) => (
          <Grid item key={index} md={3} sm={6} xs={12}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia className={classes.media} image={room.img} title={room.title} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2" className={classes.heading}>
                    {room.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p" className={classes.typ}>
                    <span className={classes.mon}>{room.price}</span> /Pernight
                  </Typography>
                  <div className={classes.desc}>
                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                      <Typography className={classes.detail}>Size:</Typography>
                      <Typography className={classes.detail}>{room.size}</Typography>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                      <Typography className={classes.detail}>Capacity:</Typography>
                      <Typography className={classes.detail}>{room.capacity}</Typography>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                      <Typography className={classes.detail}>Services:</Typography>
                      <Typography className={classes.detail}>{room.services}</Typography>
                    </div>
                  </div>
                  <Button
                    component={Link}
                    to="/Hotel-Website/Book-Now"
                    className={classes.button}
                    fullWidth
                  >
                    Book Now
                  </Button>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Recom;