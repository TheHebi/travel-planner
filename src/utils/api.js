import axios from 'axios';
const URL_PREFIX = 'http://localhost:3001';
    
    
const api = {
    // login: function(userData) {
    //     return axios.post('http://localhost:3001/api/users/login', userData)
    // },
    // GET ROUTES
    // ----------
    // get all trips
    getTrips: function() {
        return axios.get(`${URL_PREFIX}/api/trips`);
    },
    // get a single trip
    getSingleTrip: function(id) {
        return axios.get(`${URL_PREFIX}/api/trips/${id}`)
    },
    // get a budget associated with a trip and a user
    getSingleBudget: function(tripId) {
        return axios.get(`${URL_PREFIX}/api/budgets/trips/${tripId}`)
    },

    // POST ROUTES
    // -----------
    createPost: function(body) {
        return axios.post(`${URL_PREFIX}/api/comments`, body)
    }

    // PUT ROUTES
    // ----------


    // DELETE ROUTES
    // -------------
}


export default api