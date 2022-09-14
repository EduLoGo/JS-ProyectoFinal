// Guardo el array Modificado en el LocalStorage
function GuardarStorageJSON (arrayAGuardar) {
    let alumnosJSON = JSON.stringify(arrayAGuardar)
    localStorage.setItem("AlumnosFullJSON", alumnosJSON)
}
//Operador Logico OR - Funcion que trae los datos del LocalStorage y si no existe genera uno vacio.
function TraerStorageJSON () {
    let fichasEnStorage = JSON.parse(localStorage.getItem("AlumnosFullJSON")) || [];
    return fichasEnStorage;
}

// Funcion del msj por fichas vacias, recibe un String de acuerdo al error a mostrar.
function FichasVacias(msjDeError){
    Swal.fire({
        title: `Sin Fichas a Mostrar`,
        text: `${msjDeError}`,
        icon: "success",
        timer: 2500,
        showConfirmButton: false,
    })
}
// Capturo el section Principal donde se modifica segun la opcion del NavBar.
let cuerpoDePagina = document.getElementById('mainPage')

// ---- Seccion INICIO ----
let btnInicio = document.getElementById('menuInicio')
btnInicio.addEventListener('click', HTML_Inicio)
function HTML_Inicio (){
    cuerpoDePagina.innerHTML = ""
    cuerpoDePagina.innerHTML = `
    <h1 class="titleMain">Ficheros de Alumnos</h1>
    <p class="subTittleMain">Seleccione una opción para mostrar las Fichas de los Alumnos.</p>
            <div class="d-grid gap-2 d-md-flex justify-content-md-center main__botones">
                <button class="btn btn-primary" id="mostrarTodos" type="button">Mostrar Todos</button>
                <button class="btn btn-primary" id="mostrarAprobados" type="button">Mostrar Aprobados</button>
                <button class="btn btn-primary" id="mostrarDesaprobados" type="button">Mostrar Desaprobados</button>
                <button class="btn btn-primary" id="limpiarVista" type="button">Limpiar Vista</button>
            </div>
            <div class="container">
                <section class="row" id="cartaAlumno"></section>
            </div>
    `
// Capturo de Botonos Inicio
    let btnMostrarTodos = document.getElementById("mostrarTodos");
    let btnMostrarAprobados = document.getElementById("mostrarAprobados");
    let btnMostrarDesaprobados = document.getElementById("mostrarDesaprobados");
    let btnLimpiarVista = document.getElementById("limpiarVista");

// Eventos de Botones
    btnMostrarTodos.addEventListener("click", MostrarTodos);
    btnMostrarAprobados.addEventListener("click", MostrarAprobados);
    btnMostrarDesaprobados.addEventListener("click", MostrarDesaprobados);
    btnLimpiarVista.addEventListener("click", Limpiar);

// Captura la Seccion de Fichas en el DOM
    let sectionFichas = document.getElementById("cartaAlumno");

// Funcion Limpiar Vista
    function Limpiar() {
        sectionFichas.innerHTML = "";
    }

// Funcion Mostrar Todas Las Fichas 
    function MostrarTodos () {
        let fichasTemp = TraerStorageJSON()
        Limpiar()
        // Operador Ternario - Si es TRUE muestra error con el msj enviado. Si es FALSE genera las fichas
        fichasTemp.length === 0 ? FichasVacias("No existen Fichas de Alumnos.") : MostrarFichas(fichasTemp);
    };

// Funcion Mostrar Fichas de Alumnos Aprobados
    function MostrarAprobados(){
        let fichasTemp = TraerStorageJSON()
        let aprobados = []
        Limpiar()
        for (let ficha of fichasTemp){
            if (ficha.Promedio >= 6){
                aprobados.push(ficha)
            }
        }
        // Operador Ternario - Si es TRUE muestra error con el msj enviado. Si es FALSE genera las fichas
        aprobados.length === 0 ? FichasVacias("No hay Alumnos Aprobados o la lista esta vacía.") : MostrarFichas(aprobados);
    };

// Funcion Mostrar Fichas de Alumnos Desaprobados
    function MostrarDesaprobados(){
        let fichasTemp = TraerStorageJSON()
        let desaprobados = []
        Limpiar()
        for (let ficha of fichasTemp){
            if (ficha.Promedio < 6){
                desaprobados.push(ficha)
            }
        }
        // Operador Ternario - Si es TRUE muestra error con el msj enviado. Si es FALSE genera las fichas
        desaprobados.length === 0 ? FichasVacias("No hay Alumnos Desaprobados o la lista esta vacía.") : MostrarFichas(desaprobados);
    };

// Funcion donde genera las Fichas para mostrarlas
    function MostrarFichas(fichas) {
        fichas.forEach((elem)=>{         
            let fichaAlumno = document.createElement("div");
            fichaAlumno.setAttribute("class", "mb-3 col-4");
            fichaAlumno.innerHTML = ""
            fichaAlumno.innerHTML = `
                <article class="card fichaAlumno">
                    <div class="card-header bg-success lead d-flex justify-content-evenly">
                        <div class="bg-success lead border-success fw-bold">${elem.Alumno}</div>
                        <div class="bg-success">DNI:&nbsp${elem.dni}</div>
                    </div>
                    <div class="card-body text-dark">
                        <h5 class="card-title">Notas Obtenidas en:</h5>
                        <p class="card-text">1er Trimestre: ${elem.Notas[0]} Puntos</p>
                        <p class="card-text">2do Trimestre: ${elem.Notas[1]} Puntos</p>
                        <p class="card-text">3er Trimestre: ${elem.Notas[2]} Puntos</p>
                    </div>
                    <div class="card-body text-dark text-center border-top border-secondary">
                        <h6 class="card-title">Promedio Final: <span class="card-text text-danger">${elem.Promedio}</span></h6>
                    </article>`
            sectionFichas.appendChild(fichaAlumno);
        })
    };
}

