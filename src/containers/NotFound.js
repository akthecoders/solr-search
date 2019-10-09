import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  link: {
    textDecoration: "none"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: 'none'
  },
  button: {
    margin: theme.spacing(1),
    width: "15%"
  },
  paperButton: {
    padding: "0px",
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: 'none'
  },
});
class NotFound extends Component {

  render() {
    const { classes } = this.props;

    return (
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <div className={classes.head}>
                <Typography variant="h1">
                  Not Found
                </Typography>
              </div>
            </Paper>
            <Paper className={classes.paperButton}>
              <div>
                <Button variant="contained" className={classes.button}>
                  <Link to="/" className={classes.link} >Home</Link>
                </Button>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

NotFound.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NotFound);