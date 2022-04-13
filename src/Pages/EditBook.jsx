import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import EditBookForm from "../Components/EditBookForm"
import Header from "../Components/Header"
import { db } from "../firebase";
import { getDoc, doc} from "firebase/firestore";


export default function EditBook(){
    const params = useParams()
    const [data, setData] = useState()
    const { user, isAuthenticated, isLoading} = useAuth0()

    useEffect(() => {
         
		async function getBookGoogle(){
			const bookDoc = doc(db, "books", params.id)

			const book = await getDoc(bookDoc)
			setData({...book.data(), id: book.id})
		}
		getBookGoogle()

    }, [user, isAuthenticated, isLoading])

    return(
        <div>
            <Header />
            <EditBookForm data={data} />
        </div>
    )
}
