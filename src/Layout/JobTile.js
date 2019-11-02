import React, { Component } from 'react'

export default class JobTile extends Component {
  constructor() {
    super()
    this.state = {
      selected: false
    }
  }

  onSelect = jobType => {
    this.setState({ selected: !this.state.selected })

    this.props.onTileClick(jobType)
  }

  render() {
    return(
      <>
        <span
          className={this.state.selected ? "job-type-tile tile-selected" : "job-type-tile"}
          onClick={() => this.onSelect(this.props.jobType)}
        >
          {this.props.jobType.split("_").join(" ")}
        </span>
      </>
    )
  }
}
