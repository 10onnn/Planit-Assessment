import { test, expect } from "@playwright/test";
import { HomePage } from "./pageobjects/home";
import { ContactPage } from "./pageobjects/contact";
import { CartPage } from "./pageobjects/cart";
import { ShopPage } from "./pageobjects/shop";
import formRaw from "../test-data/form.json";
import cartRaw from "../test-data/cart.json";

test("TC1", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.contactButton.click();
    
    const contactPage = new ContactPage(page);
    await contactPage.submitButton.click();
    await expect(contactPage.forenameError).toBeVisible();
    await expect(contactPage.emailError).toBeVisible();
    await expect(contactPage.messageError).toBeVisible();
    await expect(contactPage.messageBanner).toHaveText(contactPage.errorMessage);
    await contactPage.forenameField.fill("John");
    await contactPage.emailField.fill("john.example@planit.net.au");
    await contactPage.messageField.fill("This is a test message");
    await expect(contactPage.forenameError).not.toBeVisible();
    await expect(contactPage.emailError).not.toBeVisible();
    await expect(contactPage.messageError).not.toBeVisible();
    await expect(contactPage.messageBanner).not.toHaveText(contactPage.errorMessage);
});

test("TC2", async ({ page }) => {
    test.setTimeout(120000);
    for (let i = 0; i < 5; i++) {
        const homePage = new HomePage(page);
        await homePage.goto();
        await homePage.contactButton.click();
        
        const contactPage = new ContactPage(page);
        const forename = formRaw[i].forename;
        const email = formRaw[i].email;
        const message = formRaw[i].message;
        await contactPage.fillForm(forename, email, message);
        await contactPage.submitButton.click();
        await contactPage.submitPopup.waitFor({state: 'hidden'});
        await expect(contactPage.successMessage).toBeVisible();
    }
});

test("TC3", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.shopButton.click();

    const shopPage = new ShopPage(page);
    await shopPage.buy(cartRaw[0].item, cartRaw[0].quantity);
    await shopPage.buy(cartRaw[1].item, cartRaw[1].quantity);
    await shopPage.buy(cartRaw[2].item, cartRaw[2].quantity);
    await shopPage.cartButton.click();
    
    //Verify the subtotal for each product
    const cartPage = new CartPage(page);
    for (let i = 1; i <= cartRaw.length; i++) {
        let price = await page.locator('xpath=/html[1]/body[1]/div[2]/div[1]/form[1]/table[1]/tbody[1]/tr[' + i + ']/td[2]').textContent();
        let quantity = await page.locator('xpath=/html[1]/body[1]/div[2]/div[1]/form[1]/table[1]/tbody[1]/tr[' + i + ']/td[3]/input[1]').inputValue();
        let subtotal = await page.locator('xpath=/html[1]/body[1]/div[2]/div[1]/form[1]/table[1]/tbody[1]/tr[' + i + ']/td[4]').textContent();
        if (price !== null) {
            cartPage.itemPrice = parseFloat(price.split('$')[1]);
        }
        if (quantity !== null) {
            cartPage.itemQuantity = parseInt(quantity);
        }
        if (subtotal !== null) {
            cartPage.itemSubtotal = parseFloat(subtotal.split('$')[1]);
        }
        expect(cartPage.itemSubtotal).toBe(cartPage.itemPrice * cartPage.itemQuantity);

    }

    //Verify the price for each product
    for (let i = 1 ; i <= cartRaw.length; i++) {
        let price = await page.locator('xpath=/html[1]/body[1]/div[2]/div[1]/form[1]/table[1]/tbody[1]/tr[' + i + ']/td[2]').textContent();
        if (price !== null) {
            cartPage.itemPrice = parseFloat(price.split('$')[1]);
        }
        expect (cartPage.itemPrice).toBe(cartRaw[i-1].price);
    }

    //Verify the toal = sum(subtotals)
    let runningTotal = 0;
    for (let i = 1; i <= cartRaw.length; i++) {
        let subtotal = await page.locator('xpath=/html[1]/body[1]/div[2]/div[1]/form[1]/table[1]/tbody[1]/tr[' + i + ']/td[4]').textContent();
        
        if (subtotal !== null) {
            cartPage.itemSubtotal = parseFloat(subtotal.split('$')[1]);
        }
        runningTotal += cartPage.itemSubtotal;
    }

    await cartPage.getTotal();
    expect(cartPage.cartTotal).toBe(runningTotal);

});
