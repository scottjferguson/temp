import React, { Component } from 'react';
import { Dimensions, View, Image, StatusBar } from 'react-native';
import { Container, Content, Text, Button, Card, Footer } from 'native-base';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { entries } from './config';

import styles from './styles';

const deviceWidth = Dimensions.get('window').width;

class Walkthrough extends Component {
  constructor(props) {
    super(props);
    this.renderSlide = this.renderSlide.bind(this);
  }
  state = {
    activeSlide: 0,
  };

  renderSlide({ item, index }) {
    return (
      <Card style={styles.slide.container}>
        <View>
          <Image source={item.illustration} style={styles.slide.illustration} />
          <Text style={styles.slide.title}>{item.title}</Text>
          <Text numberOfLines={4} style={styles.slide.subtitle}>
            {item.subtitle}
          </Text>
          {index < 2 ? (
            <Button
              transparent
              onPress={() => this.carousel.snapToNext()}
              style={styles.slide.btnWrapper}>
              <Text style={styles.slide.btnText}>Next</Text>
            </Button>
          ) : (
            <Button
              transparent
              onPress={() => this.carousel.snapToPrev()}
              style={styles.slide.btnWrapper}>
              <Text style={styles.slide.btnText}>Previous</Text>
            </Button>
          )}
        </View>
      </Card>
    );
  }

  renderPagination() {
    const { activeSlide } = this.state;
    return (
      <Pagination
        dotsLength={entries.length}
        activeDotIndex={activeSlide}
        dotStyle={styles.paginationDot}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }

  render() {
    return (
      <Container>
        <StatusBar
          barStyle="dark-content"
          translucent={true}
          backgroundColor={'transparent'}
        />
        <Content>
          <Carousel
            ref={c => (this.carousel = c)}
            data={entries}
            renderItem={this.renderSlide}
            onSnapToItem={index => this.setState({ activeSlide: index })}
            sliderWidth={deviceWidth}
            itemWidth={deviceWidth - 50}
            hasParallaxImages={true}
            containerCustomStyle={styles.slider}
          />
          {this.renderPagination()}
        </Content>
        <Footer>
          <Button
            large
            primary
            block
            style={styles.skipBtn}
            onPress={() => this.props.navigation.navigate('Drawer')}>
            <Text> Get Started </Text>
          </Button>
        </Footer>
      </Container>
    );
  }
}

export default Walkthrough;
