class Objet {
    #largeur;
    #hauteur;
    #coordonnee;
    #jeu;

    /**
     * @param {Number} largeur 
     * @param {Number} hauteur 
     * @param {Coordonnee} coordonnee 
     * @param {Jeu} jeu
     */
    constructor (jeu, coordonnee = new Coordonnee(0, 0), largeur = 10, hauteur = 10) {
        if (this.constructor === Objet) throw new Error('Abstract class Objet cannot be instantiated directly');
        
        if (coordonnee instanceof Coordonnee) this.#coordonnee = coordonnee;
        else throw new Error(`arg coordonnee : ${coordonnee}, n'est pas de type Coodronnee`);

        if (jeu instanceof Jeu) this.#jeu = jeu;
        else throw new Error(`arg jeu : ${jeu}, n'est pas de type Jeu`);

        this.#largeur = largeur;
        this.#hauteur = hauteur;
    }

    /**
     * Dessine la forme
     */
    dessiner() {
        throw new Error('You must implement this function');
    }

    /**
     * @returns {Jeu} jeu
     */
    getJeu () {
        return this.#jeu;
    }
    
    /**
     * @returns {Number} largeur attribute
     */
    getLargeur () {
        return this.#largeur;
    }
    
    /**
     * @returns {Number} hauteur attribute
     */
    getHauteur () {
        return this.#hauteur;
    }

    /**
     * @returns {Coordonnee} coordonnee attribute
     */
    getCoordonnee () {
        return this.#coordonnee;
    }
    
    /**
     * @param {Number} largeur 
     */
    setLargeur (largeur) {
        this.#largeur = largeur;
    }
    
    /**
     * @param {Number} hauteur 
     */
    setHauteur (hauteur) {
        this.#hauteur = hauteur;
    }

    /**
     * @param {Number} x 
     * @param {Number} y 
     */
    setCoordonnee (x, y) {
        this.getCoordonnee().setX(x);
        this.getCoordonnee().setY(y);
    }
}