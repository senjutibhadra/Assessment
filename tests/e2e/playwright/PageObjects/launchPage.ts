import { expect, type Locator, type Page } from "@playwright/test";
// Launch URL
export class Launch{
    readonly page:Page;
    readonly start:Locator;
    constructor(page:Page){
        this.page=page;
        this.start=page.locator('//button[text()="Start Managing Documents"]');
    }
    async launchUrl(){
        await this.page.goto('');
        console.log("width : ",await this.page.viewportSize()?.width);
        console.log("height : ",await this.page.viewportSize()?.height);
    }
    async startButton(){
        await this.start.click();
    }
}