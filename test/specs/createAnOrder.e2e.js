const page = require('../../page');
const helper = require('../../helper')

describe ('Create an order', () => {
    it('Setting the address', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await expect($(page.fromField)).toHaveValue('East 2nd Street, 601');
        await expect($(page.toField)).toHaveValue('1300 1st St');
});
it('select Supportive button', async () => {
    await browser.url('/');
    await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
    const supportiveTariff = await page.selectSupportiveButton();
    await expect(supportiveTariff).toHaveElementClass('active'); // Check for the active class
});
it('Filling in the phone number', async () => {
    await browser.url('/')
    await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
    const phoneNumber = helper.getPhoneNumber("+1");
    await page.submitPhoneNumber(phoneNumber);
    await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
});

it('should add a credit card', async () => {
    await browser.url('/')
    await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
    const card = helper.getCardNumber();
    const code = helper.getCardCode();
    await page.addCreditCard(card, code);
    await expect(await $(`${page.paymentMethodAddedCard}`)).toBeExisting();
});

it('should send a message to the driver', async () => {
    await browser.url('/')
    await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
    await page.fillDriverMessage('Get some whiskey');
    await expect($(page.driverMessageField)).toHaveValue('Get some whiskey');
});

it('should order a blanket and handkerchiefs', async () => {
    await browser.url('/')
    await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
    await page.selectSupportiveButton();
    await page.clickBlanketsAndHandkerchiefs();
    await expect($(page.blanketAndHanderchiefsButton)).ToBeChecked;
});

it('should order 2 ice creams', async () => {
    await browser.url('/')
    await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
    await page.selectSupportiveButton();
    await page.addIceCream();
    await expect($(page.counterValue)).toHaveText("2");
});

it('should show the car search modal', async () => {
    await browser.url('/')
    await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
    await page.selectSupportiveButton();
    const phoneNumber = helper.getPhoneNumber("+1");
    await page.submitPhoneNumber(phoneNumber);
    const card = helper.getCardNumber();
    const code = helper.getCardCode();
    await page.addCreditCard(card, code);
    const closeCardPaymentButton= await($(page.closeCardPaymentButton));
    await  closeCardPaymentButton.click();
    await page.fillOutInfo();
    await expect($(page.carSearch)).toBeExisting();
}),

it('should wait for the info driver to appear', async () => {
    await browser.url('/')
    await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
    await page.selectSupportiveButton();
    const phoneNumber = helper.getPhoneNumber("+1");
    await page.submitPhoneNumber(phoneNumber);
    const card = helper.getCardNumber();
    const code = helper.getCardCode();
    await page.addCreditCard(card, code);
    const closeCardPaymentButton= await($(page.closeCardPaymentButton));
    await  closeCardPaymentButton.click();
    await page.fillOutInfo();
    await page.driverInfoAppear();
    await expect($(page.driverInfo)).toBeExisting();
})
});
