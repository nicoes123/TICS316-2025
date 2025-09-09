
// VARIABLES GLOBALES
let estudiantes = [];
const NOTA_MINIMA_APROBACION = 4.0;
const NOTA_MAXIMA = 5.0;

// CLASE/OBJETO ESTUDIANTE
function crearEstudiante(nombre, edad, carrera, semestre, notasTexto) {
    try {
        // Convertir string de notas a array de números
        let notasArray = notasTexto.split(',').map(nota => {
            const num = parseFloat(nota.trim());
            if (isNaN(num)) {
                throw new Error(`"${nota.trim()}" no es un número válido`);
            }
            return num;
        });
        
        // Validar que todas las notas estén entre 0 y 5
        for (let nota of notasArray) {
            if (nota < 0 || nota > NOTA_MAXIMA) {
                throw new Error(`La nota ${nota} debe estar entre 0 y ${NOTA_MAXIMA}`);
            }
        }
        
        // Calcular promedio
        let sumaNotas = 0;
        for (let i = 0; i < notasArray.length; i++) {
            sumaNotas += notasArray[i];
        }
        let promedio = sumaNotas / notasArray.length;
        
        // Determinar estado usando operador ternario
        let estado = promedio >= NOTA_MINIMA_APROBACION ? "Aprobado" : "Reprobado";
        
        // Categorizar por semestre usando switch
        let categoria = "";
        switch (true) {
            case (semestre >= 1 && semestre <= 2):
                categoria = "Principiante";
                break;
            case (semestre >= 3 && semestre <= 6):
                categoria = "Intermedio";
                break;
            case (semestre >= 7 && semestre <= 10):
                categoria = "Avanzado";
                break;
            case (semestre >= 11):
                categoria = "Graduando";
                break;
            default:
                categoria = "Sin categoría";
        }
        
        return {
            nombre: nombre.trim(),
            edad: parseInt(edad),
            carrera: carrera,
            semestre: parseInt(semestre),
            notas: notasArray,
            promedio: Math.round(promedio * 100) / 100,
            estado: estado,
            categoria: categoria,
            fechaRegistro: new Date().toLocaleString()
        };
        
    } catch (error) {
        console.error("Error al crear estudiante:", error);
        mostrarResultados("❌ Error: " + error.message, "danger");
        return null;
    }
}

document.getElementById('formEstudiante').addEventListener('submit', function(e) {
    e.preventDefault();
    
    try {
        // Obtener valores del formulario
        const nombre = document.getElementById('nombre').value;
        const edad = document.getElementById('edad').value;
        const carrera = document.getElementById('carrera').value;
        const semestre = document.getElementById('semestre').value;
        const notas = document.getElementById('notas').value;
        
        // Validaciones
        if (!nombre || nombre.trim().length < 2) {
            throw new Error("El nombre debe tener al menos 2 caracteres");
        }
        
        if (!edad || edad < 15 || edad > 100) {
            throw new Error("La edad debe estar entre 15 y 100 años");
        }
        
        if (!carrera) {
            throw new Error("Debe seleccionar una carrera");
        }
        
        if (!semestre || semestre <= 0) {
            throw new Error("El semestre debe ser mayor a 0");
        }
        
        if (!notas || notas.trim().length === 0) {
            throw new Error("Debe ingresar al menos una nota");
        }
        
        // Verificar que no exista un estudiante con el mismo nombre
        for (let estudiante of estudiantes) {
            if (estudiante.nombre.toLowerCase() === nombre.trim().toLowerCase()) {
                throw new Error("Ya existe un estudiante con ese nombre");
            }
        }
        
        // Crear y agregar estudiante
        const nuevoEstudiante = crearEstudiante(nombre, edad, carrera, semestre, notas);
        if (nuevoEstudiante) {
            estudiantes.push(nuevoEstudiante);
            document.getElementById('formEstudiante').reset();
            mostrarResultados(`✅ Estudiante ${nuevoEstudiante.nombre} registrado exitosamente!<br>
                              📊 Promedio: ${nuevoEstudiante.promedio} - ${nuevoEstudiante.estado}`, "success");
        }
        
    } catch (error) {
        mostrarResultados("❌ Error al registrar estudiante: " + error.message, "danger");
    }
});

