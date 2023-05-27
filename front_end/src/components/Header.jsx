import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';


function Heading() {
    const [data, setData] = useState([{}]);

    useEffect(() => {
        fetch('http://127.0.0.1:7000/api/v1/users/48c1ef94-71ab-46d2-b5fc-b79a6d37b7e7').then(
            res => res.json()
        ).then(
            data => {
                setData(data)
                console.log(data)
            }
        )
    }, []);

    return (
        <div>
            <div class="card" style={{ "width": "18rem" }}>
                <img src="https://lh3.googleusercontent.com/ogw/AOLn63EIdidZfdc_I9RNUE7EpINxl-OgPw16WRJIx2RB=s32-c-mo" class="card-img-top" alt="..." />
                <div class="card-body">
                    <h5 class="card-title">{data.firstName} {data.lastName}</h5>
                    <h6 class="card-text">Alias: {data.alias}</h6>
                    <h6 class="card-text">Instruments: {for instrument of data.instruments{
			    instrument.name
		    }
		    } </h6>
                    <p class="card-text">Charges: N{data.price_by_hour}/hour</p>
                    <p class="card-text">Charges: N{data.price_by_hour}/hour</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        </div >
    );
}

export default Heading;
