import axios from 'axios';
const URL_PREFIX = 'http://localhost:3001';
    
    
const api = {
    login: function(userData) {
        return axios.post(`${URL_PREFIX}/api//users/login`, userData)
    },
    signup: function(userData) {
        return axios.post(`${URL_PREFIX}/api//users/`, userData)
    },
    createTrip: function(userData, headers) {
        return axios.post(`${URL_PREFIX}/api/trips/`, userData, headers)
    }
    ,
    getUser: function(id) {
        return axios.get(`${URL_PREFIX}/api//users/`+ `${id}`)
    },
    deleteTrip: function(id, headers) {
        return axios.delete(`${URL_PREFIX}/api/trips/`+ `${id}`, headers)
    },
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