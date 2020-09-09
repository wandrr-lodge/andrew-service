import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import { shallow } from 'enzyme';
import App from '../client/index.jsx';
import DefaultView from '../client/modules/defaultView.jsx';
import LatestReviews from '../client/modules/LatestReviews.jsx';

describe('App', () => {
  it('Should render and match snapshot', () => {
    const appcomponent = shallow(<App />)
    expect(appcomponent).toMatchSnapshot()
  })
});

describe('Default View', () => {
  it('Should render and match snapshot', () => {
    const defview = shallow(<DefaultView reviews={{total: null}} word="Good" count={5}/>)
    expect(defview).toMatchSnapshot()
  })
});

describe('LatestReviews', () => {
  it('Should render and match snapshot', () => {
    const lastestrev = shallow(<LatestReviews />)
    expect(lastestrev).toMatchSnapshot()
  })
});
