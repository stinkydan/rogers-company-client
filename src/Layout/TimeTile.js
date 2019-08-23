import React, { Component } from 'react';

export class TimeTile extends Component {
  render() {
    return (
      <>
        <div className="time-tile">
          {this.props.time}
        </div>
      </>
    );
  }
}
