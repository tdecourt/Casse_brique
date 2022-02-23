class Coordonnee {
    _x;
    _y;

    /**
     * @param {Number} x  
     * @param {Number} y  
     */
    constructor (x = 0, y = 0) {
        this._x = x;
        this._y = y;
    }

    /**
     * @param {Number} dx 
     * @param {Number} dy 
     */
    deplacer(dx, dy) {
        this._x += dx;
        this._y += dy;
    }

    /**
     * @returns {Number} x attribute
     */
    getX () {
        return this._x;
    }

    /**
     * @returns {Number} y attribute
     */
    getY () {
        return this._y;
    }

    /**
     * @param {Number} x 
     */
    setX (x) {
        this._x = x;
    }

    /**
     * @param {Number} y 
     */
    setY (y) {
        this._y = y;
    }
}