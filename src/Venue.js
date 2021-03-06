import React, { Component } from 'react';

//the venue item in ListView
class Venue extends Component {
  render(){
    const {myVenue} = this.props
    return (
      <li tabIndex="0" role="button" className="venueItem"
        onClick={()=>{this.props.listItemClicked(myVenue)}}>
        <img src={myVenue.venue.categories[0].icon.prefix+"30"+myVenue.venue.categories[0].icon.suffix}  alt="icon"/>
        {myVenue.venue.name}
      </li>
    )
  }
}

export default Venue
