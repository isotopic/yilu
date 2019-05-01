import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as API from './API'

class Trip extends Component{

  state = {
    itinerary: {},
    segments: [],
    isLoading: true,
    types:{
      'GROUND':{
        'icon':'time_to_leave',
        'text':'Pick up from '
      },
      'AIRPORT':{
        'icon':'local_airport',
        'text':'Airport'
      },
      'FLIGHT':{
        'icon':'flight_takeoff',
        'text':'Flight'
      }
    }
  }  


  static propTypes = {
    itinerary_id: PropTypes.string,
  }

  componentDidMount() {
     this.get()
  }

  getTime = (stamp) =>{
    var date = new Date((stamp)*1000);
    var hours = date.getHours();
    hours = ("0" + hours).slice(-2);
    var minutes = "0" + date.getMinutes();
    var formattedTime = hours + ':' + minutes.substr(-2);
    return formattedTime;
  } 


  getBullet = (stamp) =>{
    var now = Math.round(new Date().getTime()/1000);
    return (now > stamp ? 'radio_button_checked' : 'radio_button_unchecked');
  } 

  getDone = (stamp) =>{
    var now = Math.round(new Date().getTime()/1000);
    return (now > stamp ? 'active' : '');
  } 

  getIcon = (type) => {
    return this.state.types[type].icon;
  }

  getText = (type) => {
    return this.state.types[type].text;
  }


  get = () => {
    this.setState({ 'isLoading': true })
    API.get(this.props.match.params.itinerary_id).then((itinerary) => {
      this.setState({ 'itinerary': itinerary, 'segments': itinerary.segments, 'isLoading': false })
    })
  }

	render(){

    const {  itinerary, segments } = this.state

		return (

        <div className="trip">
            <Link to="/"><div className="top-bar"> <i className="material-icons">arrow_back_ios</i> Overview</div></Link> 

              <h3>{itinerary.origin_iata}  <i className="material-icons">arrow_forward</i> {itinerary.destination_iata}</h3>

              {segments.map((seg) => (

                <li key={seg.segment_id} className={this.getDone(seg.departure)}>

                  <span className="trip-bullet"> <i className="material-icons">{this.getBullet(seg.departure)}</i> </span>

                  <span className="trip-time">{this.getTime(seg.departure)}</span>

                    <div className="card">

                      {seg.type == "FLIGHT" ?

                        <div>
                          <div className="trip-flight">{seg.detail.flight_number}
                              <span>Boarding {this.getTime(seg.detail.boarding)}</span>
                          </div>
                          <div className="trip-flight-ticket">{seg.origin.value}  <i className="material-icons">flight_takeoff</i> {seg.destination.value}</div>
                          <div className="trip-flight-extra">Gate {seg.detail.gate} | Seat {seg.detail.seat}
                              <span>On Time</span>
                          </div>
                        </div>

                        :

                        <div>
                          <i className="material-icons">{this.getIcon(seg.type)} </i>
                          <div className="trip-text">{this.getText(seg.type)}</div>
                          <div className="trip-text-sub">{seg.origin.value}</div>
                        </div>

                      }

                    </div>

                </li>

              ))}

              <br className="clearfix"/>

        </div>

		)

	}

}

export default Trip
