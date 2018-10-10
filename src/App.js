import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import SideBar from './SideBar.js'
import Map from './Map.js'


const screenWidth = window.innerWidth
             || document.documentElement.clientWidth
             || document.body.clientWidth;

class App extends Component {
  state = {
    venues : [],
    center : [],
    markers : [],
    zoom : 13,
    aplace : {}, //store the details for a selected place
    updateSuperState: obj =>{
      this.setState(obj);
    }
  }

  componentDidMount() {
    this.getVenues();
  }

  getVenueDetails = (id)=>{
    const endPoint = `https://api.foursquare.com/v2/venues/${id}?`
    const parameters = {
      client_id: "OBRGOOQFRBSSSK35KAXHZ3L0BP24QE5MYPNDLGY1DZXMT00U",
      client_secret: "QRSRJ3JRCOSYGBWY1QYAUYP1GYGDJOSYJZGQHNLPPSR3U00K",
      v: "20180110"
    }
    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response =>{
        this.setState({aplace:response.data.response.venue})
      })
      .catch(error =>{
        console.log("ERROR!!"  + error)
      })
  }

  //get 20 museums in San Francisco area
  getVenues = ()=>{
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "OBRGOOQFRBSSSK35KAXHZ3L0BP24QE5MYPNDLGY1DZXMT00U",
      client_secret: "QRSRJ3JRCOSYGBWY1QYAUYP1GYGDJOSYJZGQHNLPPSR3U00K",
      query: "museum",
      near: "San Francisco",
      limit: 20,
      v: "20180110"
    }
    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response =>{
        //console.log(response.data.response.groups[0].items)
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

 //marker click will open infowindow
 markerClicked = (marker)=>{
   this.closeAllMarkers();
   this.setState({aplace : {}})
   marker.isOpen = true;
   this.setState({markers : Object.assign(this.state.markers, marker)})
   this.getVenueDetails(marker.id)
 }

//select a listitem, same as click a marker
 listItemClicked = (venue)=>{
   var myMarker = this.state.markers.find(marker => marker.id === venue.venue.id)
   this.markerClicked(myMarker);
 }


 toggleListView = ()=>{
   console.log("menu clicked")
   if(screenWidth>=600) return;
   var drawer = document.getElementsByTagName('nav')[0];
   if(drawer.className===""){
     drawer.className="open";
   }else{
     drawer.className="";
   }
 }

 //when screen width < 600, click map will close listView
 mapClicked = ()=>{
   console.log("map is clicked")
   if(screenWidth>=600) return;
   var drawer = document.getElementsByTagName('nav')[0];
   if(drawer.className==="open" ){
     drawer.className = "";
   }
 }
  render() {
    return (
      <div className="App">
        <header id="header">
          <div tabIndex="0" className="header_menu" onClick={this.toggleListView}>
            <i className="fa fa-bars"></i>
          </div>
          <h1 className="header_title">San Francisco Museums</h1>
        </header>

        <main id="maincontent">
          <nav>
            <SideBar {...this.state}
              listItemClicked={this.listItemClicked}/>
          </nav>
          <div className="map">
            <Map {...this.state}
              markerClicked= {this.markerClicked}
              mapClicked={this.mapClicked}
              closeAllMarkers={this.closeAllMarkers}/>
          </div>

        </main>
          <footer id="footer">Using Google Maps and Foursqure API</footer>

      </div>
    )
  }
}

export default App;
