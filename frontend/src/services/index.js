import { deleteRequest, getRequest, postRequest, putRequest } from "./httpServices";

export const getAllLinksService = async (token, limit, offset) => {
    return await getRequest(
        `${import.meta.env.VITE_BACKEND}/links?limit=${limit}&offset=${offset}`, {
            Authorization: `Bearer ${token}`
        }
    );
};


export const getUserLinksService = async ({limit, offset, token}) => {
    return await getRequest(
        `${
            import.meta.env.VITE_BACKEND
        }/users/links?limit=${limit}&offset=${offset}`, {
            Authorization: `Bearer ${token}`
        }
    )

    
};


export const getCommentsByLinkIdService = async (linkId, token) => {
    return await getRequest(`${import.meta.env.VITE_BACKEND}/comments/post/${linkId}`, {
        Authorization: `Bearer ${token}`
    })
}


export const getSingleLinkService = async (id, token) => {
    return await getRequest(`${import.meta.env.VITE_BACKEND}/links/${id}`, {
        Authorization: `Bearer ${token}`,
    });
};

export const getMyUserDataService = async (token) => {
    return await getRequest(`${import.meta.env.VITE_BACKEND}/users/profile`, {
        Authorization: `Bearer ${token}`,
    });
};


export const checkVotedService = async (linkId, token) => {
    return await getRequest(`${import.meta.env.VITE_BACKEND}/users/votes/${linkId}`, {
        Authorization: `Bearer ${token}`
    })
}


export const registerUserService = async ({
    username,
    email,
    password,
    repeatPassword,
}) => {
    return await postRequest({
        url: `${import.meta.env.VITE_BACKEND}/users/register`,
        data: { username, email, password, repeatPassword },
    });
};

export const loginUserService = async ({ email, password }) => {
    return await postRequest({
        url: `${import.meta.env.VITE_BACKEND}/users/login`,
        data: { email, password },
    });
};


export const createCommentService = async (linkId, comment_Text, token) => {
    return await postRequest({
        url: `${import.meta.env.VITE_BACKEND}/comments/post/${linkId}`,
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {comment_text: comment_Text}
    })
}

export const sendLinkService = async ({ data, token }) => {
    return await postRequest({
        url: `${import.meta.env.VITE_BACKEND}/links/create`,
        data: data,
        headers: { Authorization: `Bearer ${token}` },
        isJson: false,
    });
};


export const addVoteService = async (id, token, data) => {
    return await postRequest({
        url: `${import.meta.env.VITE_BACKEND}/ratings/vote/${id}`,
        headers: {
             Authorization: `Bearer ${token}`
        },
        data: {rating: data}
    })
}




export const deleteLinkService = async ({ id, token }) => {
    return await deleteRequest({
        url: `${import.meta.env.VITE_BACKEND}/links/${id}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};


export const deleteCommentService = async ({id, token}) =>{
    return await deleteRequest({
        url: `${import.meta.env.VITE_BACKEND}/comments/post/${id}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const getUserDataService = async (id, token) => {
    return await getRequest(
        `${import.meta.env.VITE_BACKEND}/users/profile/${id}`,
        {
            Authorization: `Bearer ${token}`,
        }
    );
};




export const UpdateLinkService = async ({ id, token, data }) => {
    return await putRequest({ 
        url:`${import.meta.env.VITE_BACKEND}/links/update/${id}`, 
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: data,
        isJson: false
     });
}


export const UpdateUserService = async ({token, data}) => {
    return await putRequest({
        url: `${import.meta.env.VITE_BACKEND}/users/profile`,
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: data,
        isJson: false
    })
}


export const UpdatePasswordService = async ({token, password}) => {
    const response = await putRequest({
        url: `${import.meta.env.VITE_BACKEND}/users/profile/password`,
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {password},
        isJson: true,
        
    })
    
    return response; 
    
}