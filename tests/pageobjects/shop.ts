import {Page, Locator} from '@playwright/test';

export class ShopPage{
    readonly page: Page;
    readonly cartButton: Locator;
    readonly stuffedfrogBuyButton: Locator;
    readonly fluffybunnyBuyButton: Locator;
    readonly valentinebearBuyButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.cartButton = page.getByRole('link', { name: 'Cart' });
        this.stuffedfrogBuyButton = page.locator('#product-2').getByRole('link', { name: 'Buy' });
        this.fluffybunnyBuyButton = page.locator('#product-4').getByRole('link', { name: 'Buy' });
        this.valentinebearBuyButton = page.locator('#product-7').getByRole('link', { name: 'Buy' });
    }

    async buy(item: string, quantity: number){
        if(item == "stuffedfrog"){
            for(let i = 0; i < quantity; i++){
                await this.stuffedfrogBuyButton.click();
            }
        }
        else if(item == "fluffybunny"){
            for(let i = 0; i < quantity; i++){
                await this.fluffybunnyBuyButton.click();
            }
        }
        else if(item == "valentinebear"){
            for(let i = 0; i < quantity; i++){
                await this.valentinebearBuyButton.click();
            }
        }
    }

}