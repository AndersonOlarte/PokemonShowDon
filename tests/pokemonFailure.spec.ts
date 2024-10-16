import { test, expect } from "@playwright/test";
import { HomePage } from "../Pages/home.page";
import { TeamBuilder } from "../Pages/teambuilder.page";
import dataFailure from "../data/DatatestFailure.json";
import { AddPokemon } from "../Pages/addPokemon.page";

test.slow();
test("Set format game, add Pokemons, and validate team with failure", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  const teamBuilderPage = new TeamBuilder(page);

  await homePage.goto();
  await homePage.gotoTeamBuilder();
  await teamBuilderPage.gotoCreateNewTeam();
  await teamBuilderPage.setGameFormat(dataFailure.format, dataFailure.gen);
  await teamBuilderPage.validateGameFormat(expect);
  await teamBuilderPage.gotoAddPokemon();
  const addPokemon = new AddPokemon(page);
  let pokemonIndex = 1;

  for (const pokemon of dataFailure.pokemons) {
    await addPokemon.addNewPokemon(
      pokemon.name,
      pokemon.item,
      pokemon.ability,
      pokemon.movements,
      pokemon.evStatistics,
      pokemonIndex
    );
    await addPokemon.validateEVPoints(pokemonIndex);

    if (pokemonIndex < dataFailure.pokemons.length) {
      await addPokemon.clickOnNewPokemon();
    }
    ++pokemonIndex;
  }

  // En lugar de añadir otro Pokémon, hacemos clic en el botón "Team" después de añadir el último Pokémon
  await addPokemon.clickOnTeamButton();

  await teamBuilderPage.validateTeamWithFailure([
    "Arceus-Ghost needs to hold Spooky Plate to be in its Ghost forme.",
    "(It will revert to its Normal forme if you remove the item or give it a different item.)",
    "Swablu's move Endeavor is incompatible with Body Slam.",
    "Cloyster's move Double-Edge can only be learned in gens without Hidden Abilities.",
    "You are limited to one of each Pokémon by Species Clause.",
    "(You have more than one Arceus)",
  ]);
});
