const puppeteer = require('puppeteer')

describe('My First Test', () => {
    it('should launch browser', async function() {
        const browser = await puppeteer.launch({
            headless: false, 
            slowMo: 50, 
            devtools: false
        })
        const page = await browser.newPage()
        await page.goto('https://www.amazon.com/')
        await page.type('#twotabsearchtextbox', 'jeans')
        await page.click('#nav-search-submit-button')
        await browser.close()
    })
})