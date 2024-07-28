import {Page, Locator} from '@playwright/test';

export class CartPage{
    readonly page: Page;
    cartTotal: number;
    total: Locator;
    itemPrice: number;
    itemQuantity: number;
    itemSubtotal: number;

    constructor(page: Page){
        this.page = page;
        this.total = page.getByText('Total:');
        this.itemPrice = 0;
        this.itemQuantity = 0;
        this.itemSubtotal = 0;
    }

    async getTotal(){
        let total = await this.total.innerText();
        this.cartTotal = parseFloat(total.split(': ')[1]);
    }
}
