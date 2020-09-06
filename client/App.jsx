/* eslint-disable */
import React from 'react';
import axios from 'axios';
import DefaultView from './modules/defaultView.jsx';
import LatestReviews from './modules/LatestReviews.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      dummyData: [{
        age_group: 2,
        atmosphere: 5,
        authdescription: 'Globetrotter',
        author_id: 1,
        cleanliness: 8,
        created_at: '2020-07-21T07:00:00.000Z',
        description: 'vulputate viverra ex sagittis. Aenean sed convallis augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae',
        facilities: 5,
        hostel_id: 1,
        id: 1,
        gender: 'Female',
        location: 3,
        name: 'rubberyfrantic',
        picture_url: 'server/database/images/img3.jpg',
        security: 1,
        staff: 6,
        total: 4.71,
        value: 5,
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
        total: 9.1,
      },
      topfour: [],
      word: 'Superb',
    };
  }

  setAverages(data) {
    const averages = {};
    let word = 'Review';
    for (const review of data) {
      for (const key in review) {
        averages[key] === undefined
          ? averages[key] = review[key]
          : averages[key] += review[key];
      }
    }
    for (const key in averages) {
      averages[key] = Math.round((averages[key] / data.length) * 10) / 10;
    }
    const { total } = averages;
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
      averages,
      word,
    });
  }

  // actual api call
  query(callback) {
    axios.get(`${window.location.href}api/reviews`)
      .then((results) => {
        callback(null, results);
      })
      .catch((error) => {
        callback(error);
      });
  }

  // copies the first four reviews in the array
  getTop(data) {
    const top = data.slice(0,4);
    this.setState({
      topfour: top,
    });
  }

  componentDidMount() {
    this.query((err, res) => {
      if (err) {
        console.log('ERROR IN GET, CLIENT ', err);
      } else {
        this.setState({
          reviews: res.data,
          mounted: true,
        });
        this.setAverages(res.data);
        this.getTop(res.data);
      }
    });
  }

  render() {
    const { mounted } = this.state;
    return (
      <div id="reviews-section">
        <div id="ratings">
          <DefaultView reviews={this.state.averages} count={this.state.reviews.length} word={this.state.word} />
        </div>
        <div id="latest-reviews">
          {mounted
            ? <LatestReviews topfour={this.state.topfour} reviews={this.state.reviews} averages={this.state.averages} count={this.state.reviews.length} word={this.state.word} />
            : <LatestReviews topfour={this.state.dummyData} reviews={this.state.dummyData} averages={this.state.averages} count={this.state.reviews.length} word={this.state.word} />}
        </div>
      </div>
    );
  }
}

export default App;
