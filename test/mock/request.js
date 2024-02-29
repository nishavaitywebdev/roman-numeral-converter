const output = { "conversions": [{ "input": "10", "output": "X" }, { "input": "11", "output": "XI" }, { "input": "12", "output": "XII" }, { "input": "13", "output": "XIII" }, { "input": "14", "output": "XIV" }, { "input": "15", "output": "XV" }] };

export default function integerToRomanRange() {
    return new Promise((resolve, reject) => {
        process.nextTick(() =>
            resolve(output)
        );
    });
}
