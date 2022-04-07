const errorHandler = (error, request, response, next) => {
    if (error.name === 'ValidationError') {
        return response.status(400).json({error: error.message})
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({error: 'invalid token'})
    } else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({error: 'token expired'})
    }
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')){
        request.token = authorization.substring(7)
        console.log(request.token)
    }
    next()
}

module.exports = { errorHandler, tokenExtractor }