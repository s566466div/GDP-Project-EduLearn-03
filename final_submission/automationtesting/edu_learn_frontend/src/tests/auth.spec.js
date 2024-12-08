const { test, expect } = require('@playwright/test');

test.describe('Registration Functionality in Edu-Learn', () => {
    test('ELU-001: Successful registration with valid student data', async ({ page }) => {
        // Step 1: Navigate to the Registration Page
        await page.goto('http://localhost:3000/signup');

        // Set a custom timeout
        test.setTimeout(60000);

        // Step 2: Enter valid registration details
        await page.fill('input[name="firstName"]', 'Edu');
        await page.fill('input[name="lastName"]', 'Learn');
        await page.fill('input[name="email"]', 'edulearn1234@gmail.com');
        await page.fill('input[name="password"]', 'Edulearn@1234');
        
        // Explicit wait for confirmPassword field
        await page.waitForSelector('input[name="comfirmPassword"]', { timeout: 10000 });
        await page.fill('input[name="comfirmPassword"]', 'Edulearn@1234');
        
        await page.check('input[value="student"]'); // Selects the "Student" radio button

        // Step 3: Submit the registration form
        await page.click('button[type="submit"]'); 
        // Expected Result: Redirect to login page
        await expect(page).toHaveURL('http://localhost:3000');
    });
    
    test.describe('Login Functionality in Edu-Learn', () => {
        test('ELU-004: Test login functionality with valid credentials for "Student" role', async ({ page }) => {
            // Step 1: Navigate to the Login Page
            await page.goto('http://localhost:3000');
    
            // Set a custom timeout
            test.setTimeout(60000);
    
            // Step 2: Enter valid login credentials and select "Student" role
            await page.fill('input[name="email"]', 'edulearn1234@gmail.com');
            await page.fill('input[name="password"]', 'Edulearn@1234');
            await page.check('input[value="student"]'); // Select Student role radio button
    
            // Step 3: Click the Login button
            await page.click('button[type="submit"]');
    
            // Expected Result: Redirect to the Dashboard page
            await expect(page).toHaveURL('http://localhost:3000/dashboard');
        });
    });
});
