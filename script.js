
// saving from and to currency acronym on change
var fromCurrencyValue
var toCurrencyValue
var conversion_Rate

// getting currency list from api
async function fetchCurrencises() {
    // fetching list of currencies
    var response = await fetch("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json");
    response = await response.json();

    // adding options in from currency selection list
    await optionsConvertFrom(response)
    // adding options in to currency selection list
    await optionsConvertTo(response)

    // storing pre-selected values in global variable 
    fromCurrencyValue = document.getElementById('convertFrom').value;
    toCurrencyValue = document.getElementById('convertTo').value;

    // fetching conversion rate for pre-selected currencies
    await getConversionRate(fromCurrencyValue, toCurrencyValue)
}
fetchCurrencises();


// adding options with value attribute
function optionsConvertFrom(object) {
    var select = document.getElementById("convertFrom");
    for (var key in object) {
        let option = document.createElement("option");
        option.value = key
        option.text = object[key];
        if (key == 'usd') { option.setAttribute("selected", "") }
        select.add(option);
    }
}


// adding options with value attribute
function optionsConvertTo(object) {
    var select = document.getElementById("convertTo");
    for (var key in object) {
        let option = document.createElement("option");
        option.value = key
        option.text = object[key];
        if (key == 'inr') { option.setAttribute("selected", "") }
        select.add(option);
    }
}


// fetching conversion rate for pre-selected currencies
async function getConversionRate() {
    try {
        var response = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromCurrencyValue}/${toCurrencyValue}.json`);
        response = await response.json();
        document.getElementById('conversionRate').value = response[toCurrencyValue].toFixed(4);
        conversion_Rate = response[toCurrencyValue];
        convertedValue();
    } catch (err) {
        throw (err);
    }
}


// calculating conversion value
function convertedValue() {
    let sampleValue = document.getElementById('sampleValue').value;
    document.getElementById('convertedValue').value = (+sampleValue * conversion_Rate).toFixed(2);
}

// calculating conversion value
function sampleValue() {
    let convertedValue = document.getElementById('convertedValue').value;
    document.getElementById('sampleValue').value = (+convertedValue / conversion_Rate).toFixed(2);
}


// getting on change for from currency
document.getElementById('convertFrom').addEventListener('change', () => {
    var value = document.getElementById('convertFrom').value;
    fromCurrencyValue = value
    getConversionRate(fromCurrencyValue, toCurrencyValue);
})


// getting on change for to currency
document.getElementById('convertTo').addEventListener('change', () => {
    var value = document.getElementById('convertTo').value;
    toCurrencyValue = value;
    getConversionRate(fromCurrencyValue, toCurrencyValue);
})