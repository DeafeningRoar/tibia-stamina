import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import moment from 'moment'
import Typography from '@material-ui/core/Typography'
import { Button } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'

import { calculateTimeToFull } from './utils/calculateStamina'

class Form extends React.Component {
  state = {
    eventDate: moment(new Date().toISOString()).format('YYYY-MM-DDTkk:mm'),
    currentMinutes: 0,
    currentHours: 0,
    date: '',
    message: ''
  }

  handleChange = event => {
    const { name, value } = event.target
    if (name === 'currentMinutes') {
      value < 60 && value > -1 && this.setState({ [name]: value })
    } else if (name === 'currentHours') {
      value > -1 && this.setState({ [name]: value })
    } else {
      this.setState({ [name]: value })
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    const { currentHours, currentMinutes, eventDate } = this.state
    const time = calculateTimeToFull({ currentHours, currentMinutes }, eventDate)
    this.setState({ ...time })
  }

  render() {
    const { classes } = this.props
    const { date, message, eventDate } = this.state
    return (
      <React.Fragment>
        <form className={classes.form} onSubmit={this.handleSubmit}>
          <Grid alignItems="center" justify="center" container spacing={8}>
            <Grid item style={{ height: '88px' }}>
              <TextField
                style={{ minWidth: '240px' }}
                id="eventDate"
                name="eventDate"
                type="datetime-local"
                label="Event Date"
                required
                value={this.state.eventDate}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                style={{ marginRight: '20px', maxWidth: '110px' }}
                id="currentHours"
                name="currentHours"
                type="number"
                label="Hours"
                required
                value={this.state.currentHours}
                onChange={this.handleChange}
                helperText="Your Current Stamina"
              />
              <TextField
                style={{ maxWidth: '110px' }}
                id="currentMinutes"
                name="currentMinutes"
                type="number"
                label="Minutes"
                required
                value={this.state.currentMinutes}
                onChange={this.handleChange}
                helperText="Your Current Stamina"
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Calculate
          </Button>
        </form>
        <Typography color="secondary" style={{ marginTop: '5px' }}>
          *** Result date is mm-dd-yyyy
        </Typography>
        <div style={{ width: '100%', textAlign: 'center', marginTop: '5%' }}>
          {date.length > 0 ? (
            <Typography style={{ fontSize: 'large' }}>{`To regenarate your stamina to 41:59 on ${moment(
              eventDate
            ).format('MM.DD.YYYY - hh:mm a')}, you need to log out at ${date}.`}</Typography>
          ) : (
            <Typography style={{ fontSize: 'large' }}>{message}</Typography>
          )}
        </div>
      </React.Fragment>
    )
  }
}

Form.propTypes = {
  classes: PropTypes.object.isRequired
}

export default Form
