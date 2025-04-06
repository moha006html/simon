// Variables del joc
var colors = ["vermell", "blau", "groc", "verd", "negre", "blanc", "taronja", "lila"]; // Llista dels colors disponibles
var sequencia = []; // Seqüència de colors que el jugador ha de memoritzar
var resposta = []; // Resposta del jugador
var esperaClics = false; // Variable per controlar si s'espera la resposta del jugador
var encertsSeguits = 0; // Comptador d'encerts seguits

// Iniciar el joc
function comencarJoc() {
    sequencia = []; // Netejar la seqüència
    resposta = []; // Netejar la resposta
    encertsSeguits = 0; // Reiniciar el comptador d'encerts
    actualitzarComptador(); // Actualitzar el comptador de la UI
    afegirColor(); // Afegir un color a la seqüència
    mostrarSequencia(); // Mostrar la seqüència per memoritzar
}

// Actualitzar el comptador d'encerts seguits
function actualitzarComptador() {
    document.getElementById("comptador").innerText = "Encerts seguits: " + encertsSeguits; // Mostrar els encerts en la interfície
}

// Afegir un color a la seqüència
function afegirColor() {
    var num = Math.floor(Math.random() * 8); // Seleccionar un color aleatori
    sequencia.push(colors[num]); // Afegir el color a la seqüència
}

// Mostrar la seqüència de colors perquè el jugador la memoritzi
function mostrarSequencia() {
    esperaClics = false; // No es poden fer clics encara
    document.getElementById("missatge").innerText = "Memoritza..."; // Missatge per l'usuari
    var quadrats = document.getElementsByClassName("color"); // Obtenir tots els quadrats de colors

    // Funció recursiva per mostrar la seqüència
    function mostrar(i) {
        if (i >= sequencia.length) { // Quan ja hem mostrat tota la seqüència
            esperaClics = true; // Permetre que l'usuari faci clic
            resposta = []; // Netejar la resposta
            document.getElementById("missatge").innerText = "Repeteix la seqüència"; // Missatge de repetició
            return;
        }

        var colorIndex = colors.indexOf(sequencia[i]); // Trobar l'índex del color actual a la seqüència
        quadrats[colorIndex].style.opacity = "0.5"; // Fer que el color s'apagui temporalment

        // Mostrar el color durant un temps
        setTimeout(function() {
            quadrats[colorIndex].style.opacity = "1"; // Tornar el color a la seva opacitat original
            setTimeout(function() { mostrar(i + 1); }, 500); // Esperar 500ms abans de mostrar el següent color
        }, 500);
    }

    mostrar(0); // Començar a mostrar la seqüència
}

// Comprovar la resposta del jugador
function comprovar(color) {
    if (!esperaClics) return; // Si no s'està esperant una resposta, sortir de la funció

    resposta.push(color); // Afegir el color a la resposta
    var quadrats = document.getElementsByClassName("color"); // Obtenir tots els quadrats de colors
    var index = colors.indexOf(color); // Obtenir l'índex del color seleccionat

    // Efecte visual de clicar sobre el quadrat
    quadrats[index].style.opacity = "0.5"; // Fer que el color s'apagui
    setTimeout(function() { quadrats[index].style.opacity = "1"; }, 200); // Tornar el color a la seva opacitat original després de 200ms

    // Comprovar si la resposta és incorrecta
    if (color != sequencia[resposta.length - 1]) {
        document.getElementById("missatge").innerText = "Error! Torna a començar."; // Missatge d'error
        encertsSeguits = 0; // Reiniciar els encerts seguits
        actualitzarComptador(); // Actualitzar el comptador
        esperaClics = false; // Bloquejar els clics
        return;
    }

    // Si la resposta és correcta i el jugador ha completat tota la seqüència
    if (resposta.length == sequencia.length) {
        encertsSeguits++; // Augmentar els encerts seguits
        actualitzarComptador(); // Actualitzar el comptador
        document.getElementById("missatge").innerText = "Correcte! Següent nivell..."; // Missatge de resposta correcta
        esperaClics = false; // Bloquejar els clics mentre es carrega la següent seqüència
        setTimeout(function() {
            afegirColor(); // Afegir un altre color a la seqüència
            mostrarSequencia(); // Mostrar la nova seqüència
        }, 1000);
    }
}

// Configurar els clics als quadrats de colors
var totsQuadrats = document.querySelectorAll(".color"); // Obtenir tots els quadrats
for (var i = 0; i < totsQuadrats.length; i++) {
    totsQuadrats[i].onclick = function() {
        comprovar(this.getAttribute("data-color")); // Comprovar el color quan es fa clic
    };
}
