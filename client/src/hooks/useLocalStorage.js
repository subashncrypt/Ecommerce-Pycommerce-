import { useState, useEffect } from 'react';
/**
 * Author: Hemanth Nadipineni
 * Banner ID: B00899473
 */
/*
Component to use local storage.
Referenced from the tutorial on https://egghead.io/blog/building-a-crud-app-with-react-and-local-storage
*/
const useLocalStorage = (key, initialValue) => {
    const [value, setValue] = useState(() => {
        try {
            const localValue = window.localStorage.getItem(key);
            return localValue ? JSON.parse(localValue) : initialValue;
        } catch (error) {
            return initialValue;
        }
    });

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
};

export default useLocalStorage;