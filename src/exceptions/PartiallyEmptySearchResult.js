export class PartitallyEmptySearchResult extends Error {
    constructor(message) {
        super();
        this.name = "PartiallyEmptySearchResult"
        this.message = message
    }
}