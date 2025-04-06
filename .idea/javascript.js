//Variables del joc
var colors = ["vermell", "blau", "groc", "verd", "negre", "blanc", "taronja", "lila"];
var sequencia = [];
var resposta = [];
var esperaClics = false;
var encertsSeguits = 0;

// Iniciar el joc
function comencarJoc() {
    sequencia = [];
    resposta = [];
    encertsSeguits = 0;
    actualitzarComptador();
    afegirColor();
    mostrarSequencia();
}

// Actualitzar el comptador
function actualitzarComptador() {
    document.getElementById("comptador").innerText = "Encerts seguits: " + encertsSeguits;
}

// Afegir un color a la sequència
function afegirColor() {
    var num = Math.floor(Math.random() * 8);
    sequencia.push(colors[num]);
}

// Mostrar la sequència de colors
function mostrarSequencia() {
    esperaClics = false;
    document.getElementById("missatge").innerText = "Memoritza...";
    var quadrats = document.getElementsByClassName("color");

    function mostrar(i) {
        if (i >= sequencia.length) {
            esperaClics = true;
            resposta = [];
            document.getElementById("missatge").innerText = "Repeteix la sequència";
            return;
        }

        var colorIndex = colors.indexOf(sequencia[i]);
        quadrats[colorIndex].style.opacity = "0.5";

        setTimeout(function() {
            quadrats[colorIndex].style.opacity = "1";
            setTimeout(function() { mostrar(i + 1); }, 500);
        }, 500);
    }

    mostrar(0);
}

// Comprovar la resposta del jugador
function comprovar(color) {
    if (!esperaClics) return;

    resposta.push(color);
    var quadrats = document.getElementsByClassName("color");
    var index = colors.indexOf(color);

    // Efecte visual
    quadrats[index].style.opacity = "0.5";
    setTimeout(function() { quadrats[index].style.opacity = "1"; }, 200);

    // Comprovar resposta
    if (color != sequencia[resposta.length-1]) {
        document.getElementById("missatge").innerText = "Error! Torna a començar.";
        encertsSeguits = 0;
        actualitzarComptador();
        esperaClics = false;
        return;
    }

    // Següent nivell
    if (resposta.length == sequencia.length) {
        encertsSeguits++;
        actualitzarComptador();
        document.getElementById("missatge").innerText = "Correcte! Següent nivell...";
        esperaClics = false;
        setTimeout(function() {
            afegirColor();
            mostrarSequencia();
        }, 1000);
    }
}

// Configurar els clics
var totsQuadrats = document.querySelectorAll(".color");
for (var i = 0; i < totsQuadrats.length; i++) {
    totsQuadrats[i].onclick = function() {
        comprovar(this.getAttribute("data-color"));
    };
}
