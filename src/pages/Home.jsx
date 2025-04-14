import Header from '../components/Header.jsx'
import AddNewRecord from '../components/AddNewRecord.jsx'
import Summary from '../components/MonthlyExpenseSummary.jsx'
import { RecordsProvider } from '../components/RecordContext.jsx'


function Home() {
    return (
        <RecordsProvider> 
            <Header />
            <AddNewRecord />
            <Summary />
        </RecordsProvider>      
    );
}

export default Home;