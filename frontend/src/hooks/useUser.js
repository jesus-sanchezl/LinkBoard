import { useContext, useEffect, useState } from "react"
import { getUserDataService } from "../services"
import { AuthContext } from "../context/AuthContext"

export const useUser = (id) => {

    const { token } = useContext(AuthContext)

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')


    useEffect(() => {

        const loadUser = async () => {
            try {
                setLoading(true)

                const data = await getUserDataService(id, token)

                setUser(data)
                
            } catch (error) {
                setError(error.message)

            } finally {
                setLoading(false)
            }
        }



        loadUser()

    }, [id, token])


    return { user, loading, error}
} 