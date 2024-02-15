const integerToRoman = (req, res) => {
    const { min, max, query } = req.query;
    if (min && max) {
        processRangeOfRomanNumerals(min, max, res);
    } else {
        const numberStr = query;
        processSingleRomanNumeral(numberStr, res);
    }
};

const checkIfValidInput = (numStr) => {
    const num = Number(numStr);
    return !isNaN(num) && num >= 1 && num <= 3999;
}

const getFormattedResponse = (number, romanNumeral = getRomanEquivalent(number)) => {
    return {
        input: number.toString(),
        output: romanNumeral
    };
};

const getRomanEquivalent = (number) => {
    let romanSymbols = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
    let numberValues = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];

    let result = "";

    for (let i = 0; i < numberValues.length && number > 0; i++) {
        while (numberValues[i] <= number) {
            number -= numberValues[i];
            result += romanSymbols[i];
        }
    }
    return result;
}

const processSingleRomanNumeral = (numberStr, res) => {
    const isValid = numberStr && checkIfValidInput(numberStr);
    if (isValid) {
        const romanNumeral = getRomanEquivalent(Number(numberStr));
        const response = getFormattedResponse(numberStr, romanNumeral);
        res.send(response);
    } else {
        res.send({
            message: "Error: Please provide a valid integer in the range 1 - 3999 as query."
        });
    }
}

async function parallel(arr, fn, threads = 5) {
    const result = [];
    while (arr.length) {
        const res = await Promise.all(arr.splice(0, threads).map(num => fn(num))).then((values) => values);
        result.push(res);
    }
    return result.flat(threads - 1);
}

async function integerToRomanRange(min, max) {
    const arr = [];
    for (let i = min; i <= max; i++) arr.push(i);
    const res = await parallel(arr, getFormattedResponse);
    return {
        "conversions": res
    };
}

const processRangeOfRomanNumerals = (min, max, res) => {
    const isValidMin = checkIfValidInput(min);
    const isValidMax = checkIfValidInput(max);
    if (isValidMin && isValidMax && (min <= max)) {
        integerToRomanRange(min, max).then(formattedResponse => res.send(formattedResponse));
    } else {
        res.send({
            message: "Error: Please provide a valid min and max integer in the range 1 - 3999."
        });
    }
}

module.exports = {
    integerToRoman
}