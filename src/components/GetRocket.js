// GET ROCKET Component
import { useEffect, useState } from "react";
import axios from "axios";

const GetRocket = () => {
    const [rockets, GetRockets] = useState([]);
    useEffect(() => { 
        axios({
            url: 'https://api.spacexdata.com/v4/rockets',
            method: 'GET',
            dataResponse: 'json'
        }).then ((response) => {
            console.log(response.data);
            GetRockets(response.data)
        })
    }, [])
    return(
        <form action="GET">
            <label htmlFor="rocket">SELECT UP TO 4 ROCKETS!</label>
            <select name="" id="">
                <option value=""></option>
                <option value=""></option>
                <option value=""></option>
                <option value=""></option>                
            </select>

        </form>
    )
}

export default GetRocket;