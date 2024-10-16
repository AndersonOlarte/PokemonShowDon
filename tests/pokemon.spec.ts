import { test, expect } from "@playwright/test";
import { HomePage } from "../Pages/home.page";
import { TeamBuilder } from "../Pages/teambuilder.page";
import data from "../data/Datatest.json";
import { AddPokemon } from "../Pages/addPokemon.page";

test.slow();
test("Set format game", async ({ page }) => {
  const homePage = new HomePage(page);
  const teamBuilderPage = new TeamBuilder(page);

  await homePage.goto();
  await homePage.gotoTeamBuilder();
  await teamBuilderPage.gotoCreateNewTeam();
  await teamBuilderPage.setGameFormat(data.format, data.gen);
  await teamBuilderPage.validateGameFormat(expect);

  await teamBuilderPage.gotoAddPokemon();
  const addPokemon = new AddPokemon(page);
  let pokemonIndex = 1;

  for (const pokemon of data.pokemons) {
    await addPokemon.addNewPokemon(
      pokemon.name,
      pokemon.item,
      pokemon.ability,
      pokemon.movements,
      pokemon.evStatistics,
      pokemonIndex 
    );
    await addPokemon.validateEVPoints(pokemonIndex);
    if (pokemonIndex < data.pokemons.length) {
        await addPokemon.clickOnNewPokemon();
    }
    ++pokemonIndex;
  }

  await addPokemon.clickOnTeamButton();
  await teamBuilderPage.validateTeamWithMessage(["Your team is valid for [Gen 5] Ubers."]);
});
