import React from 'react';

const StatisticLine = ({text, value}) => {
    return(
        <React.Fragment>
            <td>{text}</td>
            {text==='Positive' ? <td>{value}%</td> : <td>{value}</td>}
        </React.Fragment>
    )
}

export default StatisticLine
