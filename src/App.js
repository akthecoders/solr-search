import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Search from "./containers/Search";

const styles = () => ({
  root: {
    flexGrow: 1,
  }
});

class App extends Component {

  render() {
    const { classes } = this.props;
    return (
      <Router>
        <div className={classes.root}>
          <Box component="span">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/search">
                <Search />
              </Route>
              <Route path="/">
                <NotFound />
              </Route>
            </Switch>
          </Box>
        </div>
      </Router>
    );
  }
}

export default withStyles(styles)(App);