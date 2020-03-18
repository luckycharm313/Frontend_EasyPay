export const TOKEN = "@easypay:token";
export function currencyFormat(num) {
    return '$ ' + parseFloat(num).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export const STRIPE_PUBLISHABLE_KEY = "pk_test_JY6qPEEYGAq2RQhdzK2F8nMu00QTAnscxc";