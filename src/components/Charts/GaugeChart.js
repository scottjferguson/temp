import React, { PureComponent } from 'react';
import { VictoryPie, VictoryLabel, VictoryGroup } from 'victory-native';
import { Dimensions } from 'react-native';
const deviceWidth = Dimensions.get('window').width;

import theme from '@theme/variables/myexpense';
class GaugeChart extends PureComponent {
  getData(percent) {
    return [{ x: 1, y: percent }, { x: 2, y: 100 - percent }];
  }

  render() {
    return (
      this.props.percent && (
        <VictoryGroup width={deviceWidth}>
          <VictoryPie
            standalone={true}
            innerRadius={105}
            cornerRadius={25}
            labels={() => null}
            data={this.getData(this.props.percent)}
            style={{
              data: {
                fill: ({ datum }) => {
                  const color =
                    datum.y > 30 ? theme.brandSuccess : theme.brandWarning;
                  return datum.x === 1 ? color : 'rgba(1,1,1,0.05)';
                },
              },
            }}
          />
          <VictoryLabel
            textAnchor="middle"
            verticalAnchor="middle"
            x={deviceWidth / 2}
            y={(deviceWidth * 0.75) / 2}
            text={`${Math.round(this.props.percent)}%`}
            style={{
              fontSize: 28,
              color: '#777',
            }}
          />
        </VictoryGroup>
      )
    );
  }
}

export default GaugeChart;
