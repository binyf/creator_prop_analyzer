import { ResponsiveRadar } from '@nivo/radar'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.


export default function RadarGraph(props) {
    const sumValues = (obj) => Object.values(obj).reduce((a,b) => a+b,0);
    return(
        <ResponsiveRadar
            data={props.data}
            keys={[ "비율(%)" ]}
            indexBy="혐오분류"
            valueFormat=">-.2f"
            margin={{ top: 50, right: 50, bottom: 100, left: 50 }}
            borderColor={{ from: 'color', modifiers: [] }}
            gridLevels={12}
            gridLabelOffset={36}
            dotSize={2}
            dotColor={{ from: 'color', modifiers: [] }}
            dotBorderWidth={2}
            colors={sumValues(props.data) > 50 ? 'red' : 'green'}
            fillOpacity={0.3}
            blendMode="multiply"
            motionConfig="wobbly"
            maxValue = {sumValues(props.data) > 50 ? 100 : 20}
        />
    )
}