import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../../components/header/Header';
import ItemList from '../../components/itemList/ItemList';
import Totals from '../../components/totals/Totals';

const Month = props => (
  <div>
    <Header />
    <Totals />
    <ItemList items={props.month.items} />
  </div>
);

Month.propTypes = {
  month: PropTypes.object,
};

Month.defaultProps = {
  month: {
    monthTotal: 0,
    items: {},
  },
};

const mapStateToProps = state => ({
  month: state.dates[state.currentDate],
});

export default connect(
  mapStateToProps,
)(Month);
