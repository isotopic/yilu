import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ListItineraries from './ListItineraries'

class MyItineraries extends Component{

  static propTypes = {
    itineraries: PropTypes.array.isRequired,
  }

	render(){

    const { itineraries } = this.props

		return (

		  <div className="list-itineraries">

        <div className="list-itineraries-title">

          <h1><img src="yilu.svg" alt="logo-yilu"/></h1>

        </div>


        <div className="list-itineraries-content">
            
            <img id="city" src="city.svg" alt="city"/>

            <ListItineraries itineraries={itineraries}/>

        </div>
          
      </div>

		)
	}
}

export default MyItineraries
