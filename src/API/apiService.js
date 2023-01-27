import axios from "axios";

export default class Dashboard{

    static async getCountries(){

        const { data } = await axios('https://restcountries.com/v3.1/all');
        return data;
    }

    static async getCountry(name){

        const { data } = await axios(`https://restcountries.com/v3.1/name/${name}`);
        return data;
    }
}
