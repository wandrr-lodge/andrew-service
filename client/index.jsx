import React from 'react';
import ReactDOM from 'react-dom';
import TotalScore from './modules/totalScore.jsx';
import Categories from './modules/Categories.jsx';

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
        <div>
          <Categories scores={[
            { name: 'Security', score: 9.4 },
            { name: 'Location', score: 9.9 },
            { name: 'Staff', score: 9.2 },
            { name: 'Atmosphere', score: 8.8 },
            { name: 'Cleanliness', score: 8.9 },
            { name: 'Facilities', score: 8.4 },
            { name: 'Value For Money', score: 9.1 }
          ]} />
        </div>
        <div id="latest-reviews"></div>
      </div>
    )

  }
}

ReactDOM.render(<App />, document.getElementById('app'));