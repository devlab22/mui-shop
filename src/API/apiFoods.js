import axios from "axios";
import data from './config.json'

const API_KEY_FOOD = data.API_KEY_FOOD || 'DEMO_KEY'

export default class Foods{

    static async getFoodList(fdcIds, pageSize=100, pageNumber=1){

        const { data } = await axios(`https://api.nal.usda.gov/fdc/v1/foods`, {
            params: {
                api_key: API_KEY_FOOD,
                pageSize: pageSize,
                fdcIds: fdcIds,
                pageNumber: pageNumber
            }
        });
        return data;
    }

    static async getFoodSearch(value, dataType='Foundation', pageSize=100, pageNumber=1){

        const { data } = await axios(`https://api.nal.usda.gov/fdc/v1/foods/search`, {
            params: {
                api_key: API_KEY_FOOD,
                query: value,
                pageSize: pageSize,
                pageNumber: pageNumber,
                dataType: dataType
            }
        });
        return data;
    }

    static async getFoodById(fdcId){

        const { data } = await axios(`https://api.nal.usda.gov/fdc/v1/food/${fdcId}`, {
            params: {
                api_key: API_KEY_FOOD
            }
        });
        return data;
    }
}