import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import DefaultView from './modules/defaultView.jsx';
import LatestReviews from './modules/LatestReviews.jsx'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { far } from '@fortawesome/free-solid-svg-icons'
// import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
// library.add(far, faCalendarAlt);
import ModalWindow from './modules/ModalWindow.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      dummyData: [{
        age_group: 2,
        atmosphere: 5,
        authdescription: "Globetrotter",
        author_id: 1,
        cleanliness: 8,
        created_at: "2020-07-21T07:00:00.000Z",
        description: "vulputate viverra ex sagittis. Aenean sed convallis augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae",
        facilities: 5,
        hostel_id: 1,
        id: 1,
        location: 3,
        name: "rubberyfrantic",
        picture_url: "server/database/images/img3.jpg",
        security: 1,
        staff: 6,
        total: 4.71,
        value: 5
      }],
      mounted: false,
      averages: {
        security: 9.4,
        location: 9.9,
        staff: 9.2,
        atmosphere: 8.8,
        cleanliness: 8.9,
        facilities: 8.4,
        value: 9.1,
        total: 9.1
      },
      topfour: [],
      word: 'Superb'
    };
  }

  query(callback) {
    axios.get('/api/reviews')
      .then((results) => {
        callback(null, results);
      })
      .catch((error) => {
        callback(error);
      })
  };

  setAverages(arr) {
    let averages = {};
    let word = 'Review'
    for (let review of arr) {
      for (let key in review) {
        averages[key] === undefined
        ? averages[key] = review[key]
        : averages[key] += review[key]
      }
    }
    for (let key in averages) {
      averages[key] = Math.round((averages[key] / arr.length) * 10) / 10;
    }
    let total = averages.total;
    if (total >= 6 && total < 7) {
      word = 'Good';
    } else if (total >= 7 && total < 8) {
      word = 'Very Good';
    } else if (total >= 8 && total < 9) {
      word = 'Fabulous';
    } else if (total >= 9) {
      word = 'Fun';
    }
    this.setState({
      averages: averages,
      word: word
    });
  }

  getTop(arr) {
    let top = [arr[1], arr[2], arr[3], arr[4]];
    this.setState({
      topfour: top
    })
  }

  componentDidMount() {
    this.query((err, res) => {
      if (err) {
        console.log('ERROR IN GET, CLIENT ', err)
      } else {
        console.log(res.data);
        this.setState({
          reviews: res.data,
          mounted: true
        })
        this.setAverages(res.data)
        this.getTop(res.data)
      }
    });
  };

  render() {
    let mounted = this.state.mounted;
    return (
      <div id="reviews-section">
        <div id="ratings">
          <DefaultView reviews={this.state.averages} count={this.state.reviews.length} word={this.state.word}/>
        </div>
        <div id="latest-reviews">
          {mounted
          ? <LatestReviews reviews={this.state.topfour} />
          : <LatestReviews reviews={this.state.dummyData} />
          }
        </div>
      </div>
    )

  }
}

// ReactDOM.render(<App />, document.getElementById('app'));

export default App;