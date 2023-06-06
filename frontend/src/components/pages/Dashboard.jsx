import { useParams } from "react-router-dom";

function Dashboard(props) {
    const {userInfo} = useParams();

    console.log((userInfo.email));

    return <h1>Dashboard</h1>
}

export default Dashboard;
