import Header from '../components/Header.jsx'
import AddNewRecord from '../components/AddNewRecord.jsx'
import Summary from '../components/MonthlyExpenseSummary.jsx'


function Home() {
    return (
        <div>
            <Header />
            <AddNewRecord />
            <Summary />
        </div>
    );
}

export default Home;