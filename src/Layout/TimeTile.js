import React, { Component } from 'react';

export class TimeTile extends Component {

  requestTime = time => {
    console.log(time)
  }

  render() {
    const time = this.props.time.replace(':', '')

    const timePeriod = () => {
      if (time < 1200 && time >= 800) {
        return `${this.props.time} AM`
    } else {
      return  `${this.props.time} PM`
    }
  }

     const finalTime = timePeriod()

    return (
      <>
        <div
          className="time-tile"
          onClick={() => this.props.clickTime(this.props.time, finalTime)}
        >
          {finalTime}
        </div>
      </>
    );
  }
}
