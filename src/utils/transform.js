function parseDataObject(data) {
    // Ensure top-level keys are present
    const id = data.id || 'N/A';
    const occurredAt = data.occurredAt || 'N/A';
    const correlationId = data.correlationId || 'N/A';
    const seriesId = data.seriesId || 'N/A';
    const sequenceNumber = data.sequenceNumber || 'N/A';
    const sessionSequenceNumber = data.sessionSequenceNumber || 'N/A';

    // Ensure events key is present and is an array
    const events = Array.isArray(data.events) ? data.events : [];

    // Ensure seriesState key is present and is an object
    const seriesState = typeof data.seriesState === 'object' ? data.seriesState : {};

    return {
        id,
        occurredAt,
        correlationId,
        seriesId,
        sequenceNumber,
        sessionSequenceNumber,
        events,
        seriesState
    };
}

function processData(rawData) {
    try {
        const data = parseDataObject(JSON.parse(rawData));

        const seriesInformation = extractSeriesInformation(data);
        const playerInteractions = extractPlayerInteractions(data.events);
        const gameInsights = extractGameInsights(data);

        console.log('Series Information:', seriesInformation);
        console.log('Player Interactions:', playerInteractions);
        console.log('Game Insights:', gameInsights);

    } catch (err) {
        console.error('Error parsing or processing data:', err);
    }
}

function extractSeriesInformation(data) {
    return {
        id: data.id,
        occurredAt: data.occurredAt,
        correlationId: data.correlationId,
        seriesId: data.seriesId,
        sequenceNumber: data.sequenceNumber,
        sessionSequenceNumber: data.sessionSequenceNumber
    };
}

function extractPlayerInteractions(events) {
    return events.map(event => {
        if (event.type === 'player-damaged-player') {
            return {
                eventId: event.id,
                actor: event.actor,
                action: event.action,
                target: event.target,
                seriesStateDelta: event.seriesStateDelta,
                seriesState: event.seriesState
            };
        }
    }).filter(Boolean);  // Filters out any undefined or null values
}

function extractGameInsights(data) {
    const insights = {};

    const seriesState = data.seriesState;
    if (seriesState) {
        insights.gameMode = seriesState.gameMode || 'N/A';
        insights.matchState = seriesState.matchState || 'N/A';
        insights.timeLeft = seriesState.timeLeft || 'N/A';
        insights.round = seriesState.round || 'N/A';

        // Assuming there's information about teams and scores
        if (Array.isArray(seriesState.teams)) {
            insights.teams = seriesState.teams.map(team => ({
                id: team.id,
                score: team.score
            }));
        }
    }

    return insights;
}

module.exports = {
    processData
};
