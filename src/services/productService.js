import { BehaviorSubject } from 'rxjs';

// https://www.learnrxjs.io/learn-rxjs/subjects/behaviorsubject

// Define la URL de la API de donde obtendremos los productos.
const apiUrl = 'https://fakestoreapi.com/products';

// Crea un BehaviorSubject, que es un tipo de Observable especial que requiere un valor inicial.
// El BehaviorSubject mantiene el último valor emitido a sus suscriptores, y cada nuevo suscriptor recibe inmediatamente ese último valor.
const productSubject = new BehaviorSubject([]);

// Define una función asíncrona para obtener productos desde la API.
export const fetchProducts = async () => {
    try {
        // Realiza una solicitud HTTP GET a la URL definida.
        const response = await fetch(apiUrl);
        // Convierte la respuesta HTTP a formato JSON.
        const products = await response.json();

        // Emite los productos obtenidos a través del BehaviorSubject.
        // Esto actualizará todos los componentes que estén suscritos a este BehaviorSubject.
        productSubject.next(products);
    } catch (error) {
        // En caso de error en la solicitud, imprime el error en la consola.
        console.error("Failed to fetch products:", error);
        // Emite un arreglo vacío para indicar que no se pudo obtener los productos.
        productSubject.next([]);
    }
};

// Define una función para obtener el Observable del BehaviorSubject.
// Esto permite que otros componentes se suscriban y reciban actualizaciones automáticas de los productos.
export const getProductObservable = () => {
    // Convierte el BehaviorSubject en un Observable.
    // Los suscriptores pueden recibir actualizaciones pero no pueden emitir nuevos valores al BehaviorSubject.
    return productSubject.asObservable();
};
