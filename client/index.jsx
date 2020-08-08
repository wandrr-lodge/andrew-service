import React from 'react';
import ReactDOM from 'react-dom';
import TotalScore from './modules/totalScore.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div id="reviews-section">
        <div id="ratings">
          <TotalScore score={13} word={'good'} reviews={null} />
        </div>
        <div id="latest-reviews"></div>
      </div>
    )

  }
}

ReactDOM.render(<App />, document.getElementById('app'));