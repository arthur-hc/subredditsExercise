import React, { Component } from 'react';

class TopicCard extends Component {
  
  render() {
    const { data } = this.props
    return ( 
      <div className='div-card'>
        <div className='div-info'>
          <h4>{data.title}</h4>
          <p className='p-author'>Author: {data.author}</p>
          <a href={data.url} target="_blank" rel="noreferrer">See More</a>
        </div>
      </div>
    );
  }
}
 
export default TopicCard;