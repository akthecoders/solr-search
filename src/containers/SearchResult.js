import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = () => ({
  root: {
    padding: "0px",
    margin: "10px 0 0 0"
  },
  resultFoundText: {
    margin: "0 0 0 20px"
  },
  inline: {
    display: 'inline',
  },
});

class SearchResult extends Component {

  // constructor(props) {
  //   super(props);
  // }

  render() {
    const { classes } = this.props;

    if (this.props.solrConnector.busy) {
      return (
        <CircularProgress disableShrink style={{
          marginLeft: "40%"
        }} />
      );
    }

    if (this.props.solrConnector.response == null || (this.props.solrConnector.response.response !== undefined && this.props.solrConnector.response.response.numFound <= 0)) {
      return (
        <CircularProgress disableShrink style={{
          marginLeft: "40%"
        }} />
      );
    }
    const { response } = this.props.solrConnector.response;

    return (
      <React.Fragment>
        <Typography
          component="span"
          variant="body2"
          className={classes.resultFoundText}
          color="textPrimary"
        >
          1 - 10 of {response.numFound} results
        </Typography>
        <List className={classes.root}>
          {
            response.docs.map((obj, key) => {
              return (
                <React.Fragment key={key}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt={obj.name} src="/static/profile.png" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={obj.email}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            {obj.name}
                          </Typography>
                          {" — " + obj.description}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              );
            })
          }
        </List>
      </React.Fragment>
    )
  }
}

SearchResult.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(SearchResult));
