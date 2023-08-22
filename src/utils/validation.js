function isValid(message) {
    // Convert message string to JSON object
    const data = JSON.parse(message);

    // Check for required fields
    if (!data.someRequiredField) {
        return false;
    }

    // Check data type
    if (typeof data.someField !== 'string') {
        return false;
    }

    // Other validation checks...

    return true;
}

module.exports = {
    isValid
};
