import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newNumber => {
    const request = axios.post(baseUrl, newNumber)
    return request.then(response => response.data)
}

const update = (id, previousObject, newNumber) => {
    const request = axios.put(`${baseUrl}/${id}`, {...previousObject, number: newNumber})
    return request.then(response => response.data)
}

const deleteNumber = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

export default { getAll, create, update, deleteNumber }