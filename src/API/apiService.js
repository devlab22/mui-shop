import axios from "axios";


export default class Dashboard {

    static async getAccumCountry() {

        const { data } = await axios('https://restcountries.com/v3.1/all');

        var count = data.reduce((accum, current) => accum + current.population, 0)
        var area = data.reduce((accum, current) => accum + current.area, 0)

        return {
            population: count,
            area: area
        }
    }

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

    static async getVendor(mac_address) {

        const data = await axios("https://api.macvendors.com/", {
            params: {
                mac_address: mac_address
            }
        }
        )

        return data

    }

    static async getRandomImage() {

        var url = ''
        const {data} = await axios("data/config.json")
        const images = data['images'] || []
        if(images.length > 0){
            const index = Math.floor(Math.random() * images.length);
            url = images[index]
        }
        
        return url
    }

}
