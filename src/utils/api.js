import axios from 'axios';

export const getTrips = async (url) => {
    const response = await axios.get(('http://localhost:3001' + url));
    const json = await response.json();
    return json
}