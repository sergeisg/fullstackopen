const errorHandler = (error, request, response, next) => {
    if (error.name === 'ValidationError') {
        return response.status(400).json({error: error.message})
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({error: 'invalid token'})
    } else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({error: 'token expired'})
    }
}

const tokenExtractor = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')){
        return authorization.substring(7)
    }
    return null
}

module.exports = { errorHandler, tokenExtractor }