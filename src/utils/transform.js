function processData(data) {
    try {
        const parsedData = JSON.parse(data);
        console.log('Parsed data:', parsedData);
        // Additional processing can be done here
    } catch (err) {
        console.error('Error parsing data:', err);
    }
}

module.exports = {
    processData
};
