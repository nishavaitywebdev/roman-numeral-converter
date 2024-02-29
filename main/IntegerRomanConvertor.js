const romanSymbols = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
const numberValues = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];

const getRomanEquivalent = (number) => {
    let result = "";
    for (let i = 0; i < numberValues.length && number > 0; i++) {
        while (numberValues[i] <= number) {
            number -= numberValues[i];
            result += romanSymbols[i];
        }
    }
    return result;
}

module.exports = {
    getRomanEquivalent
}
