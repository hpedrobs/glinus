/* internal */
import clg from '@core/clg'
import validation from '@core/validation'
import conset from '@services/conset'
import login from '@services/login'
import formNotesReceived from '@services/formNotesReceived'

/* external */
import { chromium } from 'playwright'

;(async () => {
    clg('Starting..')

    const start: Boolean = await validation()

    if (start) {
        const browser = await chromium.launch({ headless: false, slowMo: 1500, timeout: 10000 })
        const page = await browser.newPage()

        await page.goto('https://www.economia.go.gov.br/')

        await conset(page)

        await login(page)

        await page.frameLocator('iframe[name="iNetaccess"]').locator('text=Ok').click()

        const [pageConsultationNfes] = await Promise.all([
            page.waitForEvent('popup'),
            page.frameLocator('iframe[name="iNetaccess"]').locator('text=Baixar XML NFE').click()
        ])

        await formNotesReceived(pageConsultationNfes)
    }
})()
