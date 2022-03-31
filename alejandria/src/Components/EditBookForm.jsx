import { useAuth0 } from "@auth0/auth0-react";
import { React, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditBookForm(props){
    const { user } = useAuth0()
    const navigate = useNavigate()
    const [data, setData] = useState({})

    useEffect(() => {
        setData(props.data)
    }, [props])

    const initialValues = {name: "", author:"", description:"", image:"", price:"", genre:"Action"}
    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState([])
    const [submit, setSubmit] = useState(false)

    function handleChange(event) {
        const { name, value } = event.target
        setFormValues({...formValues, [name]: value})
    }

    function handleSubmit(event) {
        event.preventDefault()
        setFormErrors(validate(formValues))
        setSubmit(true)
    }

    function validate(values) {
        const errors = []
        if(!values.name){
            errors.push('Your book needs to have a name')
        }
        if(!values.author){
            errors.push('Your book needs to have a author')
        }
        if(!values.description){
            errors.push('Your book needs to have a description')
        }
        if(!values.price){
            errors.push('Your book needs to have a price')
        }
        if(!values.genre){
            errors.push('Your book needs to have a genre')
        }
        return errors
    }

    async function putBook(){
        await fetch(`http://localhost:3001/api/books/${data.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                id: data.id,
                name: document.querySelector('#name').value, 
                author: document.querySelector('#author').value, 
                description: document.querySelector('#description').value, 
                image: document.querySelector('#image').value, 
                price: document.querySelector('#price').value, 
                genre: document.querySelector('#genre').value, 
                user_sub: user.sub
                })
        })
    }

    useEffect(() => {
        console.log(formErrors);
        console.log(submit);
        if(formErrors.length == 0 && submit == true){
            putBook()
            navigate('/profile')
        }
    }, [formErrors])

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" id="name" defaultValue={data ? data.name : "Name"} onChange={handleChange} />
            <br />
            <br />
            <label htmlFor="author">Author:</label>
            <input type="text" name="author" id="author" defaultValue={data ? data.author : "Author"} onChange={handleChange}/>
            <br />
            <br />
            <label htmlFor="description">Description:</label>
            <textarea name="description" id="description" defaultValue={data ? data.description : "Description"} onChange={handleChange}/>
            <br />
            <br />
            <label htmlFor="image">Image:</label>
            <input type="file" name="image" id="image" onChange={handleChange}/>
            <br />
            <br />
            <label htmlFor="price">Price:</label>
            <input type="text" name="price" id="price" defaultValue={data ? data.price : "30"} onChange={handleChange} />
            <br />
            <br />
            <label htmlFor="genre">Genre:</label>
            <select name="genre" id="genre" onChange={handleChange}>
                <option value="1">Action</option>
            </select>
            <br />
            <br />
            <input type="submit" name="Submit"/>
        </form>
    )
}