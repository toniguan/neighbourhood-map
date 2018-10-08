import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import SideBar from './SideBar.js'
import Map from './Map.js'

class App extends Component {
  state = {
    venues : [],
    center :[],
    markers :[],
    zoom : 13,
    aplace : {},
    updateSuperState: obj =>{
      this.setState(obj);
    }
  }

  componentDidMount() {
    this.getVenues();
  }
  getVenueDetails=(id)=>{
    const endPoint = `https://api.foursquare.com/v2/venues/${id}?`
    const parameters = {
      client_id: "OBRGOOQFRBSSSK35KAXHZ3L0BP24QE5MYPNDLGY1DZXMT00U",
      client_secret: "QRSRJ3JRCOSYGBWY1QYAUYP1GYGDJOSYJZGQHNLPPSR3U00K",
      v: "20180110"
    }
    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response =>{
        const venue = this.state.venues.find(venue=>venue.id===id)
        this.setState({aplace:response.data.response.venue })
      })
      .catch(error =>{
        console.log("ERROR!!"  + error)
      })
    console.log(endPoint)
  }
  getVenues = ()=>{
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "OBRGOOQFRBSSSK35KAXHZ3L0BP24QE5MYPNDLGY1DZXMT00U",
      client_secret: "QRSRJ3JRCOSYGBWY1QYAUYP1GYGDJOSYJZGQHNLPPSR3U00K",
      query: "museum",
      near: "San Francisco",
      limit: 15,
      v: "20180110"
    }
    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response =>{
        console.log(response.data.response)
        const venues = response.data.response.groups[0].items;
        const center = response.data.response.geocode.center;
        const markers = venues.map(place =>{
          return {
            lat : place.venue.location.lat,
            lng : place.venue.location.lng,
            isOpen : false,
            isVisible : true,
            id : place.venue.id,
          }
        });
        this.setState({venues, center, markers});

      })
      .catch(error =>{
        console.log("ERROR!!"  + error)
      })
  }

 closeAllMarkers = ()=>{
   var myMarkers = this.state.markers.map(marker =>{
     marker.isOpen = false;
     return marker;
   });
   this.setState({markers : myMarkers})
 }

 markerClicked = (marker)=>{
   this.closeAllMarkers();
   this.setState({aplace : {}})
   marker.isOpen = true;
   this.setState({markers : Object.assign(this.state.markers, marker)})
   this.getVenueDetails(marker.id)
 }

 listItemClicked = (venue)=>{
   var myMarker = this.state.markers.find(marker => marker.id === venue.venue.id)
   this.markerClicked(myMarker);
 }
  render() {
    return (
      <div className="App">
        <header id="header">
          <h1>San Francisco Museums</h1>
        </header>
        <main id="maincontent">
          <SideBar {...this.state}
            listItemClicked={this.listItemClicked}/>
          <Map {...this.state}
            markerClicked= {this.markerClicked}
            closeAllMarkers={this.closeAllMarkers}/>
        </main>
        <footer id="footer">Using Google Maps and Foursqure API</footer>
      </div>
    )
  }
}


export default App;
