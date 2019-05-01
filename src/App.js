
import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import * as API from './API'
import MyItineraries from './MyItineraries'
import Trip from './Trip'
import Throbber from './Throbber'
import './App.css'


class App extends Component {
	
  state = {
    itineraries: [],
    results: [],
    isLoading: true
  }

  componentDidMount() {
    this.getAll()
  }

  getAll = () => {
    this.setState({ 'isLoading': true })
    API.getAll().then((itineraries) => {
      this.setState({ 'itineraries': itineraries, 'isLoading': false })
    })
  }



  render() {

    const { itineraries, isLoading } = this.state

  	return (

  		<div className="app">

        <Throbber isLoading={isLoading}/>

        <Route exact path='/' render={() => (
          <MyItineraries itineraries={itineraries}/>
        )}/>

        <Route path='/trips/:itinerary_id' render={(props) => (
          <Trip {...props}/>
        )}/>

	    </div>

  	)

  }
}

export default App
