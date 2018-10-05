import React, { Component } from 'react';
import VenueList from './VenueList.js'

class SideBar extends Component {
  render(){
    return (
      <div className="sideBar">
        <input id="filter-text" type="text" placeholder="Input Museum name"/>
        <input id="filter-button" type="button" value="Filter"/>
        <VenueList venues={this.props.venues}
          listItemClicked={this.props.listItemClicked}/>
      </div>
    );
  }
}

export default SideBar;
