class ApiResponse{
    constructor(statusCode, data, message="success"){
        thi8s.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400

    }
}
