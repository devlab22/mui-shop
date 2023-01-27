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

export const useFilteredItems = (items, search) => {
    

    const filteredItems = useMemo(() => {

        return items.filter(item => item.name.common.toLowerCase().includes(search.toLowerCase()))

    }, [search, items]);

    return filteredItems;

}

export const useItems = (items, sort=false, search) => {

    const filteredItems = useFilteredItems(items, search);
    const filteredAndSortItems = useSortedItems(filteredItems, sort);
    return filteredAndSortItems;
}