import React from 'react';
import ReactDom from 'react-dom';

class App extends React.compoment {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div id="reviews-section">
        <div id="ratings"></div>
        <div id="latest-reviews"></div>
      </div>
    )

  }
}