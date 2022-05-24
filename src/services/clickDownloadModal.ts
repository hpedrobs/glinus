/* internal */
import clg from '@core/clg'

export default async function (page: any): Promise<void> {
    try {
        await page.waitForTimeout(2000)
        await page.waitForSelector('#dnwld-all-btn-ok')
        await page.click('#cmpPagPer')
        // await page.type('#cmpPagIni', String(settings.pageInicial))
        // await page.type('#cmpPagFin', String(settings.pageFinal))
        await page.click('#dnwld-all-btn-ok')
    } catch (error) {
        clg('Error clicking to download grades on drop-down screen', 'error')
        console.log(error)
    }
}
