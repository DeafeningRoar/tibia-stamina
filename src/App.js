import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import { styles } from './styles'
import Form from './Form'

class App extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5" style={{ marginBottom: '3%' }}>
            Stamina Recovery
          </Typography>
          <Form classes={classes} />
        </Paper>
      </main>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(App)
