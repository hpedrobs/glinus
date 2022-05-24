/* internal */
import clg from '@core/clg'
import validation from '@core/validation'
import acceptCookies from '@services/acceptCookies'
import login from '@services/login'
import formNotesReceived from '@services/formNotesReceived'
import pageQueryNfes from '@services/pageQueryNfes'
import checkIfNoResult from '@services/checkIfNoResult'
import clickDownloadAll from '@services/clickDownloadAll'
import clickDownloadModal from '@services/clickDownloadModal'

/* external */
import { chromium } from 'playwright'

;(async () => {
    clg('Starting..', 'success')

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

        await page.pause()

        clg('filling out form..')
        await formNotesReceived(pageQuery)
        clg('completed form!')

        clg('check if there are no results..')
        const result: Boolean = await checkIfNoResult(pageQuery)

        if (result) {
            clg('click to download..')
            await clickDownloadAll(pageQuery)

            clg('click for modal download..')
            await clickDownloadModal(pageQuery)
        }

        await pageQuery.waitForTimeout(1500)

        await browser.close()
    }
})()
