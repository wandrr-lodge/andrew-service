import React from 'react';

class defualt extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <h4>Reviews & Ratings</h4>
      <TotalScore />
      <Categories />
    )
  }
}