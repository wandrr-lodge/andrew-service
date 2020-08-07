import React from 'react';

class TotalScore extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div>
      <div className="score">{props.score}</div>
      <div className="words">
        <div id="scoreWord">{props.word}</div>
        <div id="totalReviews">{props.reviews}</div>
      </div>
    </div>
    )
  }
}