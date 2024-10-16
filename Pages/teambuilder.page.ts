import {expect, Page } from "@playwright/test";
import type { Expect } from "@playwright/test"; 

export class TeamBuilder {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    
    async gotoCreateNewTeam() {
        await this.page.getByRole('button', { name: ' New Team' }).click();
    }

    async setGameFormat(format: string, generation: string) {
        await this.page.getByRole('button', { name: 'Select a format ' }).click();
        await this.page.getByPlaceholder('Search formats').pressSequentially(`[${generation}] ${format}`, { delay: 40 });
        await this.page.getByRole('button', { name: `[${generation}] ${format} ` }).click();
    }

    async validateGameFormat(expect: Expect) {
        await expect(this.page.locator('ol'), "Format game is set correctly").toContainText('[Gen 5] Ubers');
    }

    async gotoAddPokemon() {
        await this.page.getByRole('button', { name: ' Add Pokémon' }).click();
    }

    async validateTeam() {
        await this.page.getByRole('button', { name: 'Validate' }).click();

        const successMessage = this.page.locator('text=Your team is valid for [Gen 5] Ubers.');
        await expect(successMessage).toBeVisible({
            timeout: 5000,
        });
    }

    async validateTeamWithFailure(expectedErrors: string[]) {
        await this.page.locator('button:has-text("Validate")').click();

        for (const error of expectedErrors) {
            const errorMessage = this.page.locator(`text=${error}`);
            await expect(errorMessage).toBeVisible({
                timeout: 5000, 
            });
        }
    }

}
