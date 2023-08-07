import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
    const [value, setValue] = useState<T>(initialValue);

    useEffect(() => {
        const storedValue = localStorage.getItem(key);

        if (storedValue !== null) {
            try {
                setValue(JSON.parse(storedValue));
            } catch (error) {
                console.error("Error parsing stored value:", error);
            }
        }
    }, [key]);

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error("Error setting stored value:", error);
        }
    }, [key, value]);

    return [value, setValue] as [typeof value, typeof setValue];
}
