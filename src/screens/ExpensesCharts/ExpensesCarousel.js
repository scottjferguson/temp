import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, View, Text, ScrollView } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import PieChart from '@components/Charts/PieChart';
import BarChart from '@components/Charts/BarChart';
import GaugeChart from '@components/Charts/GaugeChart';
import CashFlowChart from '@components/Charts/CashFlowChart';

import styles from './styles';

const deviceWidth = Dimensions.get('window').width;

const expenseHistory = [
  { x: 'Jan', y: 1522 },
  { x: 'Feb', y: 1343 },
  { x: 'Mar', y: 1855 },
  { x: 'Apr', y: 1114 },
  { x: 'May', y: 2107 },
  { x: 'Jun', y: 2307 },
  { x: 'Jul', y: 1507 },
  { x: 'Aug', y: 1807 },
  { x: 'Sep', y: 1907 },
  { x: 'Oct', y: 1307 },
  { x: 'Nov', y: 2207 },
  { x: 'Dec', y: 2107 },
];
const incomeHistory = [
  { x: 'Jan', y: 2442 },
  { x: 'Feb', y: 2503 },
  { x: 'Mar', y: 2605 },
  { x: 'Apr', y: 2605 },
  { x: 'May', y: 2707 },
  { x: 'Jun', y: 2507 },
  { x: 'Jul', y: 2807 },
  { x: 'Aug', y: 2850 },
  { x: 'Sep', y: 2607 },
  { x: 'Oct', y: 2907 },
  { x: 'Nov', y: 2307 },
  { x: 'Dec', y: 2707 },
];

const charts = [
  {
    title: 'Budget Goal Completion',
    id: 'Goals',
  },
  {
    title: 'Expenses By Categories',
    id: 'Categories1',
  },
  {
    title: 'Expenses By Categories',
    id: 'Categories2',
  },
  {
    title: 'Cash Flow History',
    id: 'Cash',
  },
];

export class ExpensesCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.renderSlide = this.renderSlide.bind(this);
  }
  state = {
    activeSlide: 0,
  };

  static propTypes = {
    categories: PropTypes.array,
    navigation: PropTypes.any,
  };

  getCategoriesDataForChart = formatLabel =>
    this.props.categories.map(obj => {
      label = formatLabel
        ? obj.name + '\n(' + obj.percent + '%)'
        : obj.name + '(' + obj.percent + '%)';
      return {
        x: obj.name,
        y: obj.amount,
        label: label,
      };
    });

  renderSlide({ item, index }) {
    return (
      <View pointerEvents="none" style={styles.slides}>
        <Text style={styles.chartTitle}>{item.title}</Text>
        {item.id === 'Goals' && <GaugeChart percent={65} />}
        {item.id === 'Categories1' && (
          <PieChart data={this.getCategoriesDataForChart(true)} />
        )}
        {item.id === 'Categories2' && (
          <BarChart data={this.getCategoriesDataForChart()} />
        )}
        {item.id === 'Cash' && (
          <CashFlowChart
            incomeData={incomeHistory}
            expenseData={expenseHistory}
          />
        )}
      </View>
    );
  }

  renderPagination() {
    const { activeSlide } = this.state;
    return (
      <Pagination
        dotsLength={charts.length}
        activeDotIndex={activeSlide}
        dotStyle={styles.paginationDot}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }

  render() {
    return (
      <ScrollView>
        <Carousel
          ref={c => (this.carousel = c)}
          data={charts}
          renderItem={this.renderSlide}
          onSnapToItem={index => this.setState({ activeSlide: index })}
          sliderWidth={deviceWidth}
          sliderHeight={100}
          itemWidth={deviceWidth}
          hasParallaxImages={true}
        />
        {this.renderPagination()}
      </ScrollView>
    );
  }
}

export default ExpensesCarousel;
