import { type Page } from "@playwright/test";

export class HomePage {

    readonly url: string;
    readonly page: Page;

    constructor (page: Page) {
        this.page = page;
        this.url = "https://play.pokemonshowdown.com/";
    }

    async goto () {
        await this.page.goto(this.url);
    }

    async gotoTeamBuilder () {
        await this.page.getByRole('button', { name: 'Teambuilder' }).click();
    }
}