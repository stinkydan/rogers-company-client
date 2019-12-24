import React, { Component } from 'react'
import { withGoogleMap, withScriptjs } from "react-google-maps";
import Autocomplete from 'react-google-autocomplete';
import Geocode from "react-geocode";

export default class AutocompleteInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lat: props.lat,
      lng: props.lng
    }
  }

  componentDidMount() {
    Geocode.setApiKey(this.props.apiKey);
    Geocode.enableDebug();

    Geocode.fromLatLng(this.state.lat, this.state.lng)
      .then(response => {
       const address = response.results[0].formatted_address

       this.setState({
         address: address ? address : ''
       })
      },
      error => {
       console.error(error);
      }
    );
  };

  shouldComponentUpdate( nextProps, nextState ){
    if (
      this.state.apiKey !== nextState.apiKey ||
      this.props.apiKey !== nextProps.apiKey ||
      this.state.state !== nextState.state
     ) {
      return true
     } else {
      return false
    }
  }

  checkBounds = (place) => {
    let lat = place.geometry.location.lat()
    let lng = place.geometry.location.lng()
    // eslint-disable-next-line
    let bounds = new google.maps.LatLngBounds(
    // eslint-disable-next-line
     new google.maps.LatLng(42.268991, -71.255329),
    // eslint-disable-next-line
     new google.maps.LatLng(42.453169, -70.970821)
    )
    //eslint-disable-next-line
    const isInBounds = bounds.contains({ lat: lat, lng: lng})
    console.log(isInBounds, 'inBounds?')
    if (isInBounds) {
      this.props.onPlaceSelected(place)
    } else {
      console.log('not in bounds')
    }
  }

render() {
  const AutocompleteInput = withScriptjs(
      withGoogleMap((props) => (
          <Autocomplete
            className="google-maps-input"
            onPlaceSelected={(place) => this.checkBounds(place)}
            types={['address']}
            options={{strictBounds: true}}
            componentRestrictions={{ country: "us" }}
          />
        )
      )
    );
    if (this.props.apiKey) {
      return (
        <div className="input-wrapper">
          <AutocompleteInput
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${this.props.apiKey}&libraries=places,drawing,geometry`}
            loadingElement={
              <div style={{ height: `100%`, width: `100%` }} />
            }
            containerElement={
              <div style={{ height: this.props.height, width: `100%` }} />
            }
            mapElement={
              <div style={{ height: `100%`, width: `100%` }} />
            }
            onPlaceSelected={(place) => this.checkBounds(place)}
          />
        </div>
      )
    } else {
      return <div className="input-wrapper">One moment...</div>
    }
  }
}
