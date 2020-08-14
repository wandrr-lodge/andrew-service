import style from '../css/modalwindow.module.css';
import React from 'react';
import TotalScore from './totalScore.jsx';
import Arrow from './arrow-left-solid.svg';
import Categories from './Categories.jsx';
import ModalReviewView from './ModalReviewView.jsx'

class ModalWindow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      display: 'none'
    }
  }

  handleClick(e) {
    e.preventDefault();
    let type;
    this.state.display === 'none' ? type = 'block' : type = 'none'
    this.setState({
      display: type
    });
  }


  render() {
    console.log('mjodal')
    console.log(this.props.reviews);
    return (
      <div>
        <button className={style.modalbutton} onClick={this.handleClick.bind(this)} style={{ display: this.props.buttonDisplay }}>Read all reviews</button>
        <div className={style.overlay} style={{ display: this.state.display }}>
          <div className={style.modal}>
            <div className={style.header}>
              <span onClick={this.handleClick.bind(this)}>
                <Arrow width={16} heigth={16} />
              </span>
              <h2>Reviews & Ratings</h2>
            </div>
            <div className={style.scores}>
              <TotalScore score={this.props.averages.total} word={this.props.word} reviews={this.props.count} />
              <div className={style.grid}>
              <Categories scores={[
                { name: 'Security', score: this.props.averages.security },
                { name: 'Location', score: this.props.averages.location },
                { name: 'Staff', score: this.props.averages.staff },
                { name: 'Atmosphere', score: this.props.averages.atmosphere },
                { name: 'Cleanliness', score: this.props.averages.cleanliness },
                { name: 'Facilities', score: this.props.averages.facilities },
                { name: 'Value For Money', score: this.props.averages.value }
                ]} style={{ "grid-template-columns": "repeat(2,1fr)" }}/>
              </div>
            </div>
            <div>
              <ModalReviewView reviews={this.props.reviews} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ModalWindow;