const incrementRequest = () => {
    report.TotalRequests++;
}

const incrementSuccessfulRequest = () => {
    report.Successful++;
}

const incrementErrorRequest = () => {
    report.Errors++;
}

const report = {
    Successful: 0,
    TotalRequests: 0,
    Errors: 0
}

module.exports = {
    report,
    incrementRequest,
    incrementSuccessfulRequest,
    incrementErrorRequest
}
