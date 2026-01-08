import { useContext, useEffect, useState } from "react"
import { getSingleLinkService } from "../services"
import { AuthContext } from "../context/AuthContext"

export const useLink = (id) => {

    const { token } = useContext(AuthContext)

    const [link, setLink] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')


    useEffect(() => {

        const loadLink = async () => {
            try {
                setLoading(true)

                const data = await getSingleLinkService(id, token)

                setLink(data)

                
            } catch (error) {
                setError(error.message)
                
            } finally {
                setLoading(false)
            }

        }

        loadLink()

    }, [id, token])



    return { link, loading, error}

}