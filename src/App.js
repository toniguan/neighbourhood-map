import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import SideBar from './SideBar.js'

class App extends Component {
  state = {
    venues : [],
    map : {},
    markers :[],
    infowindow : {},
    bounds : {},
  }

  getVenues = ()=>{
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "OBRGOOQFRBSSSK35KAXHZ3L0BP24QE5MYPNDLGY1DZXMT00U",
      client_secret: "QRSRJ3JRCOSYGBWY1QYAUYP1GYGDJOSYJZGQHNLPPSR3U00K",
      query: "museum",
      near: "San Francisco",
      v: "20180110"
    }
    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response =>{
        this.setState({venues : response.data.response.groups[0].items}, this.loadMap)

      })
      .catch(error =>{
        console.log("ERROR!!"  + error)
      })
  }

  initGlobalVars = ()=>{
    let infowindow = new window.google.maps.InfoWindow();
    this.setState({infowindow});
    let bounds = new window.google.maps.LatLngBounds();
    this.setState({bounds});
  }
  createMarkers=()=>{
    var myMarkers = []
    this.state.venues.map(myVenue=>{
      var marker = new window.google.maps.Marker({
        position : {lat: myVenue.venue.location.lat, lng:myVenue.venue.location.lng},
        title: myVenue.venue.name,
        id : myVenue.venue.id,
      });//marker
      marker.addListener('click', ()=>{this.markerClicked(marker,this.state.infowindow)});
      myMarkers.push(marker)
    });//map
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
  componentDidMount() {
    this.getVenues()
  }

  loadMap = ()=>{
    loadScript("https://maps.googleapis.com/maps/api/js?libraries=places,geometry,drawing&key=AIzaSyCzf_g_JlklabDU1So6i1tN0qR5DxcCdGc&v=3&callback=initMap")
    window.initMap = this.initMap
  }

  initMap = ()=>{
    let amap = new window.google.maps.Map(document.getElementById('map'), {
     center: {lat: 37.7749295, lng: -122.4194155},
     zoom: 8
    });
    this.setState({map:amap});
    this.initGlobalVars();
    this.createMarkers();
    this.showMarkers(this.state.markers);
 }// intiMap

 markerClicked(marker, infowindow){
   infowindow.setContent(marker.title);
   infowindow.open(this.state.map,marker);
 }


 listItemClicked(venue, idx){
   this.hideMarkers(this.state.markers);
   console.log("id is " + idx);
   console.log(venue);

  // this.state.markers.filter( marker => marker.id == venue.venue.id);


  // console.log({this.state.markers});

 }
  render() {
    return (
      <div className="App">
        <SideBar
          venues={this.state.venues}
          listItemClicked={this.listItemClicked}/>
        <div id="map"></div>
      </div>
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


export default App;
