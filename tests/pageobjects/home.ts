import {Page, Locator} from '@playwright/test';

export class HomePage{
    readonly page: Page;
    readonly homeButton: Locator;
    readonly shopButton: Locator;
    readonly contactButton: Locator;
    readonly loginButton: Locator;
    readonly cartButton: Locator;
    readonly startShoppingButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.homeButton = page.getByRole('link', {name: 'Home'});
        this.shopButton = page.getByRole('link', {name: 'Shop', exact: true});
        this.contactButton = page.getByRole('link', {name: 'Contact'});
        this.loginButton = page.getByRole('link', {name: 'Login'});
        this.cartButton = page.getByRole('link', {name: 'Cart'});
        this.startShoppingButton = page.getByRole('button', {name: 'Start Shopping'});
    }

    async goto(){
        await this.page.goto('https://jupiter.cloud.planittesting.com');
    }
}
