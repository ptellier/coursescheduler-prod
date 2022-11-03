export class IncompleteSchedule extends Error {
    constructor(message) {
        super(message);
        this.name = "IncompleteSchedule"
    }

}