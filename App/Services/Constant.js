export const TOKEN = "@easypay:token";
export function currencyFormat(num) {
    return '$ ' + parseFloat(num).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
export function getCardLastNumber(num) {
    var temp = num.substr(num.length - 4)
    return '****'+temp
}