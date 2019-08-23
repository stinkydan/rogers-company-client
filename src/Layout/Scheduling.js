import React, { Component } from 'react'
import Calendar from 'react-calendar'
import { TimeTile } from './TimeTile'

import { checkAvailability } from './../Api/scheduleApi'

class Scheduling extends Component {
  constructor() {
    super()
    this.state = {
      date: new Date(),
      timeClass: 'time-schedule',
      availableTimes: []
    }
  }

  onChange = date => this.setState({ date })

  getTimes = (day) => {
    checkAvailability(day)
      .then(res => {
        console.log(res)
        this.handleAvailability(res)
      })
      .catch(err => console.log(err))
  }

  handleAvailability = res => {
    this.setState({ availableTimes: res.data })
  }

  render() {

    const timeTiles = (
      <>
        {this.state.availableTimes.map(
        time => (
            <TimeTile
              key={Math.random()}
              time={time}
            />
          )
        )}
      </>
    );

    return (
      <>
        <div className="schedule-page-container">
          <div className="instructions">
            Choose A Date & Time
          </div>
          <div className="calendar-container">
            <Calendar
              className="calendar"
              calendarType="US"
              onChange={this.onChange}
              onClickDay={(day) => this.getTimes(day)}
              value={this.state.date}
            />
            <div className="time-tile-container">
              {timeTiles}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Scheduling
// 1. Get tiles to open when clicking on a day
// 2. Each tile should have a realtionship only with the day it was triggered from.
// 3. A tile should display available times for it's corresponding day.
// 4. Available times should be taken from the company dashboard API
// 5. If a time is available and the user clicks that time, display a quick confirmation
// 6. If user proceeds, send to compay dashboard API

// ** Display available times for near future on home screen **