// ---- Seccion AGREGAR ALUMNO ----
let btnAgregar = document.getElementById('menuAgregar')
btnAgregar.addEventListener('click', HTML_AgregarAlumno)
function HTML_AgregarAlumno (){
    cuerpoDePagina.innerHTML = ""
    cuerpoDePagina.innerHTML = `
        <h1 class="titleMain">Agregar Nuevo Alumnos</h1>
        <p class="subTittleMain">Cargar los datos solicitados para generar la Ficha del Alumno.</p>
            <div>
                <form class="formAgregarAlumno">
                    <div class="nuevo__inputs">
                        <label for="nombreAlumno">Nombre y Apellido del Alumno:&nbsp</label>
                        <input type="text" id="inputNombre" name="Nombre" style="width: 250px;">
                        <label for="nombreAlumno">DNI:&nbsp</label>
                        <input type="number" id="inputDNI" name="DNI" style="width: 150px;"><br>
                        <div class="">
                            <label for="notas" style="padding: 5px 30px;">Notas Obtenidas en Cada Trimestre:</label><br>
                            <div class="grupo__select">
                                <div>
                                    <label>1er Trimestre:&nbsp</label>
                                    <select name="notaObtenida_1" id="inputNotaTrimestre1">
                                        <option hidden disabled selected value></option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </select>
                                </div>
                                <div>
                                    <label>2do Trimestre:&nbsp</label>
                                    <select name="notaObtenida_2" id="inputNotaTrimestre2">
                                        <option hidden disabled selected value></option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </select>
                                </div>
                                <div>
                                    <label>3ro Trimestre:&nbsp</label>
                                    <select name="notaObtenida_3" id="inputNotaTrimestre3">
                                        <option hidden disabled selected value></option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="nuevo__botones">
                        <button class="btn btn-primary" id="btnGuardarAlumno" type="button">Guardar</button>
                        <button class="btn btn-primary" id="btnBorrar" type="Reset">Borrar</button>
                    </div>
                </form>
            </div>
            `
    let guardarLibroBtn = document.getElementById('btnGuardarAlumno')
    guardarLibroBtn.onclick = () => {GuardarAlumno()}

    // Funcion Guardar Alumno con los datos cargados en el Form.
    function GuardarAlumno(){
        let saveNombre = document.getElementById("inputNombre")
        let saveDni = document.getElementById("inputDNI")
        let saveNota1 = document.getElementById("inputNotaTrimestre1")
        let saveNota2 = document.getElementById("inputNotaTrimestre2")
        let saveNota3 = document.getElementById("inputNotaTrimestre3")
        let notas = [parseInt(saveNota1.value), parseInt(saveNota2.value), parseInt(saveNota3.value)]
        //Envio el array notas para obtener el promedio
        let promedioFinal = ObtenerPromedio(notas).toFixed(2)
        //Traigo Fichas de Alumnos del LocalStorage
        let fichasTemp = TraerStorageJSON();
        //Creo nuevo objeto Alumno asignando los value de los Inputs
        let nuevoAlumno = new Alumno(fichasTemp.length + 1, saveNombre.value, saveDni.value, notas, promedioFinal)
        //Push de Alumno creado al array
        fichasTemp.push(nuevoAlumno);
        //Guardo en LocalStore el array con el Alumno creado
        GuardarStorageJSON(fichasTemp);
        Swal.fire({
            title: `Ficha Generada`,
            text: `La ficha del Alumno/a ${nuevoAlumno.Alumno} ah sido Guardada!`,
            icon: "success",
            timer: 2500,
            showConfirmButton: false,
        })
    }

    //Funcion para obtener promedio, recibe el array con las notas ingresada y devuelve el resultado
    function ObtenerPromedio (total) {
        let acum = 0;
        for (i in total){
            acum = acum + total[i];
        }
        return (acum / total.length);
    }
}

