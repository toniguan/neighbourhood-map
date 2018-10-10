import React, { Component } from 'react';
import './App.css';

class MapContainer extends Component {
  state = {
    markers :[],
    infowindow : {},
    bounds : {},
    map: {},
  }


  initGlobalVars = ()=>{
    let infowindow = new window.google.maps.InfoWindow();
    this.setState({infowindow});
    let bounds = new window.google.maps.LatLngBounds();
    this.setState({bounds});
  }
  createMarkers=()=>{

    var myMarkers = []
    console.log(this.props.venues)
    this.props.venues.forEach(myVenue=>{
      var marker = new window.google.maps.Marker({
        position : {lat: myVenue.venue.location.lat, lng:myVenue.venue.location.lng},
        title: myVenue.venue.name,
        id : myVenue.venue.id,
      });//marker
      console.log("marker")
      marker.addListener('click', ()=>{this.markerClicked(marker,this.state.infowindow)});
      myMarkers.push(marker)
    });//forEach
    this.setState({markers : myMarkers});
  }


  showMarkers = (markers)=>{
    for(var i = 0; i < markers.length; i++){
      markers[i].setMap(this.state.map);
      this.state.bounds.extend(markers[i].position);
    }
    this.state.map.fitBounds(this.state.bounds);
  }

  hideMarkers = (markers)=>{
    for(var i = 0; i < markers.length; i++){
      markers[i].setMap(null);
    }
  }
  //lifecycle event to load (asyncronously) the Google Maps JS API (only once)
    componentDidMount() {
      if (!window.google) {
        //load Google Maps JS API, when finished, call initMap()
        var scrpt = document.createElement('script');
        scrpt.type = 'text/javascript';
        scrpt.src = `https://maps.google.com/maps/api/js?key=AIzaSyCzf_g_JlklabDU1So6i1tN0qR5DxcCdGc`;
        var first = document.getElementsByTagName('script')[0];
        first.parentNode.insertBefore(scrpt, first);
        scrpt.addEventListener('load', e => {
          this.initMap()
        })
      } else {
        //if already loaded, call initMap()
        this.initMap()
      }
    }
    initMap() {
      var amap;
      amap = new window.google.maps.Map(
        document.getElementById('map'), {
          center: {lat: 37.7749295, lng: -122.4194155},
          zoom: 13
        });

      this.setState({map:amap});
      this.initGlobalVars();
      this.createMarkers();
    }
/*
  loadMap = ()=>{
    console.log("loadmap")
    loadScript("https://maps.googleapis.com/maps/api/js?libraries=places,geometry,drawing&key=AIzaSyCzf_g_JlklabDU1So6i1tN0qR5DxcCdGc&v=3&callback=initMap")
    window.initMap = this.initMap
  }

*/
 markerClicked(marker, infowindow){
   infowindow.setContent(marker.title);
   infowindow.open(this.state.map,marker);
 }


  render() {
    return (
        <div id="map"  style={{ height: '100vh', width: '85vw' }}></div>
    )
  }
}


function loadScript(url){
  var script0 = window.document.getElementsByTagName("script")[0]
  var mscript = window.document.createElement("script")
  mscript.src = url
  mscript.async = true
  mscript.defer = true
  script0.parentNode.insertBefore(mscript, script0)

}


export default MapContainer;
