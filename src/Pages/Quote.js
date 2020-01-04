import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router';

import { getQuote, saveUser } from './../Api/quoteApi';
import { createJob } from './../Api/jobApi';

import QuoteTools from './../Components/QuoteTools';
import LoadingPage from './../Util/LoadingPage';
import ErrorMessage from './../Components/ErrorMessage';

class Quote extends Component {
  constructor(props) {
    super(props)
    this.quoteRef = React.createRef();
    this.state = {
      apiKey: props.apiKey,
      user: '',
      name: null,
      email: null,
      phone: null,
      address: '',
      moreDetails: '',
      selectedJobType: false,
      redirect: false,
      showLoadingPage: false,
      calcQuoteError: false,
      jobDetails: ['Sidewalk', 'Stairs', 'Walkway', 'Driveway', 'Parking_Lot', 'Trash', 'Porch', 'Garage_Entrances', 'Shoveling_Between_Cars'],
      selectedJobs: {},
      areaTotal: 0
    }
  }

// FORM

async handleUserInfo(jobInfo, user) {
  console.log(jobInfo)
  try {
      const userRes = await saveUser(user)
      console.log(userRes)

      const quoteRes = await getQuote(jobInfo, userRes.data.insertedId)
      console.log(quoteRes)

      const jobRes = await createJob(jobInfo, userRes.data.insertedId)
      console.log(jobRes, "JOB RES")

      this.setState({
        user: userRes.data.ops[0],
        quote: quoteRes.data,
        job: jobRes.data.ops[0],
        showQuoteConfirmation: true
      })
    }

  catch (err) {
    console.log(err)
    this.setState({ showLoadingPage: false })
    this.initError()
  }
}

onValidateSuccess = () => {
  const { name, email, phone, address, selectedJobs, moreDetails } = this.state

  const jobInfo = {
    selectedJobs: selectedJobs,
    customerExplanation: moreDetails
  }

  const user = {
    name: name,
    email: email,
    phone: phone,
    address: address
  }

  this.handleUserInfo(jobInfo, user);
}

validateForm = (e) => {
  e.preventDefault()

  this.state.selectedJobs ? this.onValidateSuccess() : console.log("form didn't validate")
}

// Job Type and Map Area Functionality

handleArea = (coordinates, newArea) => {
  let { selectedJobType, selectedJobs } = this.state

  selectedJobs[selectedJobType].polyPaths = selectedJobs[selectedJobType].polyPaths.concat([coordinates])
  selectedJobs[selectedJobType].areaTotal += newArea

  this.setState({
    selectedJobs: selectedJobs
  })
}

updateArea = updatedArea => {
  console.log(updatedArea, 'area update')
}

// UTILITIES

dismissMessage = () => {
  this.setState({ calcQuoteError: false })
}

scrollDown = () => {
  this.quoteRef.current.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest'
  })
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

updateAddress = address => {
  this.setState({ address })
}

// DETAIL TILE FUNCTIONS

detailChoice = (jobType, detailChosen) => {
  let { selectedJobs } = this.state

    selectedJobs[jobType] = {
      polyPaths: [],
      areaTotal: 0
    }

  this.setState({
    selectedJobs: selectedJobs
  })
}

onJobTypeSelect = (jobType, completeAreas) => {
  this.setState({ selectedJobType: jobType, completeAreas: completeAreas })
}

  render() {
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
                Get a quote for your snow removal needs in just a matter of minutes!
              </p>
              <p>Click here to get started!</p>
              <span className="quote-down-arrow" onClick={this.scrollDown}>&#8595;</span>
            </div>

              <div className="quote-tools-ref" ref={this.quoteRef}>
                <QuoteTools
                  apiKey={this.props.apiKey}
                  handleArea={this.handleArea}
                  updateArea={this.updateArea}
                  handleChange={this.handleChange}
                  detailChoice={this.detailChoice}
                  resetDetailChoice={this.resetDetailChoice}
                  jobDetails={this.state.jobDetails}
                  selectedJobs={this.state.selectedJobs}
                  onJobTypeSelect={this.onJobTypeSelect}
                  selectedJobType={this.state.selectedJobType}
                  completeAreas={this.state.completeAreas}
                  validateForm={this.validateForm}
                  showQuoteConfirmation={this.state.showQuoteConfirmation}
                  quoteDetails={this.state.quote}
                  updateAddress={this.updateAddress}
                  user={this.state.user}
                  job={this.state.job}
                />
            </div>
          </div>
        </>
      );
    }
  }
}

export default withRouter(Quote)
