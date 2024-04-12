import { useEffect, useState } from 'react'
import { fetchProducts, getProductObservable } from '../services/productService'
import styled from 'styled-components'

// https://www.learnrxjs.io/learn-rxjs/subjects/behaviorsubject

const BehaviorSubjectComponent = () => {
	const [products, setProducts] = useState([]) // Estado local que almacena los productos.

	useEffect(() => {
		// Este efecto se ejecuta una vez cuando el componente se monta.
		const productSubscription = getProductObservable().subscribe({
			next: (products) => {
				// Cada vez que el BehaviorSubject emite un nuevo valor, actualizamos el estado local.
				setProducts(products) // Actualiza el estado con los nuevos productos recibidos.
			},
			error: (error) => {
				// Si hay un error en la suscripción, lo registramos en consola y limpia el estado.
				console.error('Error al obtener productos:', error)
				setProducts([]) // Establece el estado de productos a un arreglo vacío en caso de error.
			},
		})

		fetchProducts() // Inicia la solicitud de productos que eventualmente actualizará el BehaviorSubject.

		// Función de limpieza que se ejecuta cuando el componente se desmonta.
		return () => {
			productSubscription.unsubscribe() // Cancela la suscripción para evitar fugas de memoria.
		}
	}, []) // Lista de dependencias vacía para que el efecto solo se ejecute una vez.

	return (
		<Container>
			<Title>Lista de Productos</Title>
			{products.length > 0 ? (
				<ProductList>
					{products.map((product) => (
						<ProductItem key={product.id}>
							<ProductImage
								src={product.image}
								alt={product.title}
							/>
							<ProductTitle>{product.title}</ProductTitle>
							<ProductPrice>${product.price}</ProductPrice>
						</ProductItem>
					))}
				</ProductList>
			) : (
				<NoProducts>No se encontraron productos.</NoProducts>
			)}
		</Container>
	)
}

export default BehaviorSubjectComponent

const Container = styled.div`
	padding: 20px;
	max-width: 900px;
	margin: auto;
	display: flex;
	flex-direction: column;
	align-items: center;
`

const Title = styled.h1`
	color: #333;
	font-size: 1.8rem;
	margin-bottom: 15px;
`

const ProductList = styled.ul`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
	grid-gap: 15px;
	list-style-type: none;
	padding: 0;
`

const ProductItem = styled.li`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 10px;
	border: 1px solid #ddd;
	border-radius: 8px;
	background-color: #fff;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	transition: transform 0.2s ease-in-out;
	&:hover {
		transform: translateY(-3px);
	}
`

const ProductImage = styled.img`
	width: 100%;
	max-width: 120px;
	height: auto;
	margin-bottom: 8px;
`

const ProductTitle = styled.strong`
	color: #555;
	font-size: 1rem;
	text-align: center;
	margin-bottom: 4px;
`

const ProductPrice = styled.span`
	color: #2c3e50;
	font-weight: bold;
	font-size: 1rem;
`

const NoProducts = styled.p`
	color: #999;
	font-size: 1rem;
`
