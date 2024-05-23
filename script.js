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
        } else if (link.id === 'logs-partides') {
            obtenerLogsPartides();
        } else if (link.id === 'estadistiques') {
            obtenerEstadistiques();
        } else if (link.id === 'comandaments') {
            obtenerComandos();
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

async function obtenerLogsPartides() {
    const logsContainer = document.getElementById('logsContainer');
    logsContainer.innerHTML = '<p>Loading logs...</p>'; // Mostrar mensaje de carga

    try {
        const logs = await window.electron.getLogsPartides();
        if (logs.length === 0) {
            logsContainer.innerHTML = '<p>No hay registros disponibles.</p>';
            return;
        }

        const table = document.createElement('table');
        table.innerHTML = `
            <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>Username</th>
                <th>Tema</th>
                <th>Palabra</th>
                <th>Resultado</th>
                <th>Fecha</th>
            </tr>
        `;

        logs.forEach(log => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${log.id}</td>
                <td>${log.user_id}</td>
                <td>${log.username}</td>
                <td>${log.tema}</td>
                <td>${log.palabra}</td>
                <td>${log.resultado}</td>
                <td>${log.fecha}</td>
            `;
            table.appendChild(row);
        });

        logsContainer.innerHTML = '';
        logsContainer.appendChild(table);
    } catch (error) {
        logsContainer.innerHTML = `<p>Error al obtener registros: ${error}</p>`;
    }
}

async function obtenerEstadistiques() {
    const statsContainer = document.getElementById('statsContainer');
    statsContainer.innerHTML = '<p>Loading stats...</p>'; // Mostrar mensaje de carga

    try {
        const stats = await window.electron.getEstadistiques();
        if (stats.length === 0) {
            statsContainer.innerHTML = '<p>No hay estadísticas disponibles.</p>';
            return;
        }

        const table = document.createElement('table');
        table.innerHTML = `
            <tr>
                <th>User ID</th>
                <th>Username</th>
                <th>Jocs Jugats</th>
                <th>Jocs Guanyats</th>
                <th>Jocs Perduts</th>
                <th>Lletres correctes</th>
                <th>Lletres incorrectes</th>
            </tr>
        `;

        stats.forEach(stat => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${stat.user_id}</td>
                <td>${stat.username}</td>
                <td>${stat.games_played}</td>
                <td>${stat.games_won}</td>
                <td>${stat.games_lost}</td>
                <td>${stat.correct_letters}</td>
                <td>${stat.incorrect_letters}</td>
            `;
            table.appendChild(row);
        });

        statsContainer.innerHTML = '';
        statsContainer.appendChild(table);
    } catch (error) {
        statsContainer.innerHTML = `<p>Error al obtener estadísticas: ${error}</p>`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    obtenerComandos();
});
