import axios from 'axios';

export default axios.create({
    baseURL: 'https://stud-system.herokuapp.com/'
})