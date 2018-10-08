import React, { Component } from 'react';
import Venue from './Venue.js'

class VenueList extends Component {
  render(){
    const {venues,markers} = this.props

    return (
      <ol className="venueList">
        {venues && venues.map((myVenue, idx) =>(

            <Venue key={idx}
              myVenue={myVenue}
              listItemClicked={this.props.listItemClicked}/>)

        )}
      </ol>
    )
  }
}

export default  VenueList;
