import axios from "axios";
import {UseCase} from "../models/use-case.ts";
export const api = axios.create({
    baseURL: 'http://localhost:8080'
})

