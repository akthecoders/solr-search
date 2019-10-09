import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import SolrConnector from 'react-solr-connector';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { fade, withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import queryString from "query-string";
import SearchResult from './SearchResult';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = (theme) => ({
  root: {
    padding: "0px",
    margin: "60px 0 0 0"
  },
  sidebar: {
    borderRight: "1px solid #dfe1e5"
  },
  searchResponse: {
    borderLeft: "1px solid #dfe1e5"
  },
  paper: {
    padding: theme.spacing(0),
    color: theme.palette.text.secondary,
    boxShadow: 'none',
    width: "100%",
    display: "inline-flex"
  },
  searchResult: {
    padding: theme.spacing(0),
    margin: "70px 10px 10px 10px",
    color: theme.palette.text.secondary,
    boxShadow: 'none',
    width: "100%",
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
    marginLeft: '2%',
    width: '78%',
    height: '44px',
    border: '1px solid #dfe1e5'
  },
  searchButton: {
    width: "18%"
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
  inline: {
    display: 'inline',
  },
});

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchParams: {
        solrSearchUrl: "http://localhost:8983/solr/user_data/select",
        query: "*:*",
        facet: {
          categories: {
            "type": "terms",
            "field": "name",
            "limit": 5
          }
        }
      },
      searchText: ""
    }
  }

  componentDidMount() {
    let searchText = queryString.parse(this.props.location.search);
    searchText = searchText.query;
    searchText = searchText ? searchText : "";
    this.setState({
      searchText,
      searchParams: { ...this.state.searchParams, query: searchText }
    });
  }

  handleSearchInput = (event) => {
    let searchText = event.target.value;
    this.setState({
      searchText
    })
  }

  initiateSearch = () => {
    if (this.state.searchText.length > 0) {
      let state = {
        pathname: '/search',
        search: '?query=' + this.state.searchText,
        searchParams: { ...this.state.searchParams, query: this.state.searchText }
      };
      this.setState({
        searchParams: { ...this.state.searchParams, query: this.state.searchText }
      });
      this.props.history.push(state);
    }
  }

  keyPress = (e) => {
    if (e.keyCode === 13) {
      this.initiateSearch()
    }
  }

  goToHome = () => {
    let state = {
      pathname: '/',
    };
    this.props.history.push(state);
  }

  render() {
    const { classes } = this.props;
    return (
      <Container className={classes.root}>
        <Grid container>
          <Grid item xs={2} >
            <Container className={classes.sidebar} onClick={this.goToHome} style={{ cursor: "pointer" }}>
              <Typography variant="h4" align="center">
                Solr
              </Typography>
              <Typography variant="subtitle2" align="right">
                Filter
              </Typography>
            </Container>
          </Grid>
          <Grid item xs={10} className={classes.searchResponse}>
            <Paper className={classes.paper}>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  ref="searchInput"
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
              <div className={classes.searchButton}>
                <Button
                  variant="contained"
                  disabled={!this.state.searchText.length}
                  className={classes.button}
                  onClick={this.initiateSearch}
                  style={{
                    margin: "0px 0 0 15px",
                    width: "100%",
                    padding: "10px"
                  }}
                >
                  Search
                </Button>
              </div>
            </Paper>
            <Paper className={classes.searchResult}>
              {
                (this.state.searchParams && this.state.searchParams.query) ?
                  <SolrConnector searchParams={this.state.searchParams}>
                    <SearchResult />
                  </SolrConnector>
                  :
                  <CircularProgress disableShrink style={{
                    marginLeft: "40%"
                  }} />
              }
            </Paper>
          </Grid>
        </Grid>
      </Container>
    )
  }
}

Search.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Search));
