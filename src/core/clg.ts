/* external */
import colors from 'colors'

export default function (...params: any) {
    const name: string = colors.bgGreen.black('GLINUS')
    const time: string = colors.bold(new Date().toLocaleTimeString())
    console.log('>', name, time, String(...params))
}
