import { Expect, expect, Page } from "@playwright/test";
import { IStatistics } from "../types/pokemon.types";
import test from "node:test";


export class AddPokemon {
    
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;

    }
    async addNewPokemon(
        name: string,
        item: string,
        ability: string,
        movements: string[],
        statistics: IStatistics
    ) {
        const delay = 150;
        await this.page.locator('input[name="pokemon"]').pressSequentially(name, {delay});
        await this.page.getByText(name).click();
        await this.page.locator('input[name="item"]').fill(item);
        await this.page.locator('input[name="ability"]').clear();
        await this.page.locator('input[name="ability"]').pressSequentially(ability, {delay});
        await this.page.locator(`input[name="move1"]`).fill(movements[0]);
        await this.page.locator(`input[name="move2"]`).fill(movements[1]);
        await this.page.locator(`input[name="move3"]`).fill(movements[2]);
        await this.page.locator(`input[name="move4"]`).fill(movements[3]);
        
        await this.page.getByRole('button', { name: 'EV HP Atk Def SpA SpD Spe' }).click();
        Object.keys(statistics).map(async statistic => {
            await this.page.locator(`input[name="evslider-${statistic}"]`).fill(statistics[statistic] ?? '');
        })
    }

    async validateEVPoints(index: number, expect: Expect) {
        test(`Validate that all EVs available for pokemon ${index} were spent`, async ()=>{
            await expect(this.page.locator('#room-teambuilder'),
            "were all EV points spent?"
            ).toContainText('0');
        })
    }

    async clickOnNewPokemon() {
        await this.page.locator('button[name="addPokemon"]').click();
        await this.page.locator('input[name="pokemon"]').click();
    }



}
