import ChartistGraph from 'react-chartist'
import React from 'react'

const Chart = (props) => {
    let labelsData = [];
    
    if ( props.DataChart !== null ) {
        
        for( let i = 0; i < props.DataChart.chart.data.labels.length; i++ ) {
            labelsData[i] = props.DataChart.chart.data.labels[i]
        }

        // props.DataChart.chart.data.labels.map( (d, index) => { labelsData[index] = d; return labelsData; })
        let data = {
            labels: labelsData,
            series: [ props.DataChart.chart.data.series[0], props.DataChart.chart.data.series[1] ]
        }

        let options = {
            width: '100%',
            height: '200px',
            chartPadding: 15,
            high: 100,
            low: 0,
            axisX: {
                labelInterpolationFnc: function(value) {
                    return value
                }
            },
        }

        let type = 'Bar'

        return(
            <ChartistGraph
                data={ data }
                options={ options }
                type={ type }
            />
        )
    } else {
        return('')
    }
}

export default Chart;
