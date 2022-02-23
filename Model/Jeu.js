const Difficulte = {
    SIMPLE: 0,
    NORMAL: 1,
    DIFFICILE: 2
}

class Jeu {
    _score;
    _ctx;
    _balle;
    _raquette;
    _briques = [];
    _niveau;
    _difficulte;
    _joueur;
    _animation;
    _vies;

    /**
     * @param {String} pseudo 
     * @param {Number} niveau 
     * @param {*} canvas 
     */
    constructor (pseudo, difficulte = Difficulte.NORMAL, canvas = $('#drawArea')) {
        this._joueur = new Joueur(pseudo);
        this._ctx = canvas[0].getContext('2d');
        this._score = 0;
        this._raquette = new Raquette(this, canvas[0].width/2-70, canvas[0].height-50);
        this._difficulte = difficulte;
        this._niveau = 0;
        this.nouveauMur();
        this._vies = 3;

        this.debutManche(canvas);
    }

    start (canvas = $('#drawArea')) {
        clearInterval(this._animation);
        this._animation = setInterval((jeu) => {
            this._balle.bouger(this);
            this.dessiner();
        }, 10, this);

        canvas.off('mousemove');
        canvas.on('mousemove', (evt) => {
            let rect = evt.target.getBoundingClientRect();
            this._raquette.bouger(evt.clientX - rect.left - this._raquette.getLargeur()/2);
        });

        this._balle.lancer();
    }

    debutManche (canvas = $('#drawArea')) {
        clearInterval(this._animation);

        this._balle = new Balle(this, canvas[0].width/2, canvas[0].height-65);

        canvas.on('click', canvas, (evt) => {
            this.start(canvas);
            evt.data.off('click');
        });

        canvas.on('mousemove', (evt) => {
            let rect = evt.target.getBoundingClientRect();
            this._raquette.bouger(evt.clientX - rect.left - this._raquette.getLargeur()/2);
            this._balle.setCoordonnee(
                evt.clientX - rect.left, 
                this._raquette.getCoordonnee().getY() - this._balle.getLargeur()
            );
        });
        
        this._animation = setInterval((jeu) => {
            this.dessiner();
        }, 10, this);
    }

    /**
     * @param {Number} pts 
     */
    addscore (pts) {
        this._score += pts;
        $('#score')[0].innerText = 'Score : ' + this._score;
    }

    perdu () {
        $('#vie'+this._vies).hide();
        if (this._vies-- == 0)
            return this.stop();
        this.debutManche();
    }

    stop() {

    }

    dessiner () {
        this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
        this._balle.dessiner();
        this._raquette.dessiner();
        this._briques.forEach((brique) => {
            brique.dessiner();
        })
    }

    /**
     * @param {Number} marge 
     * @param {Number} largeur 
     * @param {Number} hauteur 
     */
    nouveauMur (marge = 10, largeur = 70, hauteur = 30) {
        for (let i = 0; i < this._niveau+3; i++) {
            let decalage = (i%2 != 0)? (largeur + marge)/2 : 0;
            for (let j = 0; (largeur + marge) * j + decalage + largeur < this._ctx.canvas.width; j++) {
                this._briques.push(
                    new Brique(
                        this, 
                        (largeur + marge) * j + decalage + marge,
                        (hauteur + marge) * i + marge,
                        largeur,
                        hauteur
                    )
                );
            }
        }
        if (this._niveau < 4) this._niveau++;
    }

    /**
     * @returns {CanvasRenderingContext2D} context
     */
    getCtx () {
        return this._ctx;
    }

    /**
     * @returns {Balle} balle
     */
    getBalle () {
        return this._balle;
    }

    /**
     * @returns {Brique[]} briques
     */
    getBriques () {
        return this._briques;
    }

    /**
     * @returns {Raquette} raquette
     */
    getRaquette () {
        return this._raquette;
    }

    /**
     * 
     * @returns {}
     */
    getDifficulte () {
        return this._difficulte;
    }
}