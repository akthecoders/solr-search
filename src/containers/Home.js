import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import { fade, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router"

const styles = theme => ({
  link: {
    textDecoration: "none",
    color: "rgba(0, 0, 0, 0.54)"
  },
  container: {
    margin: "10% auto"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: 'none'
  },
  search: {
    position: 'relative',
    borderRadius: '20px',
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
      boxShadow: '0 1px 6px 0 rgba(32,33,36,0.28)',
      borderColor: 'rgba(223,225,229,0)'
    },
    marginLeft: '25%',
    width: '50%',
    height: '44px',
    border: '1px solid #dfe1e5'
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
    height: '100%'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%'
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


class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchText: ""
    }
  }

  handleSearchInput = (event) => {
    let searchText = event.target.value;
    this.setState({
      searchText
    })
  }

  keyPress = (e) => {
    if (e.keyCode === 13) {
      this.initiateSearch()
    }
  }

  initiateSearch = () => {
    if (this.state.searchText.length > 0) {
      let state = {
        pathname: '/search',
        search: '?query=' + this.state.searchText,
      };

      this.props.history.push(state);
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <Container className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <div className={classes.head}>
                <Typography variant="h2">
                  Solr
                </Typography>
              </div>
            </Paper>
            <Paper className={classes.paper}>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  required
                  value={this.state.searchText}
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={this.handleSearchInput}
                  onKeyDown={this.keyPress}
                />
              </div>
            </Paper>
            <Paper className={classes.paperButton}>
              <div>
                <Button
                  variant="contained"
                  disabled={!this.state.searchText.length}
                  className={classes.button}
                  onClick={this.initiateSearch}
                >
                  Search
                </Button>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Home));