import Navbar from "../Navbar";

function Signup() {
    return (
        <form className="row g-3 mx-5">
            <div className="col-md-6">
                <label for='autoSizingInput' className="form-label">First Name</label>
                <input type="text" name="fName" className="form-control" id="autoSizingInput" placeholder="First Name" required />
            </div>
            <div className="col-md-6">
                <label for='autoSizingInput' className="form-label">Last Name</label>
                <input type="text" name='lName' className="form-control" id="autoSizingInput" placeholder="Last Name" required />
            </div>
            <div className="col-md-6">
                <label for='autoSizingInput' className="form-label">Alias</label>
                <input type="text" name="alias" className="form-control" id="autoSizingInput" placeholder="Alias" />
            </div>
            <div className="col-md-6">
                <label for="inputEmail4" className="form-label">Email</label>
                <input type="email" className="form-control" id="inputEmail4" placeholder="Email" />
            </div>
            <div className="col-md-6">
                <label for="inputPassword4" className="form-label">Password</label>
                <input type="password" name="password" className="form-control" id="inputPassword4" placeholder="Password" />
            </div>
            <div className="col-md-4">
                <label for="inputState" className="form-label">State</label>
                <select id="inputState" className="form-select">
                    <option selected>Choose...</option>
                    <option>Abuja</option>
                </select>
            </div>
            <div className="col-md-6">
                <label for="inputCity" className="form-label">City</label>
                <select id="inputState" className="form-select">
                    <option selected>Choose...</option>
                    <option>Dustse-Alhaji</option>
                </select>
            </div>
            <div className="col-md-2">
                <label for="inputZip" className="form-label">Zip</label>
                <input type="text" className="form-control" id="inputZip" />
            </div>
            <div className="col-12">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="gridCheck" />
                    <label className="form-check-label" for="gridCheck">
                        Check me out
                    </label>
                </div>
            </div>
            <div className="col-12">
                <button type="submit" className="btn btn-primary">Sign in</button>
            </div>
        </form>
    )
}

export default Signup;
