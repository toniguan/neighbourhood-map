import React, { Component } from 'react';

class Venue extends Component {
  render(){
    const {myVenue} = this.props
    return (
      <li tabIndex="0" className="venueItem"
        onClick={()=>{this.props.listItemClicked(myVenue)}}>
        <img src={myVenue.venue.categories[0].icon.prefix+"30"+myVenue.venue.categories[0].icon.suffix}  alt="icon"/>
        {myVenue.venue.name}
      </li>
    )
  }
}

export default Venue
