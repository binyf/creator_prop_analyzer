import { ResponsiveBar } from '@nivo/bar'


export default function BarGraph(props) {
    return(
    <ResponsiveBar
    keys={[
    '혐오표현',
    '일반 악성 댓글',
    'clean'
  ]}
      data = {props.data}
      indexBy="비율"
      margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
      padding={0.3}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={['#ff8d75','#ffb46d','#66bf71']}
      borderColor={{
          from: 'color',
          modifiers: [
              [
                  'darker',
                  1.6
              ]
          ]
      }}
      maxValue={100}
      axisTop={null}
      axisRight={null}
    //   axisBottom={{
    //       tickSize: 5,
    //       tickPadding: 5,
    //       tickRotation: 0,
    //       legend: '비율',
    //       legendPosition: 'middle',
    //       legendOffset: 32
    //   }}
      axisLeft={null}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor='white'

      label = {d => `${d.id}`}
      role="application"
      markers={[
        {
            axis:              'y',
            position:          'right',
            legendOffsetX:     -30,
            legendOffsetY:     0,
            value:             70,
            lineStyle:         {stroke: 'red', strokeWidth: 3},
            legend:            `경고`,
            legendOrientation: 'horizontal',
            textStyle:         {fill: 'red', fontWeight: 'bold'}
        },
        {
            axis:              'y',
            position:          'right',
            legendOffsetX:     -30,
            legendOffsetY:     0,
            value:             40,
            lineStyle:         {stroke: 'orange', strokeWidth: 3},
            legend:            `주의`,
            legendOrientation: 'horizontal',
            textStyle:         {fill: 'orange', fontWeight: 'bold'}
        },
    ]}
    defs={[
        {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: 'rgba(255, 0, 0, 0.3)',
            rotation: -45,
            lineWidth: 6,
            spacing: 10
        }
    ]}
    fill={[
        {
            match: {
                id: '일반 악성 댓글'
            },
            id: 'lines'
        },
        {
            match: {
                id: '혐오표현'
            },
            id: 'lines'
        },
    ]}
  />
    )
    }