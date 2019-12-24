import React, { Component } from 'react';

import Map from './Map';
import Form from './Forms/Form';
import JobDetails from './JobDetails';
import JobTile from './JobTile';
import AutocompleteInput from './AutocompleteInput';
import QuoteDetails from './QuoteDetails';

export default class QuoteTools extends Component {
  constructor() {
    super()
    this.state = {
      mapWidthHeight: '100%',
      expandedJobTypeContainer: false,
      houseConfirmed: false,
      showStreetView: true,
      dragHouseMarker: false,
      selectedSeason: false
    }
  }
  // summerJobArr: ["Weeding", "Lawn_Care", "Garden_Clearnce", "Weed_Wacking", "Grass_Installation", "Trimming_and_Pruning", "Mulching"]

  // When the user types an address in the search box
  onPlaceSelected = place => {
    if (place.formatted_address) {
      const address = place.formatted_address,
      latValue = place.geometry.location.lat(),
      lngValue = place.geometry.location.lng();

      this.setState({
        inputVisibility: "input-tools-container hide",
        mapVisibility: "map-tools-container show",
        zoom: 20,
        address: address,
        lat: latValue,
        lng: lngValue
      }
     )
    } else {
     return ''
    }
  }

  // UTILITIES
  continueToAreas = () => {
    let validated = false
    for (const value in this.props.jobDetails) {
      if (this.props.jobDetails[value]) {
        validated = true
        console.log('validated')
        break;
      } else {
        console.log('value false')
        continue
      }
    }
    if (validated) {
      this.setState({
        mapWidthHeight: '100%',
        drawAreas: true,
        expandedJobTypeContainer: false
      })
    } else { console.log('not validated')}
  }

  continueToForm = () => {
    let details = []
    let areas = Object.keys(this.props.jobAreas)
    for (const value in this.props.jobDetails) {
      if (this.props.jobDetails[value]) {
        details.push(true)
        console.log('validate push')
      } else {
        console.log('value false')
        continue
      }
    }
    if (areas.length === details.length) {
      this.setState({ showForm: true })
    } else { console.log('not validated')}
  }

  onMarkerDragEnd = e => {
    const latLng = e.latLng

    this.setState({
      lat: latLng.lat(),
      lng: latLng.lng()
    })
  }

  dismissUserPrompt = () => {
    this.setState({ displayUserPrompt: false })
  }

  displayUserPrompt = () => {
    this.setState({ displayUserPrompt: true })
  }

  onDrawAreaSelection = selection => {
    if (selection === 'yes') {
      this.dismissUserPrompt()
    } else if (this.props.completeAreas !== null && selection === 'no' ) {
      this.props.completeAreas()
      this.dismissUserPrompt()
    } else { console.log('draw an area please') }
  }

