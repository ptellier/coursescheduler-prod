export class EmptySearchResult extends Error {
    constructor(message) {
        super(message);
        this.name = "EmptySearchResult"
    }

}