import style from '../css/modalwindow.module.css';
import React from 'react';
import TotalScore from './totalScore.jsx';
import Arrow from './arrow-left-solid.svg';
import Categories from './Categories.jsx';

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
    console.log(this.props.display);
    return (
      <div>
        <button className={style.modalbutton} onClick={this.handleClick.bind(this)}>Read all reviews</button>
        <div className={style.overlay} style={{ display: this.state.display }}>
          <div className={style.modal}>
            <div className={style.header}>
              <span onClick={this.handleClick.bind(this)}>
                <Arrow width={16} heigth={16} />
              </span>
              <h2>Reviews & Ratings</h2>
            </div>
            <div className={style.scores}>
              <TotalScore score="9.1" word='Superb' reviews="30" />
              <div className={style.grid}>
                <Categories scores={[
                { name: 'Security', score: 5 },
                { name: 'Location', score: 7 },
                { name: 'Staff', score: 3 },
                { name: 'Atmosphere', score: 9 },
                { name: 'Cleanliness', score: 5 },
                { name: 'Facilities', score: 2 },
                { name: 'Value For Money', score: 8 }
                ]} style={{ "grid-template-columns": "repeat(2,1fr)" }}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ModalWindow;