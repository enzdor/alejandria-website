import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import EditBookForm from "../Components/EditBookForm"
import Header from "../Components/Header"


export default function EditBook(){
    const params = useParams()
    const [data, setData] = useState()
    const { user, isAuthenticated, isLoading} = useAuth0()


    useEffect(() => {
        async function getBook(){
            let book = await fetch(`http://localhost:3001/api/books/${params.id}`)
            book = (await book.json()).data

            setData(book)
        }

        getBook()
    }, [user, isAuthenticated, isLoading])

    console.log(data);

    return(
        <div>
            <Header />
            <EditBookForm data={data} />
        </div>
    )
}