  render() {
    // const landscapingJobTypes = (
    //   <>
    //   <span className="job-type-tile back-button" onClick={() => this.setState({ selectedSeason: false })}>Back</span>
    //     {this.state.summerJobArr.map((jobType, i) => (
    //       <JobDetails
    //         key={i}
    //         jobType={jobType}
    //         onTileClick={this.onTileClick}
    //       />
    //     ))}
    //     <span className="job-type-tile" onClick={this.continueToAreas}>
    //       Continue
    //     </span>
    //   </>
    // );

    const snowRemovalJobTypes = (
      <>
      {/* <span className="job-type-tile back-button" onClick={() => this.setState({ selectedSeason: false })}>Back</span> */}
        {Object.entries(this.props.jobDetails).map((jobArr, i) => (
          <JobDetails
            key={i}
            jobType={jobArr[0]}
            detailChoice={this.props.detailChoice}
          />
        ))}
      </>
    );

    // const seasonSelectionOptions = (
    //   <>
    //     <span className="job-type-tile" onClick={() => this.setState({ selectedSeason: landscapingJobTypes })}>Summer</span>
    //     <span className="job-type-tile" onClick={() => this.setState({ selectedSeason: snowRemovalJobTypes })}>Winter</span>
    //   </>
    // );

    const jobSelections = (
      <>
        <p>Where would you like snow removal and/or salt? </p><p className="small-help-text"> * Select as many as you would like.</p>
        <div className="job-selections">
          {snowRemovalJobTypes}
          {/* this.state.selectedSeason ? this.state.selectedSeason : seasonSelectionOptions */}
        </div>
        <span className="job-type-tile continue-button" onClick={this.continueToAreas}>
        Continue
        </span>
      </>
    );

    const houseConfirmation = (
      <>
        <div className="house-confirmation">
          <span>Let's confirm that we have the correct location.
          <br/>Is the red marker on your house?</span>
          <br/>
          <span>* You may have to drag the map to find it.</span>
          <div className="job-type-tile house-confirmation" onClick={() => this.setState({ houseConfirmed: true, showStreetView: false, mapWidthHeight: '0', expandedJobTypeContainer: true })}>Yes</div>
          <div className="job-type-tile house-confirmation" onClick={() => this.setState({ showStreetView: false })}>No</div>
        </div>
      </>
    );

    const areasToDraw = (
      <div className="job-type-container">
        <p>
          Now, let's draw the areas for your selections.
        </p>
        <p>
          Click on a selection below- then, click on the map to place points around that part of your house.
        </p>
        <p>To complete an area, just click on the first point that you laid.</p>
        {
          Object.entries(this.props.jobDetails).map((jobType, i) => {
            if (jobType[1]) {
              return (
                <JobTile
                  key={i}
                  jobType={jobType[0]}
                  onTileClick={this.props.onJobTypeSelect}
                />
              )
            } else {
              return ''
            }
          })
        }
        <span className="job-type-tile" onClick={this.continueToForm}>
          Continue
        </span>
      </div>
    );

    const drawAreaPrompt = (
      <>
        <div className="draw-area-prompt">
          <p>Do you have another to draw for this selection? Select "No" to move on.</p>
          <button onClick={() => this.onDrawAreaSelection('yes')}>Yes</button>
          <button onClick={() => this.onDrawAreaSelection('no')}>No</button>
        </div>
      </>
    );

    if (this.props.showQuoteConfirmation) {
      return (
        <>
          <div className="quote-tools-container">
            <QuoteDetails
              user={this.props.user}
              job={this.props.job}
              monthlyQuote={this.props.quoteDetails.data.monthly_quote}
              seasonalQuote={this.props.quoteDetails.data.seasonal_quote}
              saltMonthlyQuote={this.props.quoteDetails.data.salt_monthly_quote}
              saltSeasonalQuote={this.props.quoteDetails.data.salt_seasonal_quote}
              perVisit={this.props.quoteDetails.data.per_visit}
              saltPerVisit={this.props.quoteDetails.data.salt_per_visit}
            />
          </div>
        </>
      )
    } else if (this.state.address && this.state.showForm) {
        return (
          <div className="quote-tools-container">
            <Form
              handleChange={this.props.handleChange}
              validateForm={this.props.validateForm}
              address={this.state.address}
              userWrittenDetails={this.props.userWrittenDetails}
            />
          </div>
        );
    } else if (!this.state.address) {
      return (
        <>
          <div className="quote-tools-container">
            <div className="input-tools-container">
              <div className="input-directions">
                <p>
                  <strong>First-</strong> enter the address that needs touching up.
                </p>
              </div>
              { this.props.apiKey ?
                <AutocompleteInput
                  apiKey={this.props.apiKey}
                  onPlaceSelected={this.onPlaceSelected}
                  lat={42.3601}
                  lng={-71.0589}
                />
              : ''}
            </div>
          </div>
        </>
      );
    } else if (this.state.address) {
        return (
          <>
            <div className="quote-tools-container">
              <div className={this.state.expandedJobTypeContainer ? "map-tools-container job-type-expanded" : "map-tools-container"}>
                <div className={this.state.expandedJobTypeContainer ? "google-map job-type-expanded" : "google-map"}>
                  {this.state.displayUserPrompt ? drawAreaPrompt : ''}
                  <Map
                    google={this.props.google}
                    center={{lat: this.state.lat, lng: this.state.lng}}
                    width={this.state.mapWidthHeight}
                    height={this.state.mapWidthHeight}
                    zoom={20}
                    houseConfirmed={this.state.houseConfirmed}
                    showStreetView={this.state.showStreetView}
                    onMarkerDragEnd={this.onMarkerDragEnd}
                    handleArea={this.props.handleArea}
                    updateArea={this.props.updateArea}
                    displayUserPrompt={this.displayUserPrompt}
                    apiKey={this.props.apiKey}
                  />
                </div>
                <span className="change-address" onClick={() => this.setState({ address: null, showStreetView: true, expandedJobTypeContainer: false, mapWidthHeight: '100%', houseConfirmed: false })}>Change Address</span>
                { this.state.drawAreas ?
                  areasToDraw
                  :
                  <div className={this.state.expandedJobTypeContainer ? "job-type-container expanded" : "job-type-container"}>
                    {this.state.expandedJobTypeContainer ? jobSelections : houseConfirmation}
                  </div>
                }
              </div>
            </div>
          </>
        );
      }
  }
}
