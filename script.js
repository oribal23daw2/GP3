const cloud = document.getElementById("cloud");
const barraLateral = document.querySelector(".barra-lateral");
const spans = document.querySelectorAll("span");
const palanca = document.querySelector(".switch");
const circulo = document.querySelector(".circulo");
const menu = document.querySelector(".menu");
const main = document.querySelector("main");

menu.addEventListener("click", () => {
    barraLateral.classList.toggle("max-barra-lateral");
    if (barraLateral.classList.contains("max-barra-lateral")) {
        menu.children[0].style.display = "none";
        menu.children[1].style.display = "block";
    } else {
        menu.children[0].style.display = "block";
        menu.children[1].style.display = "none";
    }
    if (window.innerWidth <= 320) {
        barraLateral.classList.add("mini-barra-lateral");
        main.classList.add("min-main");
        spans.forEach((span) => {
            span.classList.add("oculto");
        });
    }
});

palanca.addEventListener("click", () => {
    let body = document.body;
    body.classList.toggle("dark-mode");
    body.classList.toggle("");
    circulo.classList.toggle("prendido");
});

cloud.addEventListener("click", () => {
    barraLateral.classList.toggle("mini-barra-lateral");
    main.classList.toggle("min-main");
    spans.forEach((span) => {
        span.classList.toggle("oculto");
    });
});

document.querySelectorAll(".navegacion a").forEach(link => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        const sectionId = link.id + "-section";
        mostrarSeccion(sectionId);
        setActiveMenuItem(link);

        if (link.id === 'registres') {
            obtenerEstadisticas();
        }
    });
});

function mostrarSeccion(seccionId) {
    document.querySelectorAll("main section").forEach(section => {
        section.classList.add("oculto");
    });
    document.getElementById(seccionId).classList.remove("oculto");
}

function setActiveMenuItem(activeItem) {
    document.querySelectorAll(".navegacion a").forEach(link => {
        link.classList.remove("active");
    });
    activeItem.classList.add("active");
}

// Mostrar la sección de bienvenida por defecto y cargar comandos
document.addEventListener("DOMContentLoaded", () => {
    mostrarSeccion("inici-section");
    obtenerComandos();
});

// Obtener y mostrar comandos automáticamente
async function obtenerComandos() {
    const commandList = document.getElementById('commandList');
    commandList.innerHTML = ''; // Limpiar la lista

    try {
        const commands = await window.electron.getCommands();
        commands.forEach(command => {
            const li = document.createElement('li');
            li.textContent = command.replace('.js', ''); // Eliminar el sufijo .js
            li.classList.add('command-item'); // Agregar clase CSS
            commandList.appendChild(li);
        });
    } catch (error) {
        console.error('Error al obtener comandos:', error);
    }
}

// Obtener y mostrar estadísticas del usuario
async function obtenerEstadisticas() {
    const statsContainer = document.getElementById('statsContainer');
    statsContainer.innerHTML = '<p>Loading stats...</p>'; // Mostrar mensaje de carga

    const userId = 'some-user-id'; // Reemplaza esto con el ID del usuario actual
    try {
        const stats = await window.electron.getStats(userId);
        if (!stats) {
            statsContainer.innerHTML = '<p>No hay estadísticas registradas.</p>';
            return;
        }

        statsContainer.innerHTML = `
            <div class="stats-item"><strong>Jocs Jugats:</strong> ${stats.games_played || 0}</div>
            <div class="stats-item"><strong>Jocs Guanyats:</strong> ${stats.games_won || 0}</div>
            <div class="stats-item"><strong>Jocs Perduts:</strong> ${stats.games_lost || 0}</div>
            <div class="stats-item"><strong>Lletres Correctes:</strong> ${stats.correct_letters || 0}</div>
            <div class="stats-item"><strong>Lletres Incorrectes:</strong> ${stats.incorrect_letters || 0}</div>
        `;
    } catch (error) {
        statsContainer.innerHTML = `<p>Error al obtener estadísticas: ${error}</p>`;
    }
}
