// Declara un array global para almacenar los estudiantes
// Usa 'let' para que sea modificable
let estudiantes = [];

// Declara constantes para las configuraciones del sistema
const NOTA_MINIMA_APROBACION = 3.0;
const NOTA_MAXIMA = 5.0;

// Completa la función para crear un objeto estudiante
function crearEstudiante(nombre, edad, carrera, semestre, notasTexto) {
    try {
        // Convierte el string de notas en un array de números
        // Pista: usa split(',') y map()
        let notasArray = []; // Implementa aquí
        
        // Valida que todas las notas estén entre 0 y 5
        // Usa un bucle for...of y operadores de comparación
        
        // Calcula el promedio de las notas
        // Usa operadores aritméticos y un bucle
        let promedio = 0; // Implementa aquí
        
        // Determina el estado del estudiante usando operador ternario
        // "Aprobado" si promedio >= NOTA_MINIMA_APROBACION, sino "Reprobado"
        let estado = ""; // Implementa aquí
        
        // Categoriza al estudiante por semestre usando switch
        let categoria = "";
        switch (true) {
            // Implementa los cases
            // 1-2: "Principiante"
            // 3-6: "Intermedio" 
            // 7-10: "Avanzado"
            // 11+: "Graduando"
        }
        
        // Retorna el objeto estudiante con todas las propiedades
        return {
            // Implementa aquí todas las propiedades
        };
        
    } catch (error) {
        // Maneja los errores y muestra mensaje apropiado
        console.error("Error al crear estudiante:", error);
        mostrarResultados("❌ Error: " + error.message, "danger");
        return null;
    }
}

// Completa la función para manejar el envío del formulario
document.getElementById('formEstudiante').addEventListener('submit', function(e) {
    e.preventDefault();
    
    try {
        // Obtén todos los valores del formulario
        const nombre = "";
        const edad = 0;
        const carrera = "";
        const semestre = 0;
        const notas = "";
        
        // Validaciones usando if/else y operadores lógicos
        // - Nombre no debe estar vacío
        // - Edad debe estar entre 15 y 100
        // - Carrera debe estar seleccionada
        // - Semestre debe ser mayor a 0
        // - Notas no deben estar vacías
        
        // Verifica que no exista un estudiante con el mismo nombre
        // Usa un bucle for...of y operadores de comparación
        
        // Crea el estudiante y agrégalo al array
        const nuevoEstudiante = crearEstudiante(nombre, edad, carrera, semestre, notas);
        if (nuevoEstudiante) {
            // Agrega al array y muestra mensaje de éxito
            // Limpia el formulario
            mostrarResultados("✅ Estudiante registrado exitosamente!", "success");
        }
        
    } catch (error) {
        mostrarResultados("❌ Error al registrar estudiante: " + error.message, "danger");
    }
});

// Implementa la función para mostrar todos los estudiantes
function mostrarTodosEstudiantes() {
    // Verifica si hay estudiantes (usa operadores lógicos)
    if (estudiantes.length === 0) {
        mostrarResultados("📭 No hay estudiantes registrados", "warning");
        return;
    }
    
    // Crea una tabla HTML con todos los estudiantes
    // tip: Usa un bucle for...of para iterar
    let html = `
        <div class="table-responsive">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Edad</th>
                        <th>Carrera</th>
                        <th>Semestre</th>
                        <th>Promedio</th>
                        <th>Estado</th>
                        <th>Categoría</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    // Itera sobre todos los estudiantes y agrega filas a la tabla
    
    html += `
                </tbody>
            </table>
        </div>
    `;
    
    mostrarResultados(html);
}

// Implementa la función para calcular promedios generales
function calcularPromediosGenerales() {
    // Verifica si hay estudiantes
    
    // Calcula estadísticas usando bucles y operadores
    let sumaPromedios = 0;
    let estudiantesAprobados = 0;
    let estudiantesReprobados = 0;
    
    // Itera sobre estudiantes y calcula estadísticas
    
    // Calcula promedio general y porcentajes
    
    // Muestra resultados en formato HTML
}

// Implementa la función de búsqueda y filtrado
function buscarEstudiantes() {
    const nombreBuscar = document.getElementById('buscarNombre').value.toLowerCase();
    const carreraFiltro = document.getElementById('filtroCarrera').value;
    
    // Filtra estudiantes usando condiciones y operadores lógicos
    let estudiantesFiltrados = [];
    
    // Itera y aplica filtros usando if y operadores de comparación
    
    // Muestra resultados filtrados o mensaje si no hay coincidencias
}

// Implementa la función de estadísticas avanzadas
function mostrarEstadisticas() {
    // Calcula estadísticas por carrera usando bucles anidados
    
    // Encuentra el mejor y peor estudiante usando comparaciones
    
    // Calcula distribución por categorías usando switch y contadores
    
    // Muestra todo en formato HTML organizado
}

// Implementa función para limpiar la lista con confirmación
function limpiarLista() {
    // Pide confirmación al usuario
    // Si confirma, limpia el array y muestra mensaje
}

// Implementa función para validar notas
function validarNotas(notasArray) {
    // Verifica que todas las notas sean números válidos
    // Verifica que estén en el rango correcto (0-5)
    // Retorna true si todas son válidas, false si no
}

// Implementa función asíncrona para simular carga de datos
async function simularCarga(mensaje, duracion = 2000) {
    // Muestra mensaje de carga
    mostrarResultados("⏳ " + mensaje, "info");

    // Usa setTimeout con Promise para simular carga asíncrona
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, duracion);
    });
}

function mostrarResultados(mensaje, tipo = "primary") {
    const resultado = document.getElementById('resultados');
    resultado.className = `alert alert-${tipo}`;
    resultado.innerHTML = mensaje;
    
    // Scroll suave hacia los resultados
    resultado.scrollIntoView({ behavior: 'smooth' });
}

// Conecta todos los botones con sus funciones
document.getElementById('btnMostrarTodos').addEventListener('click', function() {
    // Llama a la función correspondiente con carga asíncrona
});

document.getElementById('btnCalcularPromedios').addEventListener('click', function() {
    // Implementa con manejo asíncrono
});

document.getElementById('btnEstadisticas').addEventListener('click', function() {
    // Implementa con manejo asíncrono
});

document.getElementById('btnBuscar').addEventListener('click', function() {
    // Implementa función de búsqueda
});

document.getElementById('btnLimpiar').addEventListener('click', function() {
    // Implementa con confirmación
});


// Crea función para cargar datos de prueba
function cargarDatosPrueba() {
    // Agrega algunos estudiantes de ejemplo para probar el sistema
    const estudiantesPrueba = [
        // Define objetos de estudiantes de prueba
    ];
    
    // Agrega cada estudiante al array principal
}

// BONUS - Implementa funciones adicionales:
// - Función para editar estudiante existente
// - Función para eliminar estudiante específico
// - Función para exportar datos a texto
// - Función para calcular ranking de estudiantes
// - Validación más robusta de datos de entrada