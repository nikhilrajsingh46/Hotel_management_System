import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Paper, Divider } from '@material-ui/core';
import bear from './image/bear.jpg';
import cocktails from './image/Cocktails.jpg';
import hike from './image/hike.jpg';
import van from './image/van.jpg';
import spa from './image/bear.jpg'; // Add new images for additional services
import dining from './image/Cocktails.jpg';
import kayak from './image/hike.jpg';
import campfire from './image/van.jpg';

const useStyles = makeStyles((theme) => ({
  all: {
    backgroundColor: '#FFF3FA',
    width: '100%',
    padding: '4rem 0',
  },
  services: {
    textAlign: 'center',
    width: '100%',
    paddingTop: '3rem',
  },
  parent: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '90%',
    margin: '0 auto',
    flexWrap: 'wrap',
    textAlign: 'center',
    paddingBottom: '3rem',
  },
  ser: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#333',
  },
  paper: {
    width: '250px',
    margin: '1rem',
    height: 'auto',
    backgroundColor: '#fff',
    borderRadius: '15px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'translateY(-10px)',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
    },
    [theme.breakpoints.down('sm')]: {
      width: '210px',
    },
  },
  icon: {
    textAlign: 'center',
    width: '100%',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#444',
    margin: '1rem 0',
  },
  body: {
    textAlign: 'center',
    padding: '0 10px',
    color: '#666',
    fontSize: '0.9rem',
    lineHeight: '1.6',
  },
  line: {
    width: '6%',
    margin: '0.5rem auto',
    [theme.breakpoints.down('sm')]: {
      width: '10%',
    },
  },
  image: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderTopLeftRadius: '15px',
    borderTopRightRadius: '15px',
  },
}));

const Services = () => {
  const classes = useStyles();
  return (
    <div className={classes.all}>
      <div className={classes.services}>
        <div style={{ marginBottom: '3rem' }}>
          <Typography className={classes.ser} color="initial">
            Services
          </Typography>
          <div className={classes.line}>
            <Divider style={{ height: '.3rem', background: '#FF6B6B' }} variant="middle" />
          </div>
        </div>
        <div className={classes.parent}>
          <Paper className={classes.paper}>
            <div className={classes.icon}>
              <img src={cocktails} alt="fresh drink" className={classes.image} />
            </div>
            <Typography className={classes.title} color="initial">
              Free Cocktails
            </Typography>
            <Typography variant="body1" className={classes.body}>
              Enjoy complimentary cocktails crafted by our expert mixologists. Perfect for relaxing after a long day.
            </Typography>
          </Paper>
          <Paper className={classes.paper}>
            <div className={classes.icon}>
              <img src={hike} alt="hike" className={classes.image} />
            </div>
            <Typography className={classes.title} color="initial">
              Endless Hiking
            </Typography>
            <Typography variant="body1" className={classes.body}>
              Explore breathtaking trails and scenic routes. Our guided hikes cater to all skill levels.
            </Typography>
          </Paper>
          <Paper className={classes.paper}>
            <div className={classes.icon}>
              <img src={van} alt="van" className={classes.image} />
            </div>
            <Typography className={classes.title} color="initial">
              Free Shuttle
            </Typography>
            <Typography variant="body1" className={classes.body}>
              Travel hassle-free with our complimentary shuttle service, available to all major attractions.
            </Typography>
          </Paper>
          <Paper className={classes.paper}>
            <div className={classes.icon}>
              <img src={bear} alt="bear" className={classes.image} />
            </div>
            <Typography className={classes.title} color="initial">
              Strongest Bear
            </Typography>
            <Typography variant="body1" className={classes.body}>
              Meet our mascot, the strongest bear! A fun and unique experience for visitors of all ages.
            </Typography>
          </Paper>
          {/* Additional Services */}
          <Paper className={classes.paper}>
            <div className={classes.icon}>
              <img src={spa} alt="spa" className={classes.image} />
            </div>
            <Typography className={classes.title} color="initial">
              Relaxing Spa
            </Typography>
            <Typography variant="body1" className={classes.body}>
              Unwind with our luxurious spa treatments designed to rejuvenate your mind and body.
            </Typography>
          </Paper>
          <Paper className={classes.paper}>
            <div className={classes.icon}>
              <img src={dining} alt="dining" className={classes.image} />
            </div>
            <Typography className={classes.title} color="initial">
              Gourmet Dining
            </Typography>
            <Typography variant="body1" className={classes.body}>
              Savor exquisite dishes prepared by our world-class chefs using locally sourced ingredients.
            </Typography>
          </Paper>
          <Paper className={classes.paper}>
            <div className={classes.icon}>
              <img src={kayak} alt="kayak" className={classes.image} />
            </div>
            <Typography className={classes.title} color="initial">
              Kayaking Adventures
            </Typography>
            <Typography variant="body1" className={classes.body}>
              Paddle through serene waters and explore hidden coves with our guided kayaking tours.
            </Typography>
          </Paper>
          <Paper className={classes.paper}>
            <div className={classes.icon}>
              <img src={campfire} alt="campfire" className={classes.image} />
            </div>
            <Typography className={classes.title} color="initial">
              Campfire Nights
            </Typography>
            <Typography variant="body1" className={classes.body}>
              Gather around the campfire for storytelling, marshmallow roasting, and stargazing under the night sky.
            </Typography>
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default Services;