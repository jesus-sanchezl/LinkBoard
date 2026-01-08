

export const getRequest = async (url, headers = {}) => {
    const response = await fetch (url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...headers
        }
    })


    const json = await response.json()

    if (!response.ok) {
        throw new Error(json.message)
    }

    return json.data
}




export const postRequest = async ({ url, data, headers = {}, isJson = true }) => {
    
    const fetchOptions = {
        method: "POST",
        headers: {
            ...headers,
        },
        body: isJson ? JSON.stringify(data) : data, 
    };

    
    if (isJson) {
        fetchOptions.headers["Content-Type"] = "application/json";
    }

    const response = await fetch(url, fetchOptions);

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    return json.data;
};


export const putRequest = async ({ url, data, headers = {}, isJson = true}) => {
    
    const fetchOptions = {
        method: "PUT",
        headers: {
            ...headers,
        },
        body: isJson ? JSON.stringify(data) : data, 
    };

    
    if (isJson) {
        fetchOptions.headers["Content-Type"] = "application/json";
    } else {
        
        delete fetchOptions.headers["Content-Type"];
    }

    const response = await fetch(url, fetchOptions);

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    return json.data
};





export const deleteRequest = async ({url, headers = {}}) =>{
    const response = await fetch (url, {
        method: 'DELETE',
        headers: {
            ... headers
        }
    })

    const json = await response.json()

    if (!response.ok){
        throw new Error(json.message)
    }

    return response.json
}