import {Page, Locator} from '@playwright/test';

export class ContactPage{
    readonly page: Page;
    readonly forenameField: Locator;
    readonly surnameField: Locator;
    readonly emailField: Locator;
    readonly telephoneField: Locator;
    readonly messageField: Locator;
    readonly submitButton: Locator;
    readonly forenameError: Locator;
    readonly emailError: Locator;
    readonly messageError: Locator;
    readonly messageBanner: Locator;
    readonly errorMessage: string;
    readonly successMessage: Locator;
    readonly submitPopup: Locator;

    constructor(page: Page){
        this.page = page;
        this.forenameField = page.locator('input[name="forename"]');
        this.surnameField = page.locator('input[name="surname"]');
        this.emailField = page.locator('input[name="email"]');
        this.telephoneField = page.locator('input[name="telephone"]');
        this.messageField = page.locator('textarea[name="message"]');
        this.submitButton = page.getByRole('link', { name: 'Submit' });
        this.forenameError = page.getByText('Forename is required');
        this.emailError = page.getByText('Email is required');
        this.messageError = page.getByText('Message is required');
        this.messageBanner = page.getByText('We welcome your feedback -');
        this.errorMessage = "We welcome your feedback - but we won't get it unless you complete the form correctly.";
        this.successMessage = page.getByText('Thanks ');
        this.submitPopup = page.getByRole('heading', { name: 'Sending Feedback' });

    }

    async fillForm(forename: string, email: string, message: string){
        await this.forenameField.fill(forename);
        await this.emailField.fill(email);
        await this.messageField.fill(message);
    }
    
}