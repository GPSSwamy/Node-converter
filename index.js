// Fixed currency conversion rates
const FIXED_RATES = {
    INR_TO_USD: 0.012, // Example fixed rate: 1 INR = 0.012 USD
    USD_TO_INR: 83.33  // Example fixed rate: 1 USD = 83.33 INR
};

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function convertCurrency(amount, fromCurrency, toCurrency) {
    if (fromCurrency === 'INR' && toCurrency === 'USD') {
        return amount * FIXED_RATES.INR_TO_USD;
    } else if (fromCurrency === 'USD' && toCurrency === 'INR') {
        return amount * FIXED_RATES.USD_TO_INR;
    } else {
        throw new Error('Unsupported currency conversion');
    }
}

function startConversion() {
    rl.question('Enter amount: ', (amountInput) => {
        const amount = parseFloat(amountInput);
        if (isNaN(amount)) {
            console.log('Invalid amount. Please try again.');
            return startConversion();
        }

        rl.question('Enter from currency (INR/USD): ', (fromCurrency) => {
            if (!['INR', 'USD'].includes(fromCurrency.toUpperCase())) {
                console.log('Invalid from currency. Please try again.');
                return startConversion();
            }

            rl.question('Enter to currency (INR/USD): ', (toCurrency) => {
                if (!['INR', 'USD'].includes(toCurrency.toUpperCase())) {
                    console.log('Invalid to currency. Please try again.');
                    return startConversion();
                }

                try {
                    const convertedAmount = convertCurrency(amount, fromCurrency.toUpperCase(), toCurrency.toUpperCase());
                    console.log(`Converted Amount: ${convertedAmount.toFixed(2)} ${toCurrency.toUpperCase()}`);
                } catch (error) {
                    console.log(error.message);
                }

                rl.question('Do you want to convert another amount? (yes/no): ', (answer) => {
                    if (answer.toLowerCase() === 'yes') {
                        startConversion();
                    } else {
                        console.log('Thank you for using the currency converter!');
                        rl.close();
                    }
                });
            });
        });
    });
}

console.log('Welcome to the Currency Converter CLI!');
startConversion();
