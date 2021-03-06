import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAPI } from './actions';
import './App.css';
import TopicCard from './components/TopicCard';

class App extends Component {
  constructor() {
    super();
    this.state = {
      subject: null,
      lastUpdate: null,
    };
  };

  componentDidMount() {
    const TWELVE_HOURS = 12;
    const TEN_MINUTES = 10;
    const currentDate = new Date();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    if(minutes < TEN_MINUTES) {
      minutes = `0${minutes}`
    }
    const seconds = currentDate.getSeconds();
    let period = 'AM';
    if(hours > TWELVE_HOURS) {
      hours = hours - TWELVE_HOURS;
      period = 'PM'
    }
    const time = `${hours}:${minutes}:${seconds} ${period}`
    this.setState({lastUpdate: time})
    const { fetch } = this.props;
    fetch();
  }

  render() {
    const { subject, lastUpdate } = this.state;
    const { isLoading, reactData, frontEndData, fetch } = this.props;
    const currentHour = () => {
      const TWELVE_HOURS = 12;
      const TEN_MINUTES = 10;
      const currentDate = new Date();
      let hours = currentDate.getHours();
      let minutes = currentDate.getMinutes();
      if(minutes < TEN_MINUTES) {
        minutes = `0${minutes}`
      }
      const seconds = currentDate.getSeconds();
      let period = 'AM' 
      if(hours > TWELVE_HOURS) {
        hours = hours - TWELVE_HOURS;
        period = 'PM'
      }
      return `${hours}:${minutes}:${seconds} ${period}`
    };

    const handleChange = ({target}) => {
      const { name } = target 
      const value = target.type === 'checkbox' ? target.checked : target.value;
      this.setState({ [name]: value })
    };

    const refresh = () => {
      if(subject) {
        const time = currentHour();
        this.setState({lastUpdate: time})
        fetch();
      };
    };

    const subjectToRender = () => {
      const { subject } = this.state;
      if(subject === 'ReactJS') {
        return reactData;
      }
      return frontEndData;
    };
    
    return (
      <div className="App">
        <header className="App-header">
         <h1>Selected: {subject}</h1>
        </header>
        <div>
          <form>
            <label htmlFor='subject'>
              <select name='subject' onChange={(e) => handleChange(e)}>
                <option value=''>Select</option>
                <option value='ReactJS'>ReactJS</option>
                <option value='FrontEnd'>FrontEnd</option>
              </select>
            </label>
            <button type='button' onClick={() => refresh()}>Refresh</button>
            {subject && (<p>Last updated at {lastUpdate}</p>)}
          </form>
        </div>
          <div>
            <h3>Topics</h3>
            {!subject && !isLoading && (<p>Select a topic to display here</p>)}
            {isLoading && (<img src='https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif' alt='Loading'/>)}
            {subject && !isLoading && (
              <div>
                {subjectToRender().map((topicInfo, index) => <TopicCard key={index} data={topicInfo.data}/>)}
              </div>
            )}
          </div>
      </div>
    );
  };
};

const mapStateToProps = (state) => ({
  isLoading: state.redditReducer.isLoading,
  reactData: state.redditReducer.reactData,
  frontEndData: state.redditReducer.frontEndData,
})

const mapDispatchToProps = (dispatch) => ({
  fetch: (subject) => dispatch(fetchAPI(subject))
})

export default connect (mapStateToProps, mapDispatchToProps) (App);
