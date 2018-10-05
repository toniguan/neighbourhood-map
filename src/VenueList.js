import React, { Component } from 'react';

class VenueList extends Component {
  render(){
    const {venues} = this.props

    return (
      <ol className="venueList">
        {venues && venues.map((myVenue, idx) =>(
          <li key={idx} className="venueItem"
            onClick={()=>{this.props.listItemClicked(myVenue, idx)}}>
            {myVenue.venue.name}
          </li>
        ))}
      </ol>
    )
  }
}

export default  VenueList;
