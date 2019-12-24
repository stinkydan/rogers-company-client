import React, { Component } from 'react'

export default class JobTile extends Component {
  constructor() {
    super()
    this.state = {
      selected: false,
      areasCompleted: false
    }
  }

  completeAreas = () => {
    console.log('COMPLETE AREA RAN')
    this.setState({ areasCompleted: true })
  }

  onSelect = jobType => {
    this.setState({ selected: !this.state.selected })

    this.props.onTileClick(jobType, this.completeAreas)
  }

  render() {
    const { selected, areasCompleted } = this.state

    if (!areasCompleted) {
      return(
        <>
          <span
            className={selected ? "job-type-tile areas-in-progress" : "job-type-tile"}
            onClick={() => this.onSelect(this.props.jobType)}
          >
            {this.props.jobType.split("_").join(" ")}
          </span>
        </>
      )
    } else if (areasCompleted) {
      return (
        <>
          <span className="job-type-tile tile-selected disabled">
            {this.props.jobType.split("_").join(" ")}
          </span>
        </>
      );
    }
  }
}
