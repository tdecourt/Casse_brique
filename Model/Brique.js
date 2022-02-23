const TypeBrique = {
    NORMAL: 10,
    VITESSE: 30
}

class Brique extends Objet{
    _type;

    constructor (
        jeu, 
        x = 0, 
        y = 0, 
        largeur = 70, 
        hauteur = 30,
        type = (Math.random() < 0.1)? TypeBrique.VITESSE : TypeBrique.NORMAL
    ) {
        super(jeu, new Coordonnee(x, y), largeur, hauteur);
        this._type = type;
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
        switch (this._type) {
            case TypeBrique.VITESSE:
                ctx.fillStyle = "#BFD6FF";
                break;
        
            default:
                ctx.fillStyle = "#f8f9fa"
                break;
        }
        ctx.fill();
    }

    getType () {
        return this._type;
    }
}