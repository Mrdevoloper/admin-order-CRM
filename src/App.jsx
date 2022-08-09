import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Category from './components/adminCategory/Category';
import Restaurant from './components/adminResraurant/Res'
import Food from './components/adminFood/Food'
import './App.css'

function App() {
	return (
		<>
			<div>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/category' element={<Category />} />
					<Route path='/res' element={<Restaurant />} />
					<Route path='/food' element={<Food />} />
				</Routes>
			</div>
		</>
	);
}
export default App;
