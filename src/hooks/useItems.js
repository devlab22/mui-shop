import { useMemo } from "react";

export const useSortedItems = (items, sort = false) => {

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

export const useFilteredItems = (items, filterValue = '*', filterField = 'region') => {

    const filteredItems = useMemo(() => {

        if (filterValue === '*') {
            return items;
        }
        else {

            return items.filter(item => {

                if (item[filterField]) {

                    if (Array.isArray(item[filterField])) {

                        const tmp = item[filterField].map(element => element.toLowerCase());

                        if (tmp.includes(filterValue.toLowerCase())) {
                            return item;
                        }

                    }
                    else {
                       
                        if (item[filterField].toLowerCase() === filterValue.toLowerCase()) {
                            return item
                        }
                    }

                }

            });
        }

    }, [items, filterField, filterValue]);

    return filteredItems;

}

export const useSearchItems = (items, search) => {

    const filteredItems = useMemo(() => {
        return items.filter(item => item.name.common.toLowerCase().startsWith(search.toLowerCase()))

    }, [items, search]);

    return filteredItems;
}

export const useItems = (items, sort = false, search, filterValue = '*', filterField = 'region') => {

    const filteredItems = useFilteredItems(items, filterValue, filterField);
    const searchItems = useSearchItems(filteredItems, search);
    const filteredAndSortItems = useSortedItems(searchItems, sort);
    return filteredAndSortItems;
}