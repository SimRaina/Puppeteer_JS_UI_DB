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
        await page.waitForSelector('input')
        await page.reload()
        await page.goto('https://github.com/simraina')
        await page.goBack()
        await page.goForward()
        await browser.close()
    })
})