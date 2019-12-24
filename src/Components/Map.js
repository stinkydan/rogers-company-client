import React from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, Marker, StreetViewPanorama } from "react-google-maps";
import { DrawingManager } from 'react-google-maps/lib/components/drawing/DrawingManager';

class Map extends React.Component {
  constructor(){
    super();
      this.mapRef = React.createRef();

      this.state = {
        zoom: 20
      }
    }

 shouldComponentUpdate( nextProps, nextState ) {
   if (this.props.height !== nextProps.height) {
     return true
   }
   if (this.props.showStreetView !== nextProps.showStreetView) {
     return true
   }
   if (this.props.houseConfirmed !== nextProps.houseConfirmed) {
     return true
   }
   return false
 }

  setZoom = () => {
    this.setState({
      zoom: this.mapRef.current.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.zoom
    })
    console.log(this.state.zoom, 'ZOOM STATE')
  }

  // CALCULATE AREA OF POLYGON

  calcArea = polyPath => {
    // eslint-disable-next-line
    const area = google.maps.geometry.spherical.computeArea(polyPath)

    return area
  }

  // SET EVENT LISTENERS IN GOOGLE MAP FOR POLYGON
  // CALC AREA WHEN USER COMPLETES A POLYGON

  setPoly = poly => {
      let polyPath = poly.getPath()

      // eslint-disable-next-line
      google.maps.event.addListener(polyPath, 'set_at', this.props.handleArea(polyPath, this.calcArea(polyPath)));
      // eslint-disable-next-line
      google.maps.event.addListener(polyPath, 'insert_at', console.log('INSERT AT RAN MAPSSS'));
      // eslint-disable-next-line
      google.maps.event.addListener(poly, 'rightclick', function(evt) {
        if (!polyPath || evt.vertex === undefined) {
          return;
        }
          poly.getPath().removeAt(evt.vertex)
        }
      );
    }

  onPolygonComplete = poly => {
    this.setPoly(poly)
    this.props.displayUserPrompt()
  }

render () {
  const AsyncMap = withScriptjs(
    withGoogleMap(props => (
      <>
        <GoogleMap
          ref={this.mapRef}
          defaultZoom={this.state.zoom}
          onZoomChanged={this.setZoom}
          defaultCenter={{ lat: this.props.center.lat, lng: this.props.center.lng }}
          defaultOptions={{
            streetViewControl: false,
            mapTypeControl: false
          }}
          // eslint-disable-next-line
          mapTypeId={google.maps.MapTypeId.SATELLITE}
         >

         {this.props.showStreetView ?
           <StreetViewPanorama
            defaultMotionTracking={false}
            defaultVisible={true}
            defaultPosition={{ lat: this.props.center.lat, lng: this.props.center.lng }}
           /> : ''
         }


        {this.props.houseConfirmed ?
         <DrawingManager
           onPolygonComplete={this.onPolygonComplete}
             // eslint-disable-next-line
           defaultDrawingMode={google.maps.drawing.OverlayType.POLYGON}
           defaultOptions={{
             drawingControl: true,
             drawingControlOptions: {
               // eslint-disable-next-line
               position: google.maps.ControlPosition.RIGHT_CENTER,
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
          /> : ''
        }

          <Marker
            google={this.props.google}
            draggable={!this.props.showStreetView}
            onDragEnd={(e) => this.props.onMarkerDragEnd(e)}
            position={{ lat: this.props.center.lat, lng: this.props.center.lng }}
          />
        </GoogleMap>
      </>
    )
  )
);
  return (
      <div className="google-map">
         <AsyncMap
           googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${this.props.apiKey}&libraries=places,drawing,geometry`}
           loadingElement={
            <div style={{ height: `100%`, width: `100%` }} />
           }
           containerElement={
            <div style={{ height: this.props.height, width: this.props.width }} />
           }
           mapElement={
            <div style={{ height: `100%`, width: `100%` }} />
           }
        />
     </div>
    );
  }
}

export default Map
