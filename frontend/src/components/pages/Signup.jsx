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
                <input type="password" name="password"
                    className="form-control" id="inputPassword4"
                    placeholder="Password" required />
            </div>
            <div className="col-md-6">
                <label for="inputPassword4" className="form-label">Confirm Password</label>
                <input type="password" name="confirm-password"
                    className="form-control" id="inputPassword4"
                    placeholder="Confirm Password" required />
            </div>
            <div className="col-md-6">
                <label for="inputState" className="form-label">State</label>
                <select id="inputState" className="form-select">
                    <option disabled selected hidden>Choose...</option>
                    <option>Abuja</option>
                </select>
            </div>
            <div className="col-md-6">
                <label for="inputCity" className="form-label">City</label>
                <select id="inputState" className="form-select">
                    <option disabled selected hidden>Choose...</option>
                    <option>Dustse-Alhaji</option>
                </select>
            </div>
            <div className="col-md-6">
                <label for="inputUsertype" className="form-label">Account Type</label>
                <select id="inputUsertype" className="form-select"
                    name="userType">
                    <option disabled selected hidden>Choose...</option>
                    <option>Client</option>
                    <option>Musician</option>
                </select>
            </div>
            <div className="col-md-6">
                <label className="form-label">Price Per Hour</label>
                <input type="text" className="form-control" name="price_by_hour"
                    id="inputPrice" placeholder="How much do you charge per hour?" />
            </div>
            <div class="mb-3">
                <label for="media" class="form-label">Upload profile picture:</label>
                <input type="file" class="form-control form-control-sm"
                id="formFileSm" name="dp" accept="image/*" />
            </div>
            <div className="col-12">
                <button type="submit" className="btn">Create my account</button>
            </div>
        </form>
    )
}

export default Signup;
