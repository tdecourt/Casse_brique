class Balle extends Objet {
    _angle;
    _vitesse;
    _jeu;

    /**
     * @param {Number} x x
     * @param {Number} y y
     * @param {Number} r rayon
     * @param {Number} angle angle
     * @param {Number} vitesse vitesse
     * @param {Jeu} jeu jeu
     */
    constructor (jeu, x = 0, y = 0, r = 5, angle = 0, vitesse = 0) {
        super(jeu, new Coordonnee(x+r, y+r), 2*r, 2*r);
        this._angle = angle;
        this._vitesse = vitesse;
    }

    /**
     * 
     */
    lancer () {
        this._angle = (Math.random() < 0.5)? 3*Math.PI/4 : 5*Math.PI/4;
        this._vitesse = 1;
    }

    /**
     * 
     */
    accelerer () {
        if (this._vitesse <= 5) this._vitesse += 1;
        console.log(this._vitesse);
    }

    /**
     * 
     */
    dessiner () {
        let ctx = this.getJeu().getCtx();
        ctx.beginPath();
		ctx.arc(
            this.getCoordonnee().getX(), 
            this.getCoordonnee().getY(), 
            this.getLargeur(), 
            0, 
            Math.PI * 2, 
            true
        );
		ctx.closePath();
		ctx.fillStyle = '#f8f9fa';
		ctx.fill();
    }

    /**
     * @param {Jeu} jeu 
     */
    bouger (jeu) {
        let r = this.getRayon();
        let x = this.getCoordonnee().getX();
        let y = this.getCoordonnee().getY();
        let dx = Math.sin(this._angle) * this._vitesse;
        let dy = Math.cos(this._angle) * this._vitesse;
        let width = this.getJeu().getCtx().canvas.width;
        let height = this.getJeu().getCtx().canvas.height;
        // Rebonds bords
        if (x + dx - r < 0 || x + dx + r > width) 
            dx = -dx;
        if (y + dy - r < 0) 
            dy = -dy;
        if (y + dy - r > height) {
            jeu.perdu();
            return;
        }
        let raqY = jeu.getRaquette().getCoordonnee().getY();
        let raqX = jeu.getRaquette().getCoordonnee().getX();
        let raqW = jeu.getRaquette().getLargeur();
        let raqH = jeu.getRaquette().getHauteur();
        if (y + dy + r > raqY && y + dy + r < raqY + raqH && x + dx + r > raqX && x + dx - r < raqX + raqW) {
            dy = -Math.abs(dy);
            if (x + dx < raqX + raqW/5) dx -= 1;
            else if (x + dx < raqX + 2*raqW/5) dx -= 0.5;
            else if (x + dx > raqX + 4*raqW/5) dx += 1;
            else if (x + dx > raqX + 3*raqW/5) dx += 0.5;
        }

        for (let i = 0; i < jeu.getBriques().length; i++) {
            const brique = jeu.getBriques()[i];
            
            let brickX = brique.getCoordonnee().getX();
            let brickY = brique.getCoordonnee().getY();
            let brickW = brique.getLargeur();
            let brickH = brique.getHauteur();
            
            function casse(briques, i, balle) {
                balle.getJeu().addscore(briques[i].getType());
                if (briques[i].getType() == TypeBrique.VITESSE) balle.accelerer();
                briques.splice(i, 1);
                if (briques.length == 0) balle.getJeu().nouveauMur(); 
            }
            if (x + dx + r > brickX && x + dx - r < brickX + brickW 
                && y + dy + r > brickY && y + dy - r < brickY + brickH) {
                if (x + dx < brickX) {
                    // Zone 1
                    if (y + dy < brickY) { // Zone A
                        dx = -Math.abs(dx);
                        dy = -Math.abs(dy);
                        casse(jeu.getBriques(), i, this);
                    } else if (y + dy > brickY + brickH) { // Zone C
                        dx = -Math.abs(dx);
                        dy = Math.abs(dy);
                        casse(jeu.getBriques(), i, this);
                    } else { // Zone B
                        dx = -dx;
                        casse(jeu.getBriques(), i, this);
                    }
                } else if (x + dx > brickX + brickW) {
                    // Zone 3
                    if (y + dy < brickY) { // Zone A
                        dx = Math.abs(dx);
                        dy = -Math.abs(dy);
                        casse(jeu.getBriques(), i, this);
                    } else if (y + dy > brickY + brickH) { // Zone C
                        dx = Math.abs(dx);
                        dy = Math.abs(dy);
                        casse(jeu.getBriques(), i, this);
                    } else { // Zone B
                        dx = -dx;
                        casse(jeu.getBriques(), i, this);
                    }
                } else {
                    dy = -dy;
                    casse(jeu.getBriques(), i, this);
                }
			    // jeu.getBriques().splice(i, 1);
            }
        }

        this._angle = Math.atan2(dx, dy);
        this.getCoordonnee().deplacer(dx, dy);
    }

    /**
     * @returns {Number} rayon
     */
    getRayon () {
        return this.getLargeur();
    }
}