import axios from "axios"

const NextAPIInstance = axios.create({
    baseURL: `${process.env.NEXT_API_PATH}`,
    timeout: 30000
})

const ServiceAPIInstance = axios.create({
    baseURL: `${process.env.NEST_SERVICE_API}`,
    timeout: 30000
})

export { NextAPIInstance, ServiceAPIInstance }
