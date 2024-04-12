import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from '../pages/Home'
import { ProductosConfig } from '../pages/ProductosConfig'
import Productos from '../pages/Productos'
import BehaviorSubjectComponent from '../pages/BehaviorSubject'

export function MyRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/home" element={<Home />} />
				<Route path="/" element={<ProductosConfig />} />
				<Route path="/forkjoin" element={<Productos />} />
				<Route
					path="/behavorsubject"
					element={<BehaviorSubjectComponent />}
				/>
			</Routes>
		</BrowserRouter>
	)
}
