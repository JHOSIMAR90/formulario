import { useEffect, useState } from 'react'
import { forkJoin } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { map } from 'rxjs/operators'
import styled from 'styled-components'

const Productos = () => {
	const [data, setData] = useState({
		products: [],
		categories: [],
		users: [],
	})

	useEffect(() => {
		// Definir las URLs de las APIs para productos, categorías y usuarios
		const productsUrl = 'https://fakestoreapi.com/products?limit=5'
		const categoriesUrl = 'https://fakestoreapi.com/products/categories'
		const usersUrl = 'https://fakestoreapi.com/users?limit=5'

		// Crear observables para cada llamada API usando ajax.getJSON de RxJS
		const productsObservable = ajax.getJSON(productsUrl)
		const categoriesObservable = ajax.getJSON(categoriesUrl)
		const usersObservable = ajax.getJSON(usersUrl)

		// Usar forkJoin para esperar que todos los observables se completen antes de procesar los datos
		const subscription = forkJoin({
			products: productsObservable,
			categories: categoriesObservable,
			users: usersObservable,
		})
			.pipe(
				map(({ products, categories, users }) => ({
					products,
					categories,
					users: users.map(
						(user) =>
							`${user.name.firstname} ${user.name.lastname}`,
					), // Formatear los nombres de los usuarios
				})),
			)
			.subscribe({
				next: (result) => setData(result), // Actualizar el estado con los datos recibidos
				error: (err) => console.error('Error: ', err), // Manejar errores
				complete: () => console.log('Completo'), // Se ejecuta cuando todos los observables completan
			})

		// Función de limpieza para desuscribirse y evitar fugas de memoria
		return () => subscription.unsubscribe()
	}, [])

	return (
		<Container>
			<Heading>Productos, Categorías y Usuarios</Heading>
			<Section>
				<Title>Productos:</Title>
				<List>
					{data.products.map((product) => (
						<ProductCard key={product.id}>
							<ProductImage
								src={product.image}
								alt={product.title}
							/>
							<ProductInfo>
								<ProductTitle>{product.title}</ProductTitle>
								<ProductPrice>${product.price}</ProductPrice>
								<ProductDescription>
									{product.description}
								</ProductDescription>
								<ProductRating>
									Rating: {product.rating.rate} (
									{product.rating.count} reviews)
								</ProductRating>
							</ProductInfo>
						</ProductCard>
					))}
				</List>
			</Section>
			<Section>
				<Title>Categorías:</Title>
				<List>
					{data.categories.map((category, index) => (
						<ListItem key={index}>{category}</ListItem>
					))}
				</List>
			</Section>
			<Section>
				<Title>Usuarios:</Title>
				<List>
					{data.users.map((user, index) => (
						<ListItem key={index}>{user}</ListItem>
					))}
				</List>
			</Section>
		</Container>
	)
}

export default Productos

const Container = styled.div`
	padding: 20px;
	max-width: 1000px;
	margin: auto;
	display: flex;
	flex-direction: column;
	align-items: center;
`

const ProductCard = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 10px;
	border: 1px solid #ddd;
	border-radius: 8px;
	background-color: #fff;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
	transition: transform 0.2s ease-in-out;
	width: 200px;

	&:hover {
		transform: translateY(-5px);
	}
`

const ProductImage = styled.img`
	width: 100%;
	height: 120px; // Reduced height
	object-fit: cover;
`

const ProductInfo = styled.div`
	text-align: center;
	padding: 5px;
`

const ProductTitle = styled.h3`
	color: #555;
	font-size: 1rem;
	margin-bottom: 3px;
`

const ProductPrice = styled.div`
	color: #2c3e50;
	font-weight: bold;
	font-size: 0.9rem;
`

const ProductDescription = styled.p`
	color: #666;
	font-size: 0.8rem;
	height: 40px;
	overflow: hidden;
	margin-top: 2px;
`

const ProductRating = styled.div`
	font-size: 0.8rem;
	color: #ff9500;
	margin-top: 2px;
`

const Heading = styled.h2`
	color: #333;
	font-size: 1.8rem;
	margin-top: 20px;
`

const Section = styled.div`
	margin-top: 20px;
	width: 100%;
`

const List = styled.ul`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
	grid-gap: 10px;
	list-style-type: none;
	padding: 0;
`

const ListItem = styled.li`
	background-color: #f0f0f0;
	padding: 8px;
	border-radius: 4px;
	color: #333;
	font-size: 0.9rem;
`

const Title = styled.h3`
	color: #2c3e50;
	font-size: 1.2rem;
	margin-bottom: 10px;
`
