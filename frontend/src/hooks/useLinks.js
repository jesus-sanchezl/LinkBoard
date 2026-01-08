import { useContext, useEffect, useState } from "react"
import { getAllLinksService, getUserLinksService } from "../services"
import { AuthContext } from "../context/AuthContext"

export const useLinks = (id) => {

    const { token } = useContext(AuthContext)

    const [links, setLinks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [offset, setOffset] = useState(0)

    const limit = 2

    const loadLinks = async (offsetToLoad = 0) => {
        try {
            setLoading(true)

            const data = id
            ? await getUserLinksService({id, token, limit, offset: offsetToLoad})
             : await getAllLinksService(token, limit, offsetToLoad)


             if (offsetToLoad === 0) {
                setLinks(data); 
            } else {
                setLinks((prevLinks) => [...prevLinks, ...data]);
            }
             

            setOffset(offsetToLoad + limit)
            
        } catch (error) {
            setError(error.message)

        } finally {
            setLoading(false)
        }
    }
    


    useEffect(() => {

        


        loadLinks(0)

    }, [id, token])


    const handlePagination = async () => {
        await loadLinks(offset)
    }

    
    const addLink = (link) => {
        setLinks((prevLinks) => [link, ...prevLinks]);
    };

    const removeLink = (idToRemove) => {
        setLinks((prevLinks) => prevLinks.filter((link) => link.id !== idToRemove));
    };


    return { links, loading, error, addLink, removeLink, handlePagination}
}