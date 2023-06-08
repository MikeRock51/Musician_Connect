function User(props) {
    const user = JSON.parse(sessionStorage.getItem("openUser"));

    console.log(user);
    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="card mb-3 text-bg-dark brownShadow userCard" style={{ maxWidth: "55%" }}>
                <div className="row g-2">
                    <div className="col-md-4 lightShadow">
                        <img src={user.profilePicture} className="img-fluid rounded-start" alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title secondary">{`${user.firstName} ${user.lastName}`}</h5>
                            {user.userType.toLowerCase() === 'musician' &&
                                <div className="">
                                    {/* <h6>Instruments</h6> */}
                                    <div className="list-unstyled row text-nowrap pr-2">
                                        {user.instruments.map((instrument, index) => {
                                            return (
                                                <h6 className={index === 0 ? "col-sm-6 text-bg-success" : "col-sm-6 text-info"} key={instrument.id}>
                                                    {`[ ${instrument.name} ]`}
                                                </h6>
                                            )
                                        })}
                                    </div>
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
