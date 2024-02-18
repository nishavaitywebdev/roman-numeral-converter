
jest.mock('./mock/request.js');

const httpMocks = require('node-mocks-http');

const { integerToRoman, integerToRomanRange } = require("../main/NumeralConversionController");

const getHttpRequest = (query) => {
    const request = httpMocks.createRequest({
        method: 'GET',
        url: `/romannumeral?${query}`
    });
    
    return request;
}
const expectedRangeOutput = { "conversions": [{ "input": "10", "output": "X" }, { "input": "11", "output": "XI" }, { "input": "12", "output": "XII" }, { "input": "13", "output": "XIII" }, { "input": "14", "output": "XIV" }, { "input": "15", "output": "XV" }] };

const response = httpMocks.createResponse();

test('should return valid response for 9 as XI', () => {
    const request = getHttpRequest("query=9");
    integerToRoman(request, response);
    const expectedRomanValue = response._getData();
    expect(expectedRomanValue).toEqual({"input": "9", "output": "IX"});
});

test('should return valid response for 3999', () => {
    const request = getHttpRequest("query=3999");
    integerToRoman(request, response);
    const expectedRomanValue = response._getData();
    expect(expectedRomanValue).toEqual({"input": "3999", "output": "MMMCMXCIX"});
});

test('should return error mesaage for 4000', () => {
    const request = getHttpRequest("query=4000");
    integerToRoman(request, response);
    const expectedValue = response._getData();
    expect(expectedValue).toEqual({"message": "Error: Please provide a valid integer in the range 1 - 3999 as query."});
});

test('should return error mesaage for 0', () => {
    const request = getHttpRequest("query=0");
    integerToRoman(request, response);
    const expectedValue = response._getData();
    expect(expectedValue).toEqual({"message": "Error: Please provide a valid integer in the range 1 - 3999 as query."});
});

test('should return error mesaage for "0"', () => {
    const request = getHttpRequest("query='0'");
    integerToRoman(request, response);
    const expectedValue = response._getData();
    expect(expectedValue).toEqual({"message": "Error: Please provide a valid integer in the range 1 - 3999 as query."});
});

test('should return error mesaage for range 100 - 0', () => {
    const request = getHttpRequest("min=100&max=0");
    integerToRoman(request, response);
    const expectedValue = response._getData();
    expect(expectedValue).toEqual({"message": "Error: Please provide a valid min and max integer in the range 1 - 3999."});
});

test('should return error message for range 10 - 100a', () => {
    const request = getHttpRequest("min=0&max=100a");
    integerToRoman(request, response);
    const expectedValue = response._getData();
    expect(expectedValue).toEqual({"message": "Error: Please provide a valid min and max integer in the range 1 - 3999."});
});


test('should return valid response in range 10 - 15 in sequence', () => {
    const min = 10, max = 15;
    return integerToRomanRange(min, max).then(data => {
        expect(data).toEqual(expectedRangeOutput);
        let isSequential = true;
        for (let i = 0; i < (max-min); i++) {
            if (expectedRangeOutput.conversions[i].input != (min + i).toString()) {
                isSequential = false;
            }
        }
        expect(isSequential).toBe(true);
    });
});
