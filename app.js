document.getElementById('generar-galeria').addEventListener('submit', generarGaleria);
document.getElementById('contenedor-botones-pagina').addEventListener('click', cambiarPagina);
var cantidadFotos;
var cantidadPaginas;

function generarGaleria(e){
    e.preventDefault();
    cantidadFotos = document.getElementById('cantidad-fotos').value;
    cantidadPaginas = Math.floor(100 / cantidadFotos);

    let htmlBotones = '<a class="boton-anterior" href="#">Ant</a>';
    for (let index = 0; index < cantidadPaginas; index++) {
        htmlBotones += htmlBotones = `<a class="boton-pagina" href="#">${index+1}</a>`;
    }
    htmlBotones += '<a class="boton-siguiente" href="#">Sig</a>';

    document.getElementById('contenedor-botones-pagina').innerHTML = htmlBotones;

    pedirPagina(1);
}

function cambiarPagina(e){
    e.preventDefault();

    const boton = e.target;
    if(boton.className === 'boton-pagina'){
        pedirPagina(boton.innerText);
    }
    if(boton.className === 'boton-anterior'){
        let paginaActual = obtenerActual();
        if(paginaActual != 1)
            pedirPagina(paginaActual-1)
    }
    if(boton.className === 'boton-siguiente'){
        let paginaActual = obtenerActual();
        if(paginaActual != cantidadPaginas)
            pedirPagina(paginaActual+1)
    }
}

function cambiarActual(paginaActual) {
    let botonesPagina = document.getElementsByClassName('boton-pagina');
    let botonActual = document.getElementsByClassName('actual')[0];

    if(botonActual != null)
    {
        botonActual.classList.remove('actual');
    }
    botonesPagina[paginaActual-1].classList.add('actual');
}

function obtenerActual(){
    let arregloBotonoes = Array.from(document.getElementsByClassName('boton-pagina'));
    let botonActual = document.getElementsByClassName('actual')[0];

    return arregloBotonoes.indexOf(botonActual)+1;
}

function pedirPagina(pagina) {
    const xhr = new XMLHttpRequest();

    let url = `https://picsum.photos/v2/list?page=${pagina}&limit=${cantidadFotos}`;
    xhr.open('GET', url, true);

    xhr.onload = function() {
        if(this.status === 200){
            datosImagenes = JSON.parse(this.responseText);

            let htmlImagenes = ''
            datosImagenes.forEach(function(imagen, index){
                htmlImagenes +=  `<img class="imagen-galeria" src=${imagen.download_url} alt="imagen">`;
            });
            document.getElementById('contenedor-galeria').innerHTML = htmlImagenes;

            cambiarActual(pagina);
        }
    };

    xhr.send();
}