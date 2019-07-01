import React from 'react'
import { withGoogleMap, GoogleMap, withScriptjs, Marker, Polygon } from "react-google-maps";
import { DrawingManager } from 'react-google-maps/lib/components/drawing/DrawingManager'
import Autocomplete from 'react-google-autocomplete';
import Geocode from "react-geocode";
// import MeasureTool from 'measuretool-googlemaps-v3'

Geocode.setApiKey("AIzaSyCDz0crm3ADVeHrUC_6r2Ye-bDZG5Bofrk");
Geocode.enableDebug();

class Map extends React.Component {
  constructor( props ){
    super( props );
    this.mapRef = React.createRef();
    this.polygonRef = React.createRef();

    this.markerRef = React.createRef();

      this.state = {
        zoom: 15,
        address: '',
        city: '',
        area: '',
        state: '',
        mapPosition: {
        lat: this.props.center.lat,
        lng: this.props.center.lng
        },
       markerPosition: {
        lat: this.props.center.lat,
        lng: this.props.center.lng
     },
     measurementMarkers: [],
   }
 }
/**
  * Get the current address from the default map position and set those values in the state
  */
 componentDidMount() {
  Geocode.fromLatLng( this.state.mapPosition.lat , this.state.mapPosition.lng )
  .then(response => {
    const address = response.results[0].formatted_address,
     addressArray =  response.results[0].address_components,
     city = this.getCity( addressArray ),
     area = this.getArea( addressArray ),
     state = this.getState( addressArray );

    console.log( 'city', city, area, state );

    this.setState( {
     address: ( address ) ? address : '',
     area: ( area ) ? area : '',
     city: ( city ) ? city : '',
     state: ( state ) ? state : '',
    } )
   },
   error => {
    console.error(error);
   }
  );
 };
/**
  * Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
  *
  * @param nextProps
  * @param nextState
  * @return {boolean}
  */
 shouldComponentUpdate( nextProps, nextState ){
   if (
     this.state.markerPosition.lat !== this.props.center.lat ||
     this.state.address !== nextState.address ||
     this.state.city !== nextState.city ||
     this.state.area !== nextState.area ||
     this.state.state !== nextState.state ||
     this.state.measurementMarkers !== nextState.measurementMarkers
    ) {
     return true
    } else if ( this.props.center.lat === nextProps.center.lat ){
     return false
   }
 }
 //  MY CHANGES
 // componentDidUpdate(prevProps, prevState) {
 //   if (prevProps.address !== this.state.address) {
 //     this.setState({ address: this.props.address})
 //   }
 // }

/**
  * Get the city and set the city input value to the one selected
  *
  * @param addressArray
  * @return {string}
  */
 getCity = ( addressArray ) => {
  let city = '';
  for( let i = 0; i < addressArray.length; i++ ) {
   if ( addressArray[ i ].types[0] && 'administrative_area_level_2' === addressArray[ i ].types[0] ) {
    city = addressArray[ i ].long_name;
    return city;
   }
  }
 };
/**
  * Get the area and set the area input value to the one selected
  *
  * @param addressArray
  * @return {string}
  */
 getArea = ( addressArray ) => {
  let area = '';
  for( let i = 0; i < addressArray.length; i++ ) {
   if ( addressArray[ i ].types[0]  ) {
    for ( let j = 0; j < addressArray[ i ].types.length; j++ ) {
     if ( 'sublocality_level_1' === addressArray[ i ].types[j] || 'locality' === addressArray[ i ].types[j] ) {
      area = addressArray[ i ].long_name;
      return area;
     }
    }
   }
  }
 };
/**
  * Get the address and set the address input value to the one selected
  *
  * @param addressArray
  * @return {string}
  */
 getState = ( addressArray ) => {
  let state = '';
  for( let i = 0; i < addressArray.length; i++ ) {
   for( let i = 0; i < addressArray.length; i++ ) {
    if ( addressArray[ i ].types[0] && 'administrative_area_level_1' === addressArray[ i ].types[0] ) {
     state = addressArray[ i ].long_name;
     return state;
    }
   }
  }
 };
/**
  * And function for city,state and address input
  * @param event
  */
 onChange = ( event ) => {
  this.setState({ [event.target.name]: event.target.value });
 };
/**
  * This Event triggers when the marker window is closed
  *
  * @param event
  */
  setZoom = () => {
    this.setState({
      zoom: this.mapRef.current.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.zoom
    })
    console.log(this.state.zoom, 'ZOOM STATE')
  };
/**
  * When the user types an address in the search box
  * @param place
  */
 onPlaceSelected = ( place ) => {

  const address = place.formatted_address,
     addressArray =  place.address_components,
     city = this.getCity( addressArray ),
     area = this.getArea( addressArray ),
     state = this.getState( addressArray ),
     latValue = place.geometry.location.lat(),
     lngValue = place.geometry.location.lng();
  // Set these values in the state.
    this.setState({
       address: ( address ) ? address : '',
       area: ( area ) ? area : '',
       city: ( city ) ? city : '',
       state: ( state ) ? state : '',
       markerPosition: {
        lat: latValue,
        lng: lngValue
       },
       mapPosition: {
        lat: latValue,
        lng: lngValue
       },
    })
  };
/**
  * When the marker is dragged you get the lat and long using the functions available from event object.
  * Use geocode to get the address, city, area and state from the lat and lng positions.
  * And then set those values in the state.
  *
  * @param event
  */
 onMarkerDragEnd = ( event ) => {
  console.log( 'event', event );
  let newLat = event.latLng.lat(),
   newLng = event.latLng.lng(),
   // eslint-disable-next-line
   addressArray = [];
Geocode.fromLatLng( newLat , newLng ).then(
   response => {
    const address = response.results[0].formatted_address,
     addressArray =  response.results[0].address_components,
     city = this.getCity( addressArray ),
     area = this.getArea( addressArray ),
     state = this.getState( addressArray );
this.setState( {
     address: ( address ) ? address : '',
     area: ( area ) ? area : '',
     city: ( city ) ? city : '',
     state: ( state ) ? state : ''
    } )
   },
   error => {
    console.error(error);
   }
  );
 };

addLatLng = (event) => {
  this.setState({
    measurementMarkers: [...this.state.measurementMarkers, {
      id: this.state.measurementMarkers.length,
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    }]
  })
  console.log(this.state.measurementMarkers, 'OG STATE FROM CLICKING MAP')
}

onMeasureDragEnd = poly => {
  // const newPosition = this.markerRef.current
  const polyArray = poly.getPath().getArray()

  let paths = []

  polyArray.forEach(path => {
    paths.push({ lat: path.lat(), lng: path.lng() })
  })

  this.setState({ measurementMarkers: paths })
  // eslint-disable-next-line
  const area = google.maps.geometry.spherical.computeArea(poly.getPath())
  console.log(area, 'AREA*****')

  // const lat = event.latLng.lat()
  // const lng = event.latLng.lng()
  //
  // const newMarkers = this.state.measurementMarkers.map(marker => {
  //   if (marker.id === newPosition._reactInternalFiber.index) {
  //     const update = {
  //       id: marker.id,
  //       lat: lat,
  //       lng: lng
  //     }
  //     console.log(update, 'UPDATED MARKER')
  //     return update
  //   } else {
  //     console.log(marker, 'UNCHANGED MARKERS')
  //     return marker
  //   }
  // })
  // console.log(newMarkers, 'NEWmaRKERS')
  // this.setState({ measurementMarkers: newMarkers })
}

render () {
  const AsyncMap = withScriptjs(
    withGoogleMap(props => (
        <GoogleMap
          ref={this.mapRef}
          onClick={(e) => this.addLatLng(e)}
          google={this.props.google}
          defaultZoom={this.state.zoom}
          onZoomChanged={this.setZoom}
          defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
          onPolygonComplete={props.onMeasureDragEnd}
         >
         <DrawingManager
          onPolygonComplete={this.onMeasureDragEnd}
             // eslint-disable-next-line
           defaultDrawingMode={google.maps.drawing.OverlayType.POLYGON}
           defaultOptions={{
             drawingControl: true,
             drawingControlOptions: {
                  // eslint-disable-next-line
               position: google.maps.ControlPosition.TOP_CENTER,
               drawingModes: [
                    // eslint-disable-next-line
                 google.maps.drawing.OverlayType.POLYGON
               ],
             },
             polygonOptions: {
               fillColor: `rgba(123, 158, 54, 1)`,
               fillOpacity: 0.4,
               strokeWeight: 5,
               clickable: false,
               editable: true,
               zIndex: 1,
             }
            }}
          />
          {/* For Auto complete Search Box */}
          <Autocomplete
             className="google-maps-input"
             onPlaceSelected={ this.onPlaceSelected }
             types={['address']}
             componentRestrictions={{ country: "us" }}
          />
          {/*Marker*/}
          <Marker
            google={this.props.google}
            draggable={true}
            // onDragEnd={this.onMarkerDragEnd}
            position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
          />
          {/*this.state.measurementMarkers.map((marker, i) => (
              <Marker
                ref={this.markerRef}
                draggable={true}
                onDragEnd={(e) => this.onMeasureDragEnd(e)}
                position={{ lat: marker.lat, lng: marker.lng }}
                key={marker.id}
              />
          ))*/}
        <Polygon
          ref={this.polygonRef}
          path={this.state.measurementMarkers}
          editable={true}
          draggable={false}
          geodesic={true}
          options={{
              strokeColor: "#ff2527",
              fillColor: "rgba(123, 158, 54, 1)",
              fillOpacity: "0.4",
              strokeOpacity: 0.75,
              strokeWeight: 2,
          }}
        />
      </GoogleMap>
    )
  )
);
  let map;
    if( this.props.center.lat !== undefined ) {
     map = <div className="google-map">
               <AsyncMap
               googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCDz0crm3ADVeHrUC_6r2Ye-bDZG5Bofrk&libraries=places,drawing,geometry"
               loadingElement={
                <div style={{ height: `100%` }} />
               }
               containerElement={
                <div style={{ height: this.props.height }} />
               }
               mapElement={
                <div style={{ height: `100%` }} />
               }
              />
           </div>
    } else {
       map = <div style={{ height: this.props.height }} />
     }
    return( map )
  }
}

export default Map
