
let listadoCategorias = [];
let listadoProductos = [];

function limpiarCajasProductos() {
    document.getElementById('prod_categoria').value = '';
    document.getElementById('prod_producto').value = '';
    document.getElementById('prod_cantidad').value = '';
    return;
}

function limpiarCajaCategoria() {
    document.getElementById('categoria').value = '';
    return;
}

function limpiarCajaProductoTachar() {
    document.getElementById('prod_tachar').value = '';
    return;
}

function limpiarCajaCategoriaEliminar() {
    document.getElementById('cat_eliminar').value = '';
    return;
}

function limpiarCajaProductoEliminar() {
    document.getElementById('prod_eliminar').value = '';
    return;
}


function crearCategoria() {
    let categoriaInput = document.getElementById('categoria');
    let nombreCategoria = categoriaInput.value.trim().toLowerCase();

    if (listadoCategorias.includes(nombreCategoria)) {
        alert('La categoría ya existe.');
        limpiarCajaCategoria();
        return;
    }
    
    if (nombreCategoria !== '' && isNaN(Number(nombreCategoria))) {
        
        let contenedorCategoria = document.createElement('div');
        contenedorCategoria.classList.add(`categoria__${nombreCategoria}`);

        let tituloCategoria = document.createElement('h3');
        tituloCategoria.classList.add(`categoria__${nombreCategoria}__titulo`);
        tituloCategoria.textContent = nombreCategoria.toUpperCase();

        let lista = document.createElement('ul');
        lista.classList.add(`categoria__${nombreCategoria}__lista`);

        contenedorCategoria.appendChild(tituloCategoria);
        contenedorCategoria.appendChild(lista);
        
        document.querySelector('.notepad__listado__listas').appendChild(contenedorCategoria);

        listadoCategorias.push(nombreCategoria);
        limpiarCajaCategoria();

        } else {
            alert('Por favor, ingrese un nombre de categoría válido')
        }
}

function agregarProducto() {
    let categoriaProducto = document.getElementById('prod_categoria').value.trim().toLowerCase();
    let nombreProducto = document.getElementById('prod_producto').value.trim();
    let cantidadProducto = document.getElementById('prod_cantidad').value.trim();

    if (!listadoCategorias.includes(categoriaProducto)) {
        alert('La categoría ingresada no existe, debes crearla o asignar el producto a otra categoría.');
        limpiarCajasProductos();
        return;
    } else {

        let categoriaElemento = document.querySelector(`.categoria__${categoriaProducto}`);
        let listaCategoria = categoriaElemento.querySelector('ul');
        let li = document.createElement('li');
        li.id = `${nombreProducto}`
        li.textContent = `${nombreProducto}: ${cantidadProducto}`;
        listaCategoria.appendChild(li);

        listadoProductos.push(nombreProducto);

        limpiarCajasProductos();      
    }
    return;
}


function tacharProducto() {
    let productoTachar = document.getElementById('prod_tachar').value.trim().toLowerCase();
    if (!productoTachar) {
        alert('Debe ingresar un producto.');
        limpiarCajasProductos();
        return;
    }

    let lista = document.querySelectorAll('.notepad__listado__listas li');
    let encontrado = false;

    lista.forEach(item => {
        let textoItem = item.textContent.trim().toLowerCase();
        if (textoItem.includes(productoTachar)) {  
            item.style.textDecoration = 'line-through';
            encontrado = true;
        }
    });

    if (!encontrado) {
        alert('El producto no pertenece a ninguna lista');
    }

    limpiarCajaProductoTachar();
}


function eliminarCategoria() {
    let inputCategoria = document.getElementById('cat_eliminar');
    let categoriaEliminar = inputCategoria.value.trim().toLowerCase();

    if (!inputCategoria) {
        alert('Debes ingresar una categoría.');
        return;
    }

    let contenedorCategoria = document.querySelector(`.categoria__${categoriaEliminar}`);
    console.log("Contenedor a eliminar:", contenedorCategoria)
    console.log("Categoría ingresada:", categoriaEliminar);

    if (contenedorCategoria) {
        contenedorCategoria.remove();        
        listadoCategorias = listadoCategorias.filter(cat => cat.toLowerCase() !== categoriaEliminar);
        return;
    }

    let lista = document.querySelectorAll('.notepad ul');
    let titulos = document.querySelectorAll('.notepad h3')
    console.log("Cantidad de listas encontradas:", lista.length);

    let encontrado = false;

    lista.forEach(item => {
        console.log("Clase del UL:", item.className);  // Depuración: ver clases de los <ul>
        let classItem = item.className.trim().toLowerCase();
        
        if (classItem.split("__").includes(categoriaEliminar)) {  // Buscar la clase exacta
            console.log("Se eliminará:", classItem);
            item.remove();
            listadoCategorias = listadoCategorias.filter(cat => cat.toLowerCase() !== categoriaEliminar);
            encontrado = true;
        }
    });

    titulos.forEach(item => {
        console.log("Clase del UL:", item.className);  // Depuración: ver clases de los <ul>
        let classItem = item.className.trim().toLowerCase();
        
        if (classItem.split("__").includes(categoriaEliminar)) {  // Buscar la clase exacta
            console.log("Se eliminará:", classItem);
            item.remove();
            encontrado = true;
        }
    });

    if (!encontrado) {
        alert('La categoría no existe.');
    }

    limpiarCajaCategoriaEliminar();
}

function eliminarProducto() {
    let productoEliminar = document.getElementById('prod_eliminar').value.trim().toLowerCase();
    if (!productoEliminar) {
        alert('Debe ingresar un producto.');
        limpiarCajasProductos();
        return;
    }

    let lista = document.querySelectorAll('.notepad__listado__listas li');
    let encontrado = false;

    lista.forEach(item => {
        let textoItem = item.textContent.trim().toLowerCase();
        if (textoItem.includes(productoEliminar)) {  
            item.remove();
            encontrado = true;
        }
    });

    if (!encontrado) {
        alert('El producto no pertenece a ninguna lista');
    }

    limpiarCajaProductoEliminar();
}