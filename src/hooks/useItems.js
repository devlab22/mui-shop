import { useMemo } from "react";

export const useSortedItems = (items, sort=false) => {

    const sortedItems = useMemo(() => {

        if (sort) {
            return [...items].sort((a, b) => a.name.common.localeCompare(b.name.common));
        }
        else {
            return items;
        }
    }, [sort, items]);

    return sortedItems;
}

export const useFilteredItems = (items, search, filterValue='*') => {
    

    const filteredItems = useMemo(() => {

        if(filterValue === '*'){         
            return items.filter(item => item.name.common.toLowerCase().includes(search.toLowerCase()))
        }
        else{
            return items.filter(item => item.region.toLowerCase() === filterValue.toLowerCase())
                        .filter(item => item.name.common.toLowerCase().includes(search.toLowerCase()))
        }

    }, [search, items, filterValue]);

    return filteredItems;

}

export const useItems = (items, sort=false, search, filterValue='*') => {

    const filteredItems = useFilteredItems(items, search, filterValue);
    const filteredAndSortItems = useSortedItems(filteredItems, sort);
    return filteredAndSortItems;
}