// FUNCIONES DE VISUALIZACIÓN
function mostrarTodosEstudiantes() {
    if (estudiantes.length === 0) {
        mostrarResultados("📭 No hay estudiantes registrados", "warning");
        return;
    }
    
    let html = `
        <div class="table-responsive">
            <h4>📋 Lista de Estudiantes (${estudiantes.length} registrados)</h4>
            <table class="table table-striped table-hover">
                <thead class="table-dark">
                    <tr>
                        <th>Nombre</th>
                        <th>Edad</th>
                        <th>Carrera</th>
                        <th>Semestre</th>
                        <th>Promedio</th>
                        <th>Estado</th>
                        <th>Categoría</th>
                        <th>Fecha Registro</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    for (let estudiante of estudiantes) {
        const estadoClass = estudiante.estado === "Aprobado" ? "text-success" : "text-danger";
        html += `
            <tr>
                <td><strong>${estudiante.nombre}</strong></td>
                <td>${estudiante.edad} años</td>
                <td>${estudiante.carrera}</td>
                <td>${estudiante.semestre}°</td>
                <td><span class="badge bg-primary">${estudiante.promedio}</span></td>
                <td><span class="${estadoClass}"><strong>${estudiante.estado}</strong></span></td>
                <td><span class="badge bg-secondary">${estudiante.categoria}</span></td>
                <td><small>${estudiante.fechaRegistro}</small></td>
            </tr>
        `;
    }
    
    html += `
                </tbody>
            </table>
        </div>
    `;
    
    mostrarResultados(html);
}

function calcularPromediosGenerales() {
    if (estudiantes.length === 0) {
        mostrarResultados("📭 No hay estudiantes para calcular promedios", "warning");
        return;
    }
    
    let sumaPromedios = 0;
    let estudiantesAprobados = 0;
    let estudiantesReprobados = 0;
    let mejorPromedio = 0;
    let peorPromedio = 5;
    let mejorEstudiante = "";
    let peorEstudiante = "";
    
    // Calcular estadísticas
    for (let estudiante of estudiantes) {
        sumaPromedios += estudiante.promedio;
        
        if (estudiante.estado === "Aprobado") {
            estudiantesAprobados++;
        } else {
            estudiantesReprobados++;
        }
        
        if (estudiante.promedio > mejorPromedio) {
            mejorPromedio = estudiante.promedio;
            mejorEstudiante = estudiante.nombre;
        }
        
        if (estudiante.promedio < peorPromedio) {
            peorPromedio = estudiante.promedio;
            peorEstudiante = estudiante.nombre;
        }
    }
    
    const promedioGeneral = sumaPromedios / estudiantes.length;
    const porcentajeAprobados = (estudiantesAprobados / estudiantes.length) * 100;
    const porcentajeReprobados = (estudiantesReprobados / estudiantes.length) * 100;
    
    const html = `
        <div class="row">
            <div class="col-md-6">
                <h4>📊 Estadísticas Generales</h4>
                <ul class="list-group">
                    <li class="list-group-item d-flex justify-content-between">
                        <span>Total de estudiantes:</span>
                        <strong>${estudiantes.length}</strong>
                    </li>
                    <li class="list-group-item d-flex justify-content-between">
                        <span>Promedio general:</span>
                        <strong class="text-primary">${Math.round(promedioGeneral * 100) / 100}</strong>
                    </li>
                    <li class="list-group-item d-flex justify-content-between">
                        <span>Aprobados:</span>
                        <strong class="text-success">${estudiantesAprobados} (${Math.round(porcentajeAprobados)}%)</strong>
                    </li>
                    <li class="list-group-item d-flex justify-content-between">
                        <span>Reprobados:</span>
                        <strong class="text-danger">${estudiantesReprobados} (${Math.round(porcentajeReprobados)}%)</strong>
                    </li>
                </ul>
            </div>
            <div class="col-md-6">
                <h4>🏆 Destacados</h4>
                <div class="card bg-success text-white mb-2">
                    <div class="card-body">
                        <h6>🥇 Mejor Promedio</h6>
                        <p class="mb-0"><strong>${mejorEstudiante}</strong><br>Promedio: ${mejorPromedio}</p>
                    </div>
                </div>
                <div class="card bg-warning text-dark">
                    <div class="card-body">
                        <h6>📈 Necesita Mejorar</h6>
                        <p class="mb-0"><strong>${peorEstudiante}</strong><br>Promedio: ${peorPromedio}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    mostrarResultados(html);
}

function buscarEstudiantes() {
    const nombreBuscar = document.getElementById('buscarNombre').value.toLowerCase().trim();
    const carreraFiltro = document.getElementById('filtroCarrera').value;
    
    let estudiantesFiltrados = [];
    
    // Aplicar filtros
    for (let estudiante of estudiantes) {
        let cumpleNombre = !nombreBuscar || estudiante.nombre.toLowerCase().includes(nombreBuscar);
        let cumpleCarrera = !carreraFiltro || estudiante.carrera === carreraFiltro;
        
        if (cumpleNombre && cumpleCarrera) {
            estudiantesFiltrados.push(estudiante);
        }
    }
    
    if (estudiantesFiltrados.length === 0) {
        mostrarResultados("🔍 No se encontraron estudiantes que coincidan con los filtros", "warning");
        return;
    }
    
    // Mostrar resultados filtrados (similar a mostrarTodosEstudiantes pero con el array filtrado)
    let html = `
        <h4>🔍 Resultados de Búsqueda (${estudiantesFiltrados.length} encontrados)</h4>
        <div class="table-responsive">
            <table class="table table-striped">
                <thead class="table-dark">
                    <tr>
                        <th>Nombre</th>
                        <th>Edad</th>
                        <th>Carrera</th>
                        <th>Semestre</th>
                        <th>Promedio</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    for (let estudiante of estudiantesFiltrados) {
        const estadoClass = estudiante.estado === "Aprobado" ? "text-success" : "text-danger";
        html += `
            <tr>
                <td><strong>${estudiante.nombre}</strong></td>
                <td>${estudiante.edad}</td>
                <td>${estudiante.carrera}</td>
                <td>${estudiante.semestre}°</td>
                <td><span class="badge bg-primary">${estudiante.promedio}</span></td>
                <td><span class="${estadoClass}"><strong>${estudiante.estado}</strong></span></td>
            </tr>
        `;
    }
    
    html += `</tbody></table></div>`;
    mostrarResultados(html);
}

function mostrarEstadisticas() {
    if (estudiantes.length === 0) {
        mostrarResultados("📭 No hay estudiantes para mostrar estadísticas", "warning");
        return;
    }
    
    // Estadísticas por carrera
    let estadisticasPorCarrera = {};
    let estadisticasPorCategoria = {};
    
    for (let estudiante of estudiantes) {
        // Por carrera
        if (!estadisticasPorCarrera[estudiante.carrera]) {
            estadisticasPorCarrera[estudiante.carrera] = {
                total: 0,
                aprobados: 0,
                sumaPromedios: 0
            };
        }
        estadisticasPorCarrera[estudiante.carrera].total++;
        estadisticasPorCarrera[estudiante.carrera].sumaPromedios += estudiante.promedio;
        if (estudiante.estado === "Aprobado") {
            estadisticasPorCarrera[estudiante.carrera].aprobados++;
        }
        
        // Por categoría
        if (!estadisticasPorCategoria[estudiante.categoria]) {
            estadisticasPorCategoria[estudiante.categoria] = 0;
        }
        estadisticasPorCategoria[estudiante.categoria]++;
    }
    
    let html = `
        <div class="row">
            <div class="col-md-6">
                <h4>📚 Estadísticas por Carrera</h4>
                <div class="table-responsive">
                    <table class="table table-sm">
                        <thead>
                            <tr>
                                <th>Carrera</th>
                                <th>Total</th>
                                <th>Aprobados</th>
                                <th>Promedio</th>
                            </tr>
                        </thead>
                        <tbody>
    `;
    
    for (let carrera in estadisticasPorCarrera) {
        const stats = estadisticasPorCarrera[carrera];
        const promedio = Math.round((stats.sumaPromedios / stats.total) * 100) / 100;
        const porcentajeAprobados = Math.round((stats.aprobados / stats.total) * 100);
        
        html += `
            <tr>
                <td><strong>${carrera}</strong></td>
                <td>${stats.total}</td>
                <td class="text-success">${stats.aprobados} (${porcentajeAprobados}%)</td>
                <td><span class="badge bg-primary">${promedio}</span></td>
            </tr>
        `;
    }
    
    html += `
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col-md-6">
                <h4>🎯 Distribución por Nivel</h4>
                <div class="list-group">
    `;
    
    for (let categoria in estadisticasPorCategoria) {
        const cantidad = estadisticasPorCategoria[categoria];
        const porcentaje = Math.round((cantidad / estudiantes.length) * 100);
        
        html += `
            <div class="list-group-item d-flex justify-content-between align-items-center">
                ${categoria}
                <div>
                    <span class="badge bg-primary rounded-pill">${cantidad}</span>
                    <small class="text-muted">(${porcentaje}%)</small>
                </div>
            </div>
        `;
    }
    
    html += `
                </div>
            </div>
        </div>
    `;
    
    mostrarResultados(html);
}

// ========================================
// 🧹 FUNCIONES AUXILIARES
// ========================================
function limpiarLista() {
    if (estudiantes.length === 0) {
        mostrarResultados("📭 No hay estudiantes para eliminar", "info");
        return;
    }
    
    const confirmacion = confirm(`¿Estás seguro de que quieres eliminar todos los ${estudiantes.length} estudiantes?\n\nEsta acción no se puede deshacer.`);
    
    if (confirmacion) {
        estudiantes = [];
        mostrarResultados("🗑️ Lista de estudiantes limpiada exitosamente", "success");
    }
}

function validarNotas(notasArray) {
    for (let nota of notasArray) {
        if (typeof nota !== 'number' || isNaN(nota)) {
            return false;
        }
        if (nota < 0 || nota > NOTA_MAXIMA) {
            return false;
        }
    }
    return true;
}

async function simularCarga(mensaje, duracion = 2000) {
    mostrarResultados("⏳ " + mensaje, "info");
    
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

document.getElementById('btnMostrarTodos').addEventListener('click', async function() {
    await simularCarga("Cargando lista de estudiantes...", 1000);
    mostrarTodosEstudiantes();
});

document.getElementById('btnCalcularPromedios').addEventListener('click', async function() {
    await simularCarga("Calculando promedios generales...", 1500);
    calcularPromediosGenerales();
});

document.getElementById('btnEstadisticas').addEventListener('click', async function() {
    await simularCarga("Generando estadísticas detalladas...", 2000);
    mostrarEstadisticas();
});

document.getElementById('btnBuscar').addEventListener('click', function() {
    buscarEstudiantes();
});

document.getElementById('btnLimpiar').addEventListener('click', function() {
    limpiarLista();
});

// Búsqueda en tiempo real
document.getElementById('buscarNombre').addEventListener('keyup', function(e) {
    if (e.key === 'Enter') {
        buscarEstudiantes();
    }
});
