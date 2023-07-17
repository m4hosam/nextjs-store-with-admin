import React from 'react'


type props = {
    type?: string,
    title: string,
    placeholder?: string,
    state: string,
    setState: (value: string) => void,

}


const FormField = ({ type, title, placeholder, state, setState }: props) => {
    return (
        <div className="mb-5 w-72">
            <label htmlFor={title.replace(/\s+/g, '')}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                {title}
            </label>
            <input
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder={placeholder}
                type={type}
                id={title.replace(/\s+/g, '')}
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />

        </div>
    )
}

export default FormField