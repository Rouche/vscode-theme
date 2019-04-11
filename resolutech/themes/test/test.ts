/// <reference path="../../angularjs/angular.d.ts" />
/**
 * Module utilitaire fournissant des méthodes sur des objects qui ne sont pas fournies par défaut
 * @module mpo-cadre/utils/mpoobjectutils
 * @author Hugo St-Pierre
 */

/**
 * Valeur textuelle de "undefined" en JavaScript.
 *
 * @member {string} module:mpo-cadre/utils/mpoobjectutils.MpoObjectUtils.NON_DEFINI
 * @private
 */
var NON_DEFINI: string = "undefined";

/**
 * Valeur permettant de déterminer si un objet est un tableau JavaScript
 *
 * @member {string} module:mpo-cadre/utils/mpoobjectutils.MpoObjectUtils.OBJET_TABLEAU
 * @private
 */
var OBJET_TABLEAU: string = "[object Array]";

/**
 * Defini un objet indexe par string.
 */
export interface IStringKeyMap<T> {
    [s: string]: T;
}

/**
 * Defini un objet indexe par number.
 */
export interface INumberKeyMap<T> {
    [s: number]: T;
}

/**
 * Détermine si un objet n'a pas encore été défini.
 *
 * @param {any} objet L'objet à vérifier
 * @returns {boolean} Vrai si l'objet est non défini, faux sinon
 * @method module:mpo-cadre/utils/mpoobjectutils.MpoObjectUtils.isNonDefini
 */
export function isNonDefini(objet: any): boolean {
    return (typeof objet == NON_DEFINI);
}

/**
 * Détermine si un objet n'a pas encore été défini ou a la valeur nulle.
 *
 * @param {any} objet L'objet à vérifier
 * @returns {boolean} Vrai si l'objet est non défini ou null, faux sinon
 * @method module:mpo-cadre/utils/mpoobjectutils.MpoObjectUtils.isNonDefiniOuNull
 */
export function isNonDefiniOuNull(objet: any): boolean {
    return isNonDefini(objet) || objet == null;
}

/**
 * Détermine si un objet a la valeur nulle.
 *
 * @param {any} objet L'objet à vérifier
 * @returns {boolean} Vrai si l'objet est null, faux sinon
 * @method module:mpo-cadre/utils/mpoobjectutils.MpoObjectUtils.isNull
 */
export function isNull(objet: any): boolean {
    return objet === null;
}

/**
 * Détermine si un objet a été défini (n'est pas à undefined ni à null).
 *
 * @param {any} objet L'objet à vérifier
 * @returns {boolean} Vrai si l'objet est défini, faux sinon
 * @method module:mpo-cadre/utils/mpoobjectutils.MpoObjectUtils.isDefini
 */
export function isDefini(objet: any): boolean {
    return !isNonDefiniOuNull(objet);
}

/**
 * Instantie une classe à partir du contexte fournit. Le contexte correspond au module ou l'élément qui contient
 * la définition de la classe. Si cette classe est déclarée globalement, le contexte serait "window". Si la classe possède
 * un constructeur, il est possible de fournir les arguments.
 *
 * @param {any} contexte Le contexte qui contient la définition de la classe
 * @param {string} nomClasse Le nom de la classe à créer
 * @param {any[]} argumentsConstructeur Les arguments à fournir au constructeur de la classe
 * @returns {any} L'instance de la classe créée ou null si la classe n'a pas pu être instantié
 * @method module:mpo-cadre/utils/mpoobjectutils.MpoObjectUtils.creerClasse
 */
export function creerClasse(definitionClasse: any, ...argumentsConstructeur: any[]): any {
    var classe: any = null;
    if (isDefini(definitionClasse)) {
        var objet = definitionClasse.bind.apply(definitionClasse, arguments);
        classe = new objet();
    }

    return classe;
}

/**
 * Détermine si l'objet fourni est un tableau
 *
 * @param {any} tableau L'objet à déterminer son type
 * @returns {boolean} Vrai si l'objet est un tableau, faux autrement
 * @method module:mpo-cadre/utils/mpoobjectutils.MpoObjectUtils.isTableau
 */
export function isTableau(tableau: any): boolean {
    return (Array.isArray ? Array.isArray(tableau) : Object.prototype.toString.call(tableau) === OBJET_TABLEAU);
}

/**
 * Retourne vrai si le tableau est 'undefined', 'null', ou ne contient pas d'éléments.
 */
export function isTableauVide(tableau: any[]): boolean {
    return isNonDefiniOuNull(tableau) || tableau.length <= 0;
}

/**
 * Détermine si le tableau contient un et un seul élément.
 *
 * @param {any} tableau Le tableau
 * @returns {boolean} Vrai si le tableau.length = 1
 * @method module:mpo-cadre/utils/mpoobjectutils.MpoObjectUtils.isTableauContientUnSeulElement
 */
export function isTableauContientUnSeulElement(tableau: any[]): boolean {
    return !isTableauVide(tableau) && tableau.length === 1;
}

/**
 * Détermine si le tableau contient plus d'un élément.
 *
 * @param {any} tableau Le tableau
 * @returns {boolean} Vrai si le tableau.length > 1
 * @method module:mpo-cadre/utils/mpoobjectutils.MpoObjectUtils.isTableauContientPlusieursElement
 */
export function isTableauContientPlusieursElement(tableau: any[]): boolean {
    return !isTableauVide(tableau) && tableau.length > 1;
}

/**
 * Détermine si le tableau contient des éléments
 *
 * @param {any} tableau Le tableau
 * @returns {boolean} Vrai si le tableau.length >= 1
 * @method module:mpo-cadre/utils/mpoobjectutils.MpoObjectUtils.isTableauContientDesElements
 */
export function isTableauContientDesElements(tableau: any[]): boolean {
    return !isTableauVide(tableau);
}


/**
 * Copie les propriétés d'un objet sur un autre objet et retourne le nouvel objet modifié
 *
 * @param {any} source L'objet qui doit être copié sur la destination
 * @param {any} destination L'objet qui recevra les nouvelles propriétés
 * @returns {any} L'objet destination avec les propriétés de la source
 * @method module:mpo-cadre/utils/mpoobjectutils.MpoObjectUtils.copierObjet
 */
export function copierObjet(source: any, destination?: any): any {
    return angular.copy(source, destination);
}

/**
 * Permet d'obtenir le nom d'une classe donnée
 *
 * @param {any} objet L'objet à déterminer la classe
 * @returns {string} Le nom de la classe de l'objet
 * @method module:mpo-cadre/utils/mpoobjectutils.MpoObjectUtils.obtenirNomClasse
 */
export function obtenirNomClasse(objet: any): string {
    if (isString(objet)) return objet;

    if (objet.constructor && objet.constructor.name != "Function") {
        return objet.constructor.name || (objet.toString().match(/function (.+?)\(/) || [, ''])[1];
    } else {
        return objet.name;
    }
}

/**
 * Permet de déterminer si un objet est de type string
 *
 * @param {any} objet L'objet à valider le type
 * @returns {boolean} Vrai si l'objet est une string, faux sinon
 * @method module:mpo-cadre/utils/mpoobjectutils.MpoObjectUtils.isString
 */
export function isString(objet: any): boolean {
    var isString: boolean = false;

    if (Object.prototype.toString.call(objet) == '[object String]') {
        isString = true;
    }

    return isString;
}

/**
 * Converti un objet de type map en tableau d'entry (key, value)
 * Ceci permet de passer les map dans un filtre angular pour trier sur la cle.
 *
 * @param {any} objet L'objet à convertir
 * @returns {array} le tableay
 * @method module:mpo-cadre/utils/mpoobjectutils.MpoObjectUtils.toKeyValueArray
 */
export function toKeyValueArray(objet: any): Array<any> {
    if (objet) {
        var converted: Array<any> = [];
        var keys = Object.keys(objet);
        keys.forEach((key): void => {
            converted.push({ key: key, value: objet[key] });
        });

        return converted;
    }

    return undefined;
}

/**
 * execute une fonction sur un this si elle existe.
 *
 * @param {myThis} objet L'objet pour etre le this de l'appel
 * @param {fonction} La fonction a appeller
 * @param {args} Parametres pour la fonction
 * @returns {any} le resultat
 */
export function tryApply(myThis: any, fonction: Function, args?: Array<any>): any {
    if (typeof fonction === 'function') {
        return fonction.apply(myThis, args);
    }
    return undefined;
}

/**
 * from https://gist.github.com/amatiasq/2e4344792f28611fa499
 * @param {Function} fn Function to curry.
 * @param {Number} lenght The arguments required to invoke the function. Optional. By default is fn.length
 * @returns {Function} The currified function.
 */
export function curry(fn: Function, length?: number) {
    length = length || fn.length;
    return function currified() {
        var args = [].slice.call(arguments);

        if (args.length === 0)
            return currified;

        if (args.length >= length)
            return fn.apply(this, args);

        var child = fn.bind.apply(fn, [this].concat(args));
        return curry(child, length - args.length);
    };
}

/**
 * Chaine les appels aux methodes en les appliquant a original pour y retourner la valeur.
 * @param {...Function} fns Les fonctiones a chainer
 */
export function pipe(...fns) {
    return (original: any) => fns.reduce( (v: any, f: Function) => f(v), original);
}

/**
 * Version curryed de forEach
 * @param {Function} fn La fonction a passer au forEach
 */
export const forEachCurry: any = curry((fn: (val: any) => void, array: Array<any>) => array.forEach(fn));

