/* global google*/
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow} from "react-google-maps"
import React, { Component } from 'react';

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    zoom={props.zoom}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
    center={props.center}
  >

    {props.markers &&
      props.markers.filter(marker =>marker.isVisible)
      .map((marker,idx, arr) =>(
        <Marker
          key={idx}
          position={{ lat: marker.lat, lng: marker.lng }}
          onClick={e=>{props.markerClicked(marker)}}
          animation = {arr.length===1 ? google.maps.Animation.BOUNCE:""}>
          {marker.isOpen && props.aplace.bestPhoto &&(
            <InfoWindow>
              <React.Fragment>
                <img src={`${props.aplace.bestPhoto.prefix}200x200${props.aplace.bestPhoto.suffix}`} alt=""/>
                <p>{props.aplace.name}</p>
              </React.Fragment>
            </InfoWindow>)}
        </Marker>
    ))}

  </GoogleMap>
))

class Map extends Component{
  render(){

    return(
      <MyMapComponent
        {...this.props}
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyCzf_g_JlklabDU1So6i1tN0qR5DxcCdGc"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%`, width: `75%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    )
  }
}
export default Map
