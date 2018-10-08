import React, { Component } from 'react';
import VenueList from './VenueList.js'

class SideBar extends Component {
  state = {
    query: "",
    venues: {}
  }

  filterVenues =()=>{
    if(this.state.query === ""){
      return this.props.venues;
    }else{
      const places = this.props.venues.filter(
        place => place.venue.name.toLowerCase().includes(this.state.query)
      )
      return places;
    }
  }
  queryChange = e=>{
    this.setState({query : e.target.value.toLowerCase().trim()})

    const markers = this.props.venues.map(place=>{
      const isMatched = place.venue.name.toLowerCase().includes(e.target.value.toLowerCase().trim());
      const marker = this.props.markers.find(marker => marker.id === place.venue.id);
      if(isMatched){
        marker.isVisible = true;
      }else {
        marker.isVisible = false;
      }
      return marker;
    });
    this.props.updateSuperState({markers});
  }
  render(){
    return (
      <div className="sideBar">
        <input id={"search"} type={"search"} placeholder="Filter Venues" onChange={this.queryChange}/>

        <VenueList
          venues={this.filterVenues()}
          markers={this.props.markers}
          listItemClicked={this.props.listItemClicked}/>
      </div>
    );
  }
}

export default SideBar;
