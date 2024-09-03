// validateQuery.js

function validateQuery(query) {
    // Define valid SQL keywords for your custom query language
    const validKeywords = ['SELECT', 'FROM', 'WHERE', 'INSERT', 'UPDATE', 'DELETE'];

    // Regular expression to match a basic SQL query pattern
    const queryPattern = /^(SELECT|INSERT|UPDATE|DELETE)\s+.*?\s+(FROM|WHERE|INTO|SET)\s+.*?;$/i;

    // Normalize the query (trim and convert to uppercase)
    const normalizedQuery = query.trim().toUpperCase();

    // Check if the query matches the basic pattern
    if (!queryPattern.test(normalizedQuery)) {
        return { isValid: false, message: 'Query syntax is invalid.' };
    }

    // Extract keywords used in the query
    const wordsInQuery = normalizedQuery.split(/\s+/);
    const usedKeywords = new Set(wordsInQuery.filter(word => validKeywords.includes(word)));

    // Identify missing keywords
    const missingKeywords = validKeywords.filter(keyword => !usedKeywords.has(keyword));

    // Check if query is missing important components
    if (normalizedQuery.startsWith('SELECT') && !usedKeywords.has('FROM')) {
        return { isValid: false, message: 'SELECT queries must include FROM.' };
    }
    if (normalizedQuery.startsWith('UPDATE') && !usedKeywords.includes('SET')) {
        return { isValid: false, message: 'UPDATE queries must include SET.' };
    }
    if (normalizedQuery.startsWith('INSERT') && !usedKeywords.includes('INTO')) {
        return { isValid: false, message: 'INSERT queries must include INTO.' };
    }
    if (normalizedQuery.startsWith('DELETE') && !usedKeywords.includes('FROM')) {
        return { isValid: false, message: 'DELETE queries must include FROM.' };
    }

    if (missingKeywords.length > 0) {
        return { isValid: false, message: `Keywords not defined: ${missingKeywords.join(', ')}` };
    }

    return { isValid: true, message: 'Query is valid.' };
}

module.exports = validateQuery;
