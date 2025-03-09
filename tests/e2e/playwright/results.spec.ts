import { test, expect } from '@playwright/test';
import { Launch } from './PageObjects/launchPage';
import { FormSubmission } from './PageObjects/formPage';
// test.arguments({viewport:{width:1536,height:864}})


test.describe('Results Page', () => {
    test.beforeEach(async ({page}) => {
        const launch=new Launch(page);
        await launch.launchUrl();
    });
    //Click Start Managing Document button
    test('click Start Managing Document', async ({ page }) => {
        const launch=new Launch(page);
        await page.waitForTimeout(5000)
        await launch.startButton();
        await page.waitForTimeout(5000)
        const fs=new FormSubmission(page);
        await page.waitForTimeout(5000)
        fs.clickForm();
        await page.waitForTimeout(5000)
        fs.fillForm();
        await page.waitForTimeout(5000)
        await fs.verifyData();
    });
});