// Obtener la lista de todos los Pokemon
$.getJSON('https://pokeapi.co/api/v2/pokemon?offset=0&limit=898', function(data) {
  let pokemonList = data.results;
  let options = $("#pokemonSelect");

  // Agregar opciones al select
  $.each(pokemonList, function(index, pokemon) {
    options.append($("<option/>").val(pokemon.url).text(pokemon.name));
  });
});

// Función para mostrar la información del Pokemon seleccionado
function showPokemonInfo(pokemonUrl) {
  $.getJSON(pokemonUrl, function(pokemon) {
    let name = pokemon.name;
    let image = pokemon.sprites.other.dream_world.front_default;
    let height = pokemon.height;
    let weight = pokemon.weight;
    let abilities = pokemon.abilities;
    let stats = pokemon.stats;

    // Construir la tabla de habilidades
    let abilitiesTable = "<table>";
    $.each(abilities, function(index, ability) {
      abilitiesTable += "<tr><td>" + ability.ability.name + "</td></tr>";
    });
    abilitiesTable += "</table>";

    // Construir la tabla de stats
  let statsTable = "<table>";
    $.each(stats, function(index, stat) {
      statsTable += "<tr><td>" + stat.stat.name + "</td><td>" + stat.base_stat + "</td></tr>";
    });
    statsTable += "</table>";

    // Construir el HTML para mostrar la información del Pokemon
    let pokemonInfoHTML = "<h2>" + name + "</h2>";
    pokemonInfoHTML += "<img src='" + image + "'><br>";
    pokemonInfoHTML += "<strong>Altura:</strong> " + height + "<br>";
    pokemonInfoHTML += "<strong>Peso:</strong> " + weight + "<br>";
    pokemonInfoHTML += "<strong>Habilidades:</strong><br>" + abilitiesTable + "<br>";
    pokemonInfoHTML += "<strong>Stats:</strong><br>" + statsTable;

    // Mostrar la información del Pokemon
    $("#pokemon-detail").html(pokemonInfoHTML); 
  });
}

// Agregar el evento onChange al select para mostrar la información del Pokemon seleccionado
$("#pokemonSelect").change(function() {
  let pokemonUrl = $(this).val();
  if (pokemonUrl) {
    showPokemonInfo(pokemonUrl);
  } else {
    $("#pokemon-detail").html("");
  }
});