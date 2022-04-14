import {collection, query, where, getDocs} from "firebase/firestore";
import {db} from "./firebase";


async function getBooksGoogle(){
	const booksCollectionRef = collection(db, "books")
	const booksQuery = query(booksCollectionRef,where("sold", "==", false))
	let newBooks = await getDocs(booksQuery)

	return(newBooks.docs.map((doc) => ({...doc.data(),id: doc.id})))
}

const wrapPromise = (promise) => {
	let status = "pending"
	let result = ""
	let suspender = promise.then(
		r => {
			status = "success"
			result = r
		},
		e => {
			status = "error"
			result = e
		}
	)

	return {
		read(){
			if (status === "pending"){
				throw suspender
			} else if (status === "error"){
				throw result
			}
			return result
		}
	}
}

export const booksResource = () => {
	return {
		books: wrapPromise(getBooksGoogle()),
	}
}
