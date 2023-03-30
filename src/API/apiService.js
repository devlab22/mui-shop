import axios from "axios";

export default class Dashboard {

    static async getCountries() {

        const { data } = await axios('https://restcountries.com/v3.1/all');
        return data;
    }

    static async getCountry(name) {

        const { data } = await axios(`https://restcountries.com/v3.1/name/${name}`);
        return data;
    }

    static getFilters(data = []) {

        var regionItems = new Set();
        var subregionItems = new Set();
        var continentItems = new Set();

        data.forEach(item => {

            if (item.region) {
                regionItems.add(item.region);
            }
            if (item.subregion) {
                subregionItems.add(item.subregion);
            }
            if (item.continents) {
                item.continents.forEach(element => continentItems.add(element))
            }
        })

        return { regionItems, subregionItems, continentItems }
    }
}
