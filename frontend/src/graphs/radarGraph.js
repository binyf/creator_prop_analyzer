import { ResponsiveRadar } from '@nivo/radar'


export default function RadarGraph(props) {
    const radarDataSum = (obj) => {
        let sum = 0
        for(let i in obj){
            sum += obj[i]['비율(%)']
        }
        return sum
    };
    const maxData = (obj) =>{
        let max = 0
        for(let i in obj){
            if (obj[i]['비율(%)'] > max){
                max = obj[i]['비율(%)']
            }
        }
        return max
    }
    return(
        <ResponsiveRadar
            data={props.data}
            keys={[ "비율(%)" ]}
            indexBy="혐오분류"
            valueFormat=">-.2f"
            margin={{ top: 50, right: 0, bottom: 100, left: window.innerWidth*0.05 }}
            borderColor={{ from: 'color', modifiers: [] }}
            gridLevels={12}
            gridLabelOffset={36}
            dotSize={2}
            dotColor={{ from: 'color', modifiers: [] }}
            dotBorderWidth={2}
            colors={(radarDataSum(props.data) > 25 | maxData(props.data) > 10 ) > 25 ? 'red' : ((radarDataSum(props.data) > 15 | maxData(props.data) > 5 ) ? 'orange' : 'green')}
            fillOpacity={0.3}
            blendMode="multiply"
            motionConfig="wobbly"
            maxValue = {(radarDataSum(props.data) > 25 | maxData(props.data) > 10 ) ? maxData(props.data)*1.5 : ((radarDataSum(props.data) > 15 | maxData(props.data) > 5 ) ? maxData(props.data)*2 : 10)}
        />
    )
}