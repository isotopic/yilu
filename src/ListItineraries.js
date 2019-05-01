import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class ListItineraries extends Component{

  static propTypes = {
    itineraries: PropTypes.array.isRequired,
  }

	render(){

    const { itineraries } = this.props

		return (

        <div className="itineraries-sublist">

          <h2><i className="material-icons">card_travel</i> My trips</h2>

            <ol className="">

              {itineraries.map((itinerary) => (

                    <Link to={`/trips/${itinerary.itinerary_id}`}>
                <li key={itinerary.itinerary_id} >

                      {itinerary.origin_iata} 
                        <i className="material-icons">arrow_forward</i>
                        {itinerary.destination_iata}

                </li>
                    </Link>

              ))}

            </ol>

        </div>

		)

	}

}

export default ListItineraries