// ---- Seccion BUSCAR ALUMNO----
let btnBuscar = document.getElementById('menuBuscar')
btnBuscar.addEventListener('click', HTML_BuscarAlumno)
function HTML_BuscarAlumno(){
    cuerpoDePagina.innerHTML = ""
    cuerpoDePagina.innerHTML = `
    <h1 class="titleMain">Buscar Alumno</h1>
    <p class="subTittleMain">Acá podrá buscar la por Nombre o Apellido con la opción de Eliminar.</p>
        <section>
            <form class="formBuscarAlumno">
                <div>
                    <label for="nombreAlumno">Nombre y/o Apellido del Alumno:</label>
                    <input type="text" id="inputNombreBuscar" name="titulo" style="width: 500px;"><br>
                </div>
                <div class="buscar__botones">
                    <button class="btn btn-primary" id="btnBuscarAlumno" type="button">Buscar</button>
                    <button class="btn btn-primary" id="btnBorrar" type="Reset">Borrar</button>
                </div>
            </form>
        </section>
        <div class="container">
            <section class="row" id="cartaAlumno"></section>
        </div>
    `
    //Traigo los datos almacenados en el Local Storage
    let fichasEnStorage = TraerStorageJSON()

    //Capturo los elemntos del DOM
    let sectionFichas = document.getElementById("cartaAlumno");
    let btnBuscarAlumno = document.getElementById("btnBuscarAlumno");
    let btnBorrar = document.getElementById("btnBorrar");

    //Asigno eventos a los botones de Buscar y Borrar
    btnBuscarAlumno.addEventListener("click", BuscarFicha);
    btnBorrar.addEventListener("click", Limpiar);

    //Funcion donde Busca el dato ingresado y devuelve el resultado
    function BuscarFicha () {
        let inputNomBuscar = document.getElementById("inputNombreBuscar")
        nombreABuscar = inputNomBuscar.value
        //Verificamos que existan datos en LocalStorage
        if (fichasEnStorage == null){
            alert("No hay Alumnos cargados o la lista esta vacia..")
        }else{ 
            //sino existe realizo el filtro en el array donde incluya el Nombre o Apellido que buscamos
            let buscando = fichasEnStorage.filter((elem) => elem.Alumno.includes(nombreABuscar))
            //Si no encuentra el nombre o apellido buscado, arroja el error.
            if (buscando.length == 0){ 
                Swal.fire({
                    title: `Ficha Inexistente!`,
                    text: `La ficha del Alumno/a ${nombreABuscar} no existe!`,
                    icon: "error",
                    timer: 2500,
                    showConfirmButton: false,
                })
            //Si encontro datos, muestro en la o las cartas encontradas.
            }else{
                Limpiar()
                buscando.forEach((carta) => {
                    let fichaAlumno = document.createElement("div");
                    fichaAlumno.setAttribute("class", "mb-3 col-4");
                    fichaAlumno.innerHTML = ""
                    fichaAlumno.innerHTML = `<article class="card fichaAlumno">
                    <div class="card-header bg-success lead text-center border-success">${carta.Alumno}</div>
                    <div class="card-body text-dark">
                        <h5 class="card-title">Notas Obtenidas en:</h5>
                        <p class="card-text">1er Trimestre: ${carta.Notas[0]} Puntos</p>
                        <p class="card-text">2do Trimestre: ${carta.Notas[1]} Puntos</p>
                        <p class="card-text">3er Trimestre: ${carta.Notas[2]} Puntos</p>
                    </div>
                    <div class="card-footer text-danger text-center border-success">Promedio Final: ${carta.Promedio}</div>
                    </article>
                    <div class="d-md-flex justify-content-center btnEliminar">
                        <button class="btn btn-sm btn-danger" id="btnEliminarBuscado${carta.id}">
                            Eliminar Alumno
                        </button>
                    </div>`
                    sectionFichas.appendChild(fichaAlumno);
                    
                    //Capturo el/los botones para poder Eliminar la ficha solicitada.
                    let btnEliminarBuscado = document.getElementById(`btnEliminarBuscado${carta.id}`)
                    btnEliminarBuscado.addEventListener("click", () => EliminarFicha(carta));
                })
            }
        }
    }

    //Funcion donde elimina la ficha encontrada con confirmacion para eliminar y resultado.
    function EliminarFicha (carta) {
        let fichaAEliminar = fichasEnStorage.find((elem) => (elem.id == carta.id))
        //Swal Pregunta
        Swal.fire({
            title: `Desea eliminar ficha?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: 'Sí, seguro',
            cancelButtonText: 'No, no quiero',
            confirmButtonColor: 'green',
            cancelButtonColor: 'red',
        }).then((respuesta) => {
            //Swal Acepto Elimniar
            if(respuesta.isConfirmed){
                for (let i in fichasEnStorage){
                    if (fichaAEliminar.id == fichasEnStorage[i].id){
                        fichasEnStorage.splice(i,1);
                        GuardarStorageJSON(fichasEnStorage)
                    }
                }
                Swal.fire({
                    title: `Ficha Eliminada`,
                    text: `La ficha del Alumno/a ${fichaAEliminar.Alumno} ah sido eliminada!`,
                    icon: "success",
                    timer: 3000,
                    showConfirmButton: false,
                })
                Limpiar()
            }else{
                //Swal Cancelo Eliminar
                Swal.fire({
                    title: `Ficha No Eliminada`,
                    text: `No se elimino la ficha del Alumno/a ${fichaAEliminar.Alumno}`,
                    icon: "info",
                    timer: 3000,
                    showConfirmButton: false,
                })
            }
        })   
    }

    // Funcion para limpiar la vista.
    function Limpiar() {
        sectionFichas.innerHTML = "";
    }
}