import React, {Component} from 'react';
import Events from '../Events';
import {Route, Switch} from 'react-router-dom';




class YourEventsContainer extends Component {
  constructor(){
    super();
    this.state = {
      events: []
    }
  }



  //adds events to user in backend serer
  addEvent = async (event, e) => {
    e.preventDefault();
    try {
      const events = await fetch('http://localhost:8000/api/addevent', { // Possibly incorrect api call
        method: 'POST',
        body: JSON.stringify(event),
        headers: {
          'Content-Type': 'application/json'
        }
      });


      const parsedResponse = await events.json();
      this.setState({events: [...this.state.events, parsedResponse.data]})
    } catch(err){
      console.log(err);
    }
  }

  //deletes the event from the user database
  deleteEvent = async (id, e) => {
    e.preventDefault();
    console.log('deleteEvent function is being called, this is the id: ', id);
    try {
      const deleteEvent = await fetch('http://localhost:8000/api/deleteevent' + id, {
        method: 'DELETE'
      });

      const parsedResponse = await deleteEvent.json();

      this.setState({events: this.state.events.filter((event, i) => event._id !== id)});
    } catch(err) {
      console.log(err);
    }
  }


  render(){
    return (
      <div>
        <ul>
          <li>{this.state.events}</li>
        </ul>
        <button onClick={this.deleteEvent}>Remove</button>

      </div>
    )
  }
}


export default YourEventsContainer;



    // <div>
      // <Events
        // events={this.state.events}
        // deleteEvent={this.deleteEvent}
        // showModal={this.showModal}
      // />
    // </div>


