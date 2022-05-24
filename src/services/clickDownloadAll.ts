/* internal */
import clg from '@core/clg'

export default async function (page: any) : Promise<void> {
    try {
        await page.waitForTimeout(2000)
        await page.waitForSelector('.btn-download-all')
        await page.click('.btn-download-all')
    } catch (error) {
        clg('Error clicking to download all notes', 'error')
        console.log(error)
    }
}
