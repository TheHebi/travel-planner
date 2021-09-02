import axios from 'axios';
const URL_PREFIX = 'http://localhost:3001';
    
    
const api = {
    login: function(userData) {
        return axios.post(`${URL_PREFIX}/api/users/login`, userData)
    },
    signup: function(userData) {
        return axios.post(`${URL_PREFIX}/api//users/`, userData)
    },
    createTrip: function(userData, headers) {
        return axios.post(`${URL_PREFIX}/api/trips/`, userData, headers)
    },
    getUser: function(id) {
        return axios.get(`${URL_PREFIX}/api//users/${id}`)
    },
    deleteTrip: function(id, headers) {
        return axios.delete(`${URL_PREFIX}/api/trips/${id}`, headers)
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
    getSingleBudget: function(tripId, userId) {
        return axios.get(`${URL_PREFIX}/api/budgets/trips/${tripId}/${userId}`);
    },
    // get a single budget category by id
    getSingleBudgetCategory: function(categoryId) {
        return axios.get(`${URL_PREFIX}/api/categories/${categoryId}`);
    },
    // get all comments associated with a trip
    getAllTripComments: function(tripId) {
        return axios.get(`${URL_PREFIX}/api/comments/trips/${tripId}`)
    },
    // get single comment by id
    getSingleComment: function(commentId) {
        return axios.get(`${URL_PREFIX}/api/comments/${commentId}`);
    },
    // get all users
    getAllUsers: function() {
        return axios.get(`${URL_PREFIX}/api/users`);
    },
    // get all plans by trip id
    getAllTripPlans: function(tripId) {
        return axios.get(`${URL_PREFIX}/api/plans/trips/${tripId}`);
    },

    // POST ROUTES
    // -----------
    createBudgetCategory: function(body, headers) {
        return axios.post(`${URL_PREFIX}/api/categories`, body, headers);
    },
    createBudgetItem: function(body, headers) {
        return axios.post(`${URL_PREFIX}/api/items`, body, headers);
    },
    createComment: function(body, headers) {
        return axios.post(`${URL_PREFIX}/api/comments`, body, headers)
    },

    // PUT ROUTES
    // ----------
    updateBudget: function(budgetId, body, headers) {
        return axios.put(`${URL_PREFIX}/api/budgets/${budgetId}`, body, headers);
    },
    updateBudgetCategory: function(categoryId, body, headers) {
        return axios.put(`${URL_PREFIX}/api/categories/${categoryId}`, body, headers);
    },
    updateBudgetItem: function(itemId, body, headers) {
        return axios.put(`${URL_PREFIX}/api/items/${itemId}`, body, headers);
    },
    updatePlan: function(planId, body, headers) {
        return axios.put(`${URL_PREFIX}/api/plans/${planId}`, body, headers);
    },

    // DELETE ROUTES
    // -------------
    deleteBudgetCategory: function(budgetCategoryId, headers) {
        return axios.delete(`${URL_PREFIX}/api/categories/${budgetCategoryId}`, headers);
    },
    deleteBudgetItem: function(budgetItemId, headers) {
        return axios.delete(`${URL_PREFIX}/api/items/${budgetItemId}`, headers);
    },
    // delete comment by id
    deleteComment: function(commentId, headers) {
        return axios.delete(`${URL_PREFIX}/api/comments/${commentId}`, headers);
    },
    // delete plan by id
    deletePlan: function(planId, headers) {
        return axios.delete(`${URL_PREFIX}/api/plans/${planId}`, headers);
    },

    // MISCELLANEOUS ROUTES
    // ---------------------
    addUserToTrip: function(body, headers) {
        return axios.post(`${URL_PREFIX}/api/trips/savedtrips`, body, headers)
    },
    addUserToPlan: function(body) {
        return axios.post(`${URL_PREFIX}/api/plans/savedplans`, body);
    },
    removeUserFromPlan: function(body) {
        return axios.delete(`${URL_PREFIX}/api/plans/savedplans`, { data : body });
    },
}


export default api