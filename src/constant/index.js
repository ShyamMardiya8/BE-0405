const endpoints = {
    GET: '/read',
    POST: '/create',
    PUT: '/update',
    DELETE: '/delete'
}
const errMessage = {
    get: "data not found",
    create: "something went wrong while inserting data",
    update: "something went wrong while updating data",
    delete: "something went wrong while deleting data",
}

module.exports = {endpoints, errMessage}