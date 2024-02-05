import axios from "axios";

const BASE_URL = "http://localhost:5000/api/"
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OWEzMDdkMjQ1NTBlZjdjZWVmYzIwOCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwNDc4Mzg4MSwiZXhwIjoxNzA1MDQzMDgxfQ.dinTnooiOcQ7CWaIxIoNMVKSCqHHas-dc7IffGI5lyk";
export const publicRequest = axios.create({
baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers:{token:`Bearer ${TOKEN}`}
    });