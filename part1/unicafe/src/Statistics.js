import StatisticLine from './StatisticLine'

const Statistics = ({goodVote,neutralVote,badVote,allVotes,averageOfAllVotes,positiveOfAllVotes}) => {
    return(
        <tbody>
        <tr><StatisticLine text='Good' value={goodVote}/></tr>
        <tr><StatisticLine text='Neutral' value={neutralVote}/></tr>
        <tr><StatisticLine text='Bad' value={badVote}/></tr>
        <tr><StatisticLine text='Total' value={allVotes}/></tr>
        <tr><StatisticLine text='Average' value={averageOfAllVotes}/></tr>
        <tr><StatisticLine text='Positive' value={positiveOfAllVotes}/></tr>
        </tbody>
    )
}

export default Statistics
