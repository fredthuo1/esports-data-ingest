function transformAndEnrich(message) {
    // Convert message string to JSON object
    const data = JSON.parse(message);

    // Sample transformation: renaming a field
    if (data.oldFieldName) {
        data.newFieldName = data.oldFieldName;
        delete data.oldFieldName;
    }

    // Sample enrichment: adding a timestamp field
    data.receivedAt = new Date().toISOString();

    return JSON.stringify(data);
}

module.exports = {
    transformAndEnrich
};
