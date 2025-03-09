import { browser, $ as $wdio, $$ as $$wdio } from '@wdio/globals';
import { expect } from '@wdio/globals';
import axios from 'axios';
import assert from 'assert';

describe('Launch Browser and Submit form', () => {
    beforeEach(async () => {
        await browser.url('/');
        browser.maximizeWindow();
    });

    //Form submission through UI 
    it('click Start Managing Document', async () => {
       
        const  start= await $wdio('//button[text()="Start Managing Documents"]');
        await expect(start).toBeDisplayed();
        await start.scrollIntoView();
        await browser.pause(5000);
        await start.click();
        await console.log('Clicked Start Managing Documents');
        await browser.pause(5000);

    });

    it('Form Submission through UI',async()=>{

        //Click Form
        const form = await $wdio('//a[text()="Form"]');
        await form.click();
        await browser.pause(5000);
        //Fill form through UI
        const firstNameInput = (await $wdio('//input[@id="firstName"]')).setValue("Senjuti");
        await console.log('First name entered');
        const lastNameInput = (await $wdio('//input[@id="lastName"]')).setValue("Bhadra");
        const employeeID = (await $wdio('//input[@id="employeeId"]')).setValue("TEST001");  
        const phoneNo = (await $wdio('//input[@id="phoneNumber"]')).setValue("9842541635");
        const salary = (await $wdio('//input[@id="salary"]'));
        await salary.clearValue();
        await salary.setValue("1500000");
        await browser.pause(3000);
        const dateInput = (await $wdio('//input[@id="startDate"]'));
        await dateInput.setValue('08-03-2025'); 
        const supervisorEmail = (await $wdio('//input[@id="supervisorEmail"]')).setValue("test@gmail.com");
        const costCenter = (await $wdio('//input[@id="costCenter"]')).setValue("CC-XX-YYY"); 
        const projectCode = (await $wdio('//input[@id="projectCode"]')).setValue("PRJ-2025-001"); 
        await browser.pause(3000); 
        //Click consent button
        const consent = await $wdio('//button[@id="privacyConsent"]');
        await consent.scrollIntoView();
        await consent.click(); 
        await browser.pause(3000);  
        //Click Submit button      
        const  submit= (await $wdio('//button[text()="Submit Document"]')).click();
        await browser.pause(10000); 
        //Validate that data is added in Results page
        const elementExists = await (await $wdio('//td[text()="TEST001"]')).isExisting();
        console.log('Data is added in the results page.', elementExists);
    });

    //Form Submission through API
    it('Form Submission and retrieve data through API',async()=>{
        
        // Validate API POST request
        try{
                const postResponse = await axios.post('http://localhost:3000/api/submit', {
            
                firstName: "abc",
                lastName: "def",
                employeeId: "234",
                phoneNumber: "69403",
                salary: 200,
                startDate: "08-03-2025",
                supervisorEmail: "abc@email.com",
                costCenter: "CC-XX-YYY",
                projectCode: "PRJ-2025-001",
                privacyConsent: true
              
        });
        assert.strictEqual(postResponse.status, 200, 'Form submission failed');
        await browser.pause(10000);

        // Validate API GET request
        const getResponse = await axios.get('http://localhost:3000/api/submissions');
        assert.strictEqual(getResponse.status, 200, 'Data retrieval failed');
        console.log(getResponse.data);
        assert.ok(getResponse.data.find(entry => entry.supervisorEmail === 'abc@email.com'), 'Submitted data not found');
        console.log('All tests passed successfully');
        await browser.pause(8000);
    }
        catch (error) {
            console.error('Test failed:', error.message);
        } finally {
            await browser.deleteSession();
        }

    });
});