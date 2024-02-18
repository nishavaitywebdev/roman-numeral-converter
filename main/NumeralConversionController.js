const { getRomanEquivalent } = require('./IntegerRomanConvertor.js');
const { incrementRequest, incrementSuccessfulRequest, incrementErrorRequest } = require('./Analytics.js');
/**
 * The function consumes the request params and starts processing the 
 * numeral conversion for a single or range of numerals.
 * @param {Request} req 
 * @param {Response} res 
 */
const integerToRoman = (req, res) => {
    const { min, max, query } = req.query;
    const startTime = performance.now();
    incrementRequest();
    if (min && max) {
        processRangeOfRomanNumerals(min, max, res);
    } else {
        const numberStr = query;
        processSingleRomanNumeral(numberStr, res);
    }
    const endTime = performance.now();
    // Splunk/Application Logging can be added here 
    console.log(`Processed request for - ${query ? "number - " + query : "range  " + min + "-" + max} and it took ${endTime - startTime}ms`);
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

const processSingleRomanNumeral = (numberStr, res) => {
    const isValid = numberStr && checkIfValidInput(numberStr);
    if (isValid) {
        const romanNumeral = getRomanEquivalent(Number(numberStr));
        const response = getFormattedResponse(numberStr, romanNumeral);
        incrementSuccessfulRequest();
        res.send(response);
    } else {
        incrementErrorRequest();
        // Splunk/Application Logging can be added here 
        console.log(`Exception caught while processing number ${numberStr}.`)
        res.send({
            message: "Error: Please provide a valid integer in the range 1 - 3999 as query."
        });
    }
}

/**
 * The parallel function processes tasks in concurrently.  
 * @param {Array} arr contains values that we want to process concurrently.
 * @param {Function} fn a function that performs a task asynchronously
 * @param {Number} threads maximum number of concurrent threads to use, default will be 5
 * @returns {Array}
 */
async function parallel(arr, fn, threads = 5) {
    const result = [];
    while (arr.length) {
        const res = await Promise.all(arr.splice(0, threads).map(num => fn(num)));
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
        integerToRomanRange(min, max).then(formattedResponse => {
            incrementSuccessfulRequest();
            res.send(formattedResponse)
        })
            .catch(exception => {
                // Splunk/Application Logging can be added here 
                console.log(`Exception caught while processing ${"range  " + min + "-" + max}. Exception details ${exception}`);
            });
    } else {
        incrementErrorRequest();
        res.send({
            message: "Error: Please provide a valid min and max integer in the range 1 - 3999."
        });
    }
}

module.exports = {
    integerToRoman,
    integerToRomanRange
}