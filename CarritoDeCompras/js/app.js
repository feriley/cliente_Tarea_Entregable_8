let carrito = [];
const carritoDOM = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');

cargarEventListeners();  
function cargarEventListeners() {
    // add
    listaCursos.addEventListener('click', agregarCurso);

    // delete
    carritoDOM.addEventListener('click', eliminarCurso);

    // accion de vaciar
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}


// agregar al carro
function agregarCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

// anyadir al array del carro
function leerDatosCurso(curso) {
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    };

    
    const existe = carrito.some(curso => curso.id === infoCurso.id);  // existe en el carro ?
    if (existe) {
        // update al carro
        carrito = carrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
            }
            return curso;
        });
    } else {
        // add al carro
        carrito = [...carrito, infoCurso];
    }

    mostrarCarrito();
}

function mostrarCarrito() {
    limpiarCarrito();

    carrito.forEach(curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${imagen}" width="100"></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td><a href="#" class="borrar-curso" data-id="${id}">X</a></td>
        `;

        carritoDOM.appendChild(row);
    });
}

function eliminarCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');
        
        // Eliminar de array de carrito usando el id 
        carrito = carrito.filter(curso => curso.id !== cursoId);
        
        
        mostrarCarrito();
    }
}

function vaciarCarrito() {
    carrito = []; // Reseteamos el array

   
    limpiarCarrito(); // Limpiamos el HTML
}

// Limpiar el tbody
function limpiarCarrito() {
    while (carritoDOM.firstChild) {
        carritoDOM.removeChild(carritoDOM.firstChild);
    }
}
