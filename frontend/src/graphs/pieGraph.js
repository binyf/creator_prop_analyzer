import { ResponsivePie } from '@nivo/pie'


export default function PieGraph(props){
    return(
    <ResponsivePie
        data={props.data}
        margin={{ top: 30, right: 0, bottom: 50, left: window.innerWidth*0.05 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        colors={{ scheme: 'accent' }}
        enableArcLabels = {false}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabel="label"
        arcLinkLabelsColor={{ from: 'color' }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'etc'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'lgbtq'
                },
                id: 'lines'
            },
        ]}
    />
)
    }