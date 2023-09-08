import Card from "../components/Card"
import Cert from "../components/Cert";
import TodoList from "../components/ToDoList";




const Dashboard = () => {


    return(
        <>
        <Card>
            <TodoList />
        </Card>
        <Cert />
        </>
    )
}

export default Dashboard;