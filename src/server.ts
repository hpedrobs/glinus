/* internal */
import clg from '@core/clg'
import validation from '@core/validation'
import acceptCookies from '@services/acceptCookies'
import login from '@services/login'
import formNotesReceived from '@services/formNotesReceived'
import pageQueryNfes from '@services/pageQueryNfes'

/* external */
import { chromium } from 'playwright'

;(async () => {
    clg('Starting..')

    const start: Boolean = await validation()

    if (start) {
        const browser = await chromium.launch({
            headless: false,
            slowMo: 1500,
            timeout: 10000
        })

        const page = await browser.newPage()

        await page.goto('https://www.economia.go.gov.br/')

        clg('accepting cookies..')
        await acceptCookies(page)
        clg('cookies accepted!')

        clg('logging in..')
        await login(page)
        clg('Login successfully!!!')

        clg('closing modal..')
        await page.frameLocator('iframe[name="iNetaccess"]').locator('text=Ok').click()
        clg('closed modal!')

        clg('entering the query page..')
        const pageQuery = await pageQueryNfes(page)
        clg('entered the query page!')

        clg('filling out form..')
        await formNotesReceived(pageQuery)
        clg('completed form!')

        await pageQuery.waitForTimeout(1500)

        await browser.close()
    }
})()
