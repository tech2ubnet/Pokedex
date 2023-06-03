const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    const buscarPokemon = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    fetch(buscarPokemon).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokeImage("./img/404 Not Found.png")
        }
        else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            // ID del Pokemon
            let pokeId = data.id;
            pokeNum(pokeId);
            console.log(pokeId);

            // Nombre del Pokemon
            let pokeNam = data.name;
            pokeNombre(pokeNam.charAt(0).toUpperCase() + pokeNam.slice(1));
            console.log(pokeNam.charAt(0).toUpperCase() + pokeNam.slice(1));

            // Altura del Pokemon
            let pokeH = data.height;
            pokePeso(pokeH);
            console.log(pokeH);

            // Peso del Pokemon
            let pokeW = data.weight;
            pokeAltura(pokeW);
            console.log(pokeW);

            // Imagen del Pokemon
            let pokeImg = data.sprites.front_default;
            pokeImage(pokeImg);
            console.log(pokeImg);

            // Tipo o Tipos del Pokemon
            let pokeTypes = data.types.map(tipo => tipo.type.name.charAt(0).toUpperCase() + tipo.type.name.slice(1));
            pokeTipo(pokeTypes);
            console.log(pokeTypes);

            // Estadisticas del Pokemon
            let pokeStats = data.stats.map(est => ({ nombre: abreviarNombre(est.stat.name), valor: est.base_stat }));
            pokeEst(pokeStats);
            console.log(pokeStats);

            // Movimientos del Pokemon
            let pokeMoves = data.moves.map(mov => mov.move.name.toUpperCase());
            pokeMove(pokeMoves);
            console.log(pokeMoves);
        }
    });
}

const pokeNum = (pokeId) => {
    Numero = document.getElementById("pokeId");
    Numero.textContent = `N.° ${pokeId}`;
}

const pokeNombre = (pokeNam) => {
    nombre = document.getElementById("pokeNam");
    nombre.textContent = `${pokeNam}`;
}

const pokePeso = (pokeH) => {
    Peso = document.getElementById("pokeH");
    Peso.textContent = `Height: ${pokeH / 10} m`;
}

const pokeAltura = (pokeW) => {
    Altura = document.getElementById("pokeW");
    Altura.textContent = `Weight: ${pokeW / 10} kg`;
}

const pokeImage = (buscarPokemon) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = buscarPokemon;
}

const pokeTipo = (tipos) => {
    const tipoElement = document.getElementById("pokeTypes");
    tipoElement.innerHTML = '';

    tipos.forEach(tipo => {
        const typeBox = document.createElement("div");
        typeBox.classList.add("type-box", tipo.toLowerCase());
        typeBox.textContent = tipo;
        tipoElement.appendChild(typeBox);
    });
};

// Función para abreviar el nombre de la estadística
function abreviarNombre(nombre) {
    switch (nombre.toLowerCase()) {
        case "hp":
            return "HP";
        case "attack":
            return "Atk";
        case "defense":
            return "Def";
        case "special-attack":
            return "Sp. Atk";
        case "special-defense":
            return "Sp. Def";
        case "speed":
            return "Spd";
        default:
            return nombre.toUpperCase();
    }
}

const pokeEst = (pokeStats) => {
    const estadisticasElement = document.getElementById("pokeStats");
    estadisticasElement.innerHTML = ""; // Limpiamos el contenido anterior

    pokeStats.forEach(stat => {
        const statElement = document.createElement("div");
        statElement.classList.add("stat");

        const statName = document.createElement("span");
        statName.classList.add("stat-name");
        statName.textContent = `${stat.nombre}:`.padEnd(40, ".");
        statElement.appendChild(statName);

        const statValue = document.createElement("span");
        statValue.classList.add("stat-value");
        statValue.textContent = stat.valor;
        statElement.appendChild(statValue);

        estadisticasElement.appendChild(statElement);
    });
};

const pokeMove = (pokeMoves) => {
    Movimientos = document.getElementById("pokeMoves");
    Movimientos.innerHTML = ""; // Limpiamos el contenido anterior

    pokeMoves.forEach((move, index) => {
        const moveElement = document.createElement("div");
        const formattedMove = move.replace("-", " ");
        moveElement.textContent = `${index + 1}. ${formattedMove}`;
        Movimientos.appendChild(moveElement);
    });
}