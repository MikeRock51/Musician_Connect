function User(props) {
    const user = JSON.parse(sessionStorage.getItem("openUser"));

    console.log(user);
    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="card mb-3 userCard" style={{ maxWidth: "50%" }}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img className="py-auto" src={user.profilePicture} className="img-fluid rounded-start" alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{`${user.firstName} ${user.lastName}`}</h5>
                            {user.userType.toLowerCase() === 'musician' &&
                                <div>
                                    <h6>Instruments</h6>
                                    <ul>
                                        {user.instruments.map((instrument, index) => {
                                            return <li key={instrument.id}>
                                                {index < user.instruments.length - 1 ? instrument.name + ", " : instrument.name}
                                            </li>
                                        })}
                                    </ul>
                                </div>}
                            <p className="card-text"></p>
                            <p className="card-text">{user.description}</p>
                            <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User;
