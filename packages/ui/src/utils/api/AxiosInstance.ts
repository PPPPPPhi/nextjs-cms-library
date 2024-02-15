import axios from "axios"

const NextAPIInstance = axios.create({
    baseURL: `${process.env.NEXT_API_PATH}`,
    timeout: 30000
})

export { NextAPIInstance }
