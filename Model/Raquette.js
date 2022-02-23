class Raquette extends Objet{

    constructor (jeu, x = 0, y = 0, largeur = 150, hauteur = 15) {
        super(jeu, new Coordonnee(x, y), largeur, hauteur);
    }

    /**
     * 
     */
    dessiner () {
        let ctx = this.getJeu().getCtx();
		ctx.beginPath(); 
		ctx.rect(
            this.getCoordonnee().getX(), 
            this.getCoordonnee().getY(), 
            this.getLargeur(), 
            this.getHauteur()
        );
		ctx.closePath();
        ctx.fillStyle = '#f8f9fa';
        ctx.fill();
    }

    /**
     * @param {Number} x 
     */
    bouger (x) {
        this.getCoordonnee().setX(x);
    }
}