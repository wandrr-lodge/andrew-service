import React from 'react';
import ReactDOM from 'react-dom';
import DefaultView from './modules/defaultView.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div id="reviews-section">
        <div id="ratings">
          <DefaultView />
        </div>
        <div id="latest-reviews"></div>
      </div>
    )

  }
}

ReactDOM.render(<App />, document.getElementById('app'));