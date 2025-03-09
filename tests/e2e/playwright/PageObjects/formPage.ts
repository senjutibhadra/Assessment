import { expect, type Locator, type Page } from "@playwright/test";

let empId:string="TEST005";
//variable declaration
export class FormSubmission{
    readonly page:Page;
    readonly formBTN:Locator;
    readonly firstNameInput:Locator;
    readonly lastNameInput:Locator;
    readonly employeeID:Locator;
    readonly phoneNo:Locator;
    readonly salary:Locator;
    readonly dateInput:Locator;
    readonly supervisorEmail:Locator;
    readonly costCenter:Locator;
    readonly projectCode:Locator;
    readonly consent:Locator;
    readonly submit:Locator;
    readonly elementExists:Locator;
    
    //elements identification
    constructor(page:Page){
        this.page=page;
        this.formBTN=page.locator('//a[text()="Form"]');
        this.firstNameInput=page.locator('//input[@id="firstName"]');
        this.lastNameInput=page.locator('//input[@id="lastName"]');
        this.employeeID=page.locator('//input[@id="employeeId"]');
        this.phoneNo=page.locator('//input[@id="phoneNumber"]');
        this.salary=page.locator('//input[@id="salary"]');
        this.dateInput=page.locator('//input[@id="startDate"]');
        this.supervisorEmail=page.locator('//input[@id="supervisorEmail"]');
        this.costCenter=page.locator('//input[@id="costCenter"]');
        this.projectCode=page.locator('//input[@id="projectCode"]');
        this.consent=page.locator('//button[@id="privacyConsent"]');
        this.submit=page.locator('//button[text()="Submit Document"]');
        //reusable xpath - parameterized
        this.elementExists=page.locator('//td[contains(text(), "${empId}")]');

    }
    //Click Form button
    async clickForm(){
        await this.formBTN.click();
        console.log("Form button is clicked");
    }
    //Fill the form
    async fillForm(){
        await this.firstNameInput.fill('Raina');
        await this.lastNameInput.fill('Mukh');
        await this.employeeID.fill(empId);
        await this.phoneNo.fill('9842541635');
        await this.salary.fill('195700');
        await this.dateInput.waitFor({ state: 'visible' });
        await this.supervisorEmail.fill('test@gmail.com');
        await this.costCenter.fill('CC-XX-YYY');
        await this.projectCode.fill('PRJ-2025-001');
        await this.consent.scrollIntoViewIfNeeded();
        await this.consent.click(); 
        await this.submit.click();
        console.log("Form is submitted");

    }
    //Verifying that the data is added in results page
    async verifyData(){
        await this.elementExists.isVisible();
        console.log(empId, " is present in Result page.")
        }

}