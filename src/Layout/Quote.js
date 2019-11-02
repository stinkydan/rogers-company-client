import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router';

import { getQuote } from './../Api/quoteApi';

import Map from './Map';
import Form from './Forms/Form';
import LoadingPage from './LoadingPage'
import ErrorMessage from './ErrorMessage'
import JobTile from './JobTile'

class Quote extends Component {
  constructor() {
    super()
    this.quoteRef = React.createRef();
    this.state = {
      name: null,
      email: null,
      phone: null,
      address: '',
      jobType: false,
      redirect: false,
      showLoadingPage: false,
      calcQuoteError: false,
      jobTypeAreas: {},
      selectedSeason: false,
      summerJobArr: ["Weeding", "Lawn_Care", "Garden_Clearnce", "Weed_Wacking", "Grass_Installation", "Trimming_and_Pruning", "Mulching"],
      winterJobArr: ["Snow_Removal", "Salting", "Snow_Removal_With_Salt"],
      areaTotal: 0
    }
  }

handleChange = event => {
  this.setState({ [event.target.name]: event.target.value });
}

initLoadingPage = () => {
  this.setState({ showLoadingPage: true });
}

initError = () => {
  this.setState({ calcQuoteError: true });

    setTimeout(() => this.setState({
      calcQuoteError: false
    }),
    5000
  );
}

addressChange = address => {
  this.setState({ address: address, areaTotal: 0 })
}

async handleUserInfo(jobInfo, user) {
  try {
      const res = await getQuote(jobInfo)
      console.log(res, "QUOTE RES")
      jobInfo.price = res.data.price
      jobInfo.time = res.data.totalTimeInHours
      jobInfo.jobDetails = res.data.jobDetails

      this.setState({
        user: user,
        jobInfo: jobInfo,
        redirect: true
      })
    }

  catch {
    this.setState({ showLoadingPage: false })
    this.initError()
  }
}

onValidateSuccess = () => {
  const { name, email, phone, address, jobTypeAreas } = this.state

  const jobInfo = {
    job_type_areas: jobTypeAreas,
  }

  const user = {
    client_name: name,
    client_email: email,
    client_phone: phone,
    client_address: address
  }

  this.initLoadingPage();
  this.handleUserInfo(jobInfo, user);
}

validateForm = (e) => {
  e.preventDefault()

  this.state.jobTypeAreas ? this.onValidateSuccess() : console.log("someting iz rong my bruddah")
}

// Job Type and Map Area Functionality
handleArea = newArea => {
  let { jobType, jobTypeAreas, areaTotal } = this.state

  if (!jobTypeAreas[jobType]) {

    jobTypeAreas[jobType] = [newArea]

    this.setState({
      jobTypeAreas: jobTypeAreas,
      areaTotal: areaTotal += newArea
    })

  } else if (jobTypeAreas[jobType]) {

    jobTypeAreas[jobType] = jobTypeAreas[jobType].concat(newArea)

    this.setState({
      jobTypeAreas: jobTypeAreas,
      areaTotal: areaTotal += newArea
    })

  } else {
    console.log("shit handle area got fucked")
  }
}

onTileClick = jobType => {
  this.setState({ jobType: jobType })
}

// Utilities
dismissMessage = () => {
  this.setState({ calcQuoteError: false })
}

scrollDown = () => {
  this.quoteRef.current.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  })
}

  render() {
    const landscapingJobTypes = (
      <>
        <span className="job-type-tile tile-selected" onClick={() => this.setState({ selectedSeason: false })}>Back</span>
        {this.state.summerJobArr.map((jobType, i) => (
          <JobTile
            key={i}
            jobType={jobType}
            onTileClick={this.onTileClick}
          />
        ))}
      </>
    );

    const snowRemovalJobTypes = (
      <>
        <span className="job-type-tile tile-selected" onClick={() => this.setState({ selectedSeason: false })}>Back</span>
        {this.state.winterJobArr.map((jobType, i) => (
          <JobTile
            key={i}
            jobType={jobType}
            onTileClick={this.onTileClick}
          />
        ))}
      </>
    );

    const seasonSelectionOptions = (
      <>
        <span className="job-type-tile" onClick={() => this.setState({ selectedSeason: landscapingJobTypes })}>Summer</span>
        <span className="job-type-tile" onClick={() => this.setState({ selectedSeason: snowRemovalJobTypes })}>Winter</span>
      </>
    );

    // If this.state.time exists, then a quote was successfully calculated
    // and we should redirect to the confirmation page.
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: '/quote-confirmation',
            state: {
              user: this.state.user,
              jobInfo: this.state.jobInfo
            }
          }}
        />
      );
    } else {
      return (
        <>
          {this.state.showLoadingPage ? <LoadingPage /> : ''}

          {this.state.calcQuoteError ? <ErrorMessage dismissMessage={this.dismissMessage} /> : ''}

          <div className="quote-page-container">
            <div className="quote-hero">
              <h1>Quick. Easy. Accurate.</h1>
              <p>
                Our time tested quoting tools are gauranteed to give you an accurate quote in just a matter of seconds.
              </p>
              <p>Click here to get started!</p>
              <span className="quote-down-arrow" onClick={this.scrollDown}>&#8595;</span>
            </div>
            <div className="quote-tools-container" ref={this.quoteRef}>
              <div className="map-directions">
                <p>
                  <strong>First,</strong> select a season and click the job/jobs you're interested in. Then, just enter your address and draw around the perimeter of the area in question.
                </p>
                <h2>{this.state.areaTotal.toFixed(2)}</h2>
              </div>

              <div className="map-and-instructions">
                {// Only render map if api key is present. (Prevents errors if the page is refreshed)
                  // Render transparent placeholder div if map isn't present for UI purposes.
                  this.props.apiKey ?
                <div className="google-map">
                  <Map
                    google={this.props.google}
                    center={{lat: 42.3601, lng: -71.0589}}
                    height='100%'
                    zoom={15}
                    handleArea={this.handleArea}
                    apiKey={this.props.apiKey}
                    addressChange={this.addressChange}
                  />
                </div>
                  : <div className="map-and-instructions"><div className="google-map-placeholder"></div></div>
                }
                <div className="job-type-container">
                  {this.state.selectedSeason ? this.state.selectedSeason : seasonSelectionOptions}
                </div>
              </div>
            </div>

            <Form
              handleChange={this.handleChange}
              validateForm={this.validateForm}
              address={this.state.address}
            />
          </div>
        </>
      );
    }
  }
}

export default withRouter(Quote)
