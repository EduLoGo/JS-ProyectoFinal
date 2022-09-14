//Clase Alumno y Constructor con 2 funciones
class Alumno {
    constructor(id, nombre, dni, notas, promedio) {
        this.id = id;
        this.Alumno = nombre;
        this.dni = dni;
        this.Notas = notas;
        this.Promedio = promedio;
    }
}

//Declaro el Array Prinicipal
let fichasDeAlumnos = [];

//Carga los datos desde API local y guarda en el LocalStorage solo si no existe la Key.
const cargarDatosAPI = async () =>{
    const resp = await fetch("../json/alumnos.json")
    const datos = await resp.json()
    for(let ficha of datos){
                let alumnoNuevo = new Alumno (ficha.id, ficha.alumno, ficha.dni, ficha.notas, ficha.promedio)
                fichasDeAlumnos.push(alumnoNuevo)
            }
            if (localStorage.getItem("AlumnosFullJSON") == null){
                localStorage.setItem("AlumnosFullJSON", JSON.stringify(fichasDeAlumnos))
            }
}
cargarDatosAPI()