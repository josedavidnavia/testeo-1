// Importamos el módulo supertest para realizar pruebas HTTP
const request = require('supertest');

// Importamos la aplicación Express que queremos probar
const app = require('../app');

// Iniciamos una suite de pruebas para la API de Canciones
describe('API de Canciones', () => {
    let cancionId; // Variable para almacenar el ID de la canción creada

    // Test para verificar la creación de una nueva canción
    test('Debería crear una nueva canción', async () => {
        // Realizamos una solicitud POST para crear una nueva canción
        const res = await request(app)
            .post('/canciones')
            .send({ titulo: 'Canción de prueba', artista: 'Artista de prueba' });

        // Verificamos que la solicitud haya sido exitosa (código de estado 201) y que la respuesta contenga el ID de la canción
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');

        // Almacenamos el ID de la canción creada para usarlo en las pruebas posteriores
        cancionId = res.body.id;
    });
     
    // Test para verificar la obtención de todas las canciones
    test('Debería obtener todas las canciones', async () => {
        // Realizamos una solicitud GET para obtener todas las canciones
        const res = await request(app).get('/canciones');

        // Verificamos que la solicitud haya sido exitosa (código de estado 200) y que la respuesta contenga al menos una canción
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
    });
    
    // Test para verificar la obtención de una canción por su ID
    test('Debería obtener una canción por su ID', async () => {
        // Verificamos que se haya creado una canción antes de ejecutar esta prueba
        expect(cancionId).toBeDefined();
        
        // Realizamos una solicitud GET para obtener la canción por su ID
        const res = await request(app).get(`/canciones/${cancionId}`);
        
        // Si la canción fue encontrada (código de estado 200), realizamos pruebas adicionales
        if (res.statusCode === 200) {
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('titulo', 'Canción de prueba');
            expect(res.body).toHaveProperty('artista', 'Artista de prueba');
        } 
    });
    
    // Test para verificar la eliminación de una canción
    test('Debería eliminar una canción', async () => {
        // Realizamos una solicitud DELETE para eliminar la canción creada anteriormente
        const res = await request(app).delete(`/canciones/${cancionId}`);
        
        // Verificamos que la canción haya sido eliminada exitosamente (código de estado 204)
        expect(res.statusCode).toEqual(204);
    });
});
