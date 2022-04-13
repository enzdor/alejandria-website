import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import Home from './Pages/Home';
import Books from './Pages/Books';
import Profile from './Pages/Profile';
import AddBook from './Pages/AddBook';
import BookDetail from './Pages/BookDetail';
import BookBuy from './Pages/BookBuy';
import EditBook from './Pages/EditBook';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {ProtectedRoute } from "./auth/ProtectedRoute";

const theme = createTheme({
	palette: {
		primary: {
			main: "#1457a3"
		},
		secondary: {
			main: "#f8c4b1"
		}
	}
})

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/books" element={<Books />} />
				<Route path="/books/:id" element={<BookDetail />} />
				<Route path="/books/edit/:id" element={<ProtectedRoute component={EditBook}/>} />
				<Route path="/buy/:id" element={<ProtectedRoute component={BookBuy}/>} />
				<Route path="/profile/:page" element={<ProtectedRoute component={Profile} />} />
				<Route path="/addbook" element={<ProtectedRoute component={AddBook}/>} />
				<Route path="/profile" element={<Navigate to="/profile/sale"/>}/>
			  </Routes>
		</ThemeProvider>
	);
}

export default App;
