import axios from "axios";

// docu https://fdc.nal.usda.gov/api-guide.html

const API_KEY_FOOD = "8DK4mTPzPLcVk7Cg7qq3nxqa4ux3nPWmO4qDw3OQA"

export default class Foods{

    static async getFoods(fdcIds, sortBy='', sortOrder='asc', pageSize=100, pageNumber=1){

        const { data } = await axios(`https://api.nal.usda.gov/fdc/v1/foods`, {
            params: {
                api_key: API_KEY_FOOD,
                pageSize: pageSize,
                fdcIds: fdcIds,
                pageNumber: pageNumber,
                sortBy: sortBy,
                sortOrder: sortOrder
            }
        });
        return data;
    }

    static async getFoodsList(dataType='', sortBy='', sortOrder='asc', pageSize=100, pageNumber=1){

        const { data } = await axios(`https://api.nal.usda.gov/fdc/v1/foods/list`, {
            params: {
                api_key: API_KEY_FOOD,
                pageSize: pageSize,
                pageNumber: pageNumber,
                dataType: dataType,
                sortBy: sortBy,
                sortOrder: sortOrder
            }
        });
        return data;
    }

    static async getFoodSearch(value, dataType='', sortBy='', sortOrder='asc', pageSize=100, pageNumber=1){

        const { data } = await axios(`https://api.nal.usda.gov/fdc/v1/foods/search`, {
            params: {
                api_key: API_KEY_FOOD,
                query: value,
                pageSize: pageSize,
                pageNumber: pageNumber,
                dataType: dataType,
                sortBy: sortBy,
                sortOrder: sortOrder
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