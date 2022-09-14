//  Modo Oscuro para la Pagina
let modeDark
let perillaDarkMode = document.getElementById(`modoOscuro`)

// Operador Ternario - Chequeo si existe en LocasStorage
localStorage.getItem("darkMode") ? modeDark = localStorage.getItem("darkMode") : localStorage.setItem("darkMode", "Off");

// Operador Ternario - Si existe en LocalStorage corroboro Valor
modeDark == "On" ? document.body.classList.add("darkMode") : document.body.classList.remove("darkMode");

if (modeDark == "On"){
    perillaDarkMode.checked = true
}

//Evento del Switch para modo Oscuro o Claro con msj de Toastify
perillaDarkMode.addEventListener("click", () => {
    if (perillaDarkMode.checked == false){
        document.body.classList.remove("darkMode")
        localStorage.setItem("darkMode", "Off")
        Toastify({
            text: `Modo Oscuro: Desactivado`,
            className: "info",
            gravity: "bottom",
            style: {
                background: "#000",
                color: "#FFF",
            }
        }).showToast();
    }else{
        document.body.classList.add("darkMode")
        localStorage.setItem("darkMode", "On")
        Toastify({
            text: `Modo Oscuro: Activado`,
            className: "info",
            gravity: "bottom",
            style: {
                color: "#000",
                background: "#FFF",
            }
        }).showToast();
    }
})