class Joueur {
    _pseudo;

    /**
     * @param {string} pseudo
     */
    constructor (pseudo) {
        this._pseudo = pseudo;
    }

    /**
     * @returns pseudo
     */
    getPseudo () {
        return this._pseudo;
    }
}