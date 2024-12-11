module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    codeField: '#code',
    cardNumberField: '//div[@class="card-number-input"]//input[@id="number"]',
    cvvField: '//div[@class="card-code-input"]//input[@id="code"]',
    driverMessageField: '//div[@class="input-container"]//input[@id="comment"]',
    // Buttons
    callATaxiButton: 'button=Call a taxi',
    phoneNumberButton: '//div[@class="np-button"]',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
  supportiveButton: '//div[@class="tcard-title" and text()="Supportive"]/..', // Gets the parent div
supportiveButtonActive: '.tcard-i.active',
paymentMethodButton: '//div[@class="pp-text"]',
addCardButton: '//div[@class="pp-row disabled"]',
linkCardButton: 'button=Link',
paymentMethodAddedCard: "//div[@class='pp-title' and text()='Card']",
driverMessageButton: '//div[@class="label"]',
blanketAndHanderchiefsButton: '//div[@class="switch"]',
addIceCreamButton: '//div[@class="counter"]//div[@class="counter-plus"]',
closeCardPaymentButton: '//div[@class="payment-picker open"]//div[@class="section active"]//button[@class="close-button section-close"]',
orderCarButton: '//button[@class="smart-button"]',
    // Modals
    phoneNumberModal: '.modal',
    paymentMethodModal: '.payment-picker',
    addCardModal: '//div[@class="modal unusual"]',
    carSearch: '//div[@class="order-body"]',
    driverArrivalModal: '//div[@class="order-body"]',
    // Icons
    cardIcon: 'path',
    driverInfo: '//div[@class="order-button"]//img[@alt="close"]',
  
    // Counters
    counterValue: '//div[@class="counter-value"]',
    // Functions
    fillAddresses: async function(from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        const toField = await $(this.toField);
        await toField.setValue(to);
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },
    selectSupportiveButton: async function() {
        const supportiveButton = await $(this.supportiveButton);
        await supportiveButton.waitForDisplayed();
        await supportiveButton.click();
        // Return the element that should be active
        return await $(this.supportiveButtonActive);
},
    fillPhoneNumber: async function(phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await browser.pause(2000);
        await phoneNumberButton.waitForClickable();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },
    submitPhoneNumber: async function(phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        // we are starting interception of request from the moment of method call
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        // we should wait for response
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(2000);
        const codeField = await $(this.codeField);
        // collect all responses
        const requests = await browser.getRequests();
        // use first response
        await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code
        await codeField.setValue(code)
        await $(this.confirmButton).click()
    },
addCreditCard: async function(card,code) {
const addCreditCardField = await $(this.paymentMethodButton);
await addCreditCardField.waitForDisplayed();
await addCreditCardField.click();
const paymentMethodModal=await $(this.paymentMethodModal);
await paymentMethodModal.waitForDisplayed();
const addCardButton= await $(this.addCardButton);
await addCardButton.waitForDisplayed();
await addCardButton.click();
const addCardModal = await $(this.addCardModal);
await addCardModal.waitForDisplayed();
const cardNumberField= await $(this.cardNumberField);
await cardNumberField.waitForDisplayed();
await cardNumberField.setValue(card);
const cvvField= await $(this.cvvField);
await cvvField.waitForClickable();
await cvvField.setValue(code);
await browser.keys('Tab');
await $(this.linkCardButton).click();
},
    fillDriverMessage: async function() {
    const driverMessageField = await $(this.driverMessageField);
    await driverMessageField.waitForDisplayed();
    await driverMessageField.setValue('Get some whiskey');
},

clickBlanketsAndHandkerchiefs: async function() {
    const blanketAndHanderchiefsButton = await $(this.blanketAndHanderchiefsButton);
    await blanketAndHanderchiefsButton.waitForClickable();
    await blanketAndHanderchiefsButton.click();
},

addIceCream: async function() {
    const addIceCreamButton = await $(this.addIceCreamButton);
    await addIceCreamButton.waitForClickable();
    await addIceCreamButton.click();
    await addIceCreamButton.click();
},

orderCar: async function() {
    const orderCarButton = await $(this.orderCarButton);
    await orderCarButton.waitForClickable();
    await orderCarButton.click();
},
fillOutInfo: async function() {
    await this.fillDriverMessage('Get some whiskey');
    await this.clickBlanketsAndHandkerchiefs();
    await this.addIceCream();
    await this.orderCar();
    },
driverInfoAppear : async function () {
    const driverArrival = await $(this.driverArrivalModal);
    await browser.pause(15000);
    await driverArrival.waitForDisplayed();
},

} ;