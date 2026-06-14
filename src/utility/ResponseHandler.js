class ResponseHandler {
    constructor(message, status, data = [], success = false) {
        this.message = message;
        this.status = status;
        this.data = data;
        this.success = success;
    }
}

export default ResponseHandler;