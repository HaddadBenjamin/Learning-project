import _ from 'lodash'
// Je me suis arrêté à la méthode without
// U : ne mute pas le tableau et renvoit un nouveau tableau, M : mute le tableau

var array = [2, 1, 2]
// CRUD :
// Lecture
_.head([1, 2, 3]) // 1, récupère le premier élément (first)
_.last([1, 2, 3]) // 3, récupère le dernier élément
_.take([1, 2, 3], 2) // U [1, 2] récupère n éléments
_.takeRight([1, 2, 3], 2) // U [2, 3]  récupère n éléments en partant de l'index n et en s'arrêtant sur le dernier élément    
                          // U takeWhile | takeRightWhile
_.findIndex(users, (o) => o.user == 'barney') // 0 renvoit l'index d'un élément à partir d'une condition
_.findIndex(users, { 'user': 'fred', 'active': false }) // 1
_.findIndex(users, ['active', false]) // 0
                                      // findLastIndex / lastIndexOf
_.indexOf([1, 2, 1, 2], 2) // 1 renvoit l'index d'un élément à partir de sa valeur
// Ajout
_.concat([1], 2, [3], [[4]]) // U [1, 2, 3, [4]] fusionne plusieurs tableaux & valeurs au sein d'un même tableau
// Suppression
_.compact([0, 1, false, 2, '', 3]) // U [1, 2, 3] nettoie un tableaux des valeurs 0, false, '', null, undefined
_.uniq([2, 1, 2]) // U [2, 1] supprime les doublons (voir aussi uniqBy & uniqWith)
_.initial([1, 2, 3]) // U [1, 2] supprime le dernier élément d'un tableau
_.drop([1, 2, 3]) // [2, 3] U retire 1 à n éléments à partir du début
_.drop([1, 2, 3], 2) // U [3]
_.dropRight([1, 2, 3]) // U [1, 2] retire 0 à n éléments à partir de la fin
                       // U dropWhile / dropRightWhile
_.tail([1, 2, 3]) // U [2, 3] supprime le premier
_.remove([1, 2, 3, 4], (n) => n % 2 == 0) // M array: [1, 3], return value : [2, 4] supprime tous les éléments matchant à une condition
_.pull(['a', 'b', 'c', 'a', 'b', 'c'], 'a', 'c') // M  ['b', 'b'] supprime tous éléments d'un tableau ayant la/les valeur/s définit/s
_.pullAllBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 3 }, { 'x': 1 }], [{ 'x': 1 }, { 'x': 3 }], 'x') // M [{ 'x': 2 }]
_.pullAt(['a', 'b', 'c', 'd'], [1, 3]) // M array : [1, 3], return value  : ['b', 'd']

// Calcul d'un entier :
var users = [
    { 'user': 'barney',  'active': false },
    { 'user': 'fred',    'active': false },
    { 'user': 'pebbles', 'active': true }
]


// Calcul d'une string :
_.join(['a', 'b', 'c'], '~') // 'a~b~c' converti un tableau de chaînes en une chaîne

// Calcul d'un tableau :
_.union([2], [1, 2]) // U [2, 1] combine plusieurs tableaux en supprimant les doublons
_.fill([1, 2, 3], 'a') // M [a, a, a] remplace tous les éléments d'un tableau par une valeur
_.fill(Array(3), 2) // M [2, 2, 2]
_.difference([2, 1], [2, 3]) // U [1] renvoit les éléments du tableau a non présents dans le tableau b
_.differenceBy([{ 'x': 2 }, { 'x': 1 }], 'x')
_.intersection([2, 1], [2, 3]) // U [2] renvoit les éléments du tableau présents dans le tableau b
                               // intersectionBy
_.flatten([1, [2, [3, [4]], 5]]) // U [1, 2, [3, [4]], 5], met à plat un tableau
_.flattenDeep([1, [2, [3, [4]], 5]]) // U [1, 2, 3, 4, 5], met à plat un tableau de façon profonde
                                     // flattenDepth
_.reverse([1, 2, 3]) // M [3, 2, 1]
// _.slice(array, [start=0], [end=array.length]) : U découpe un tableau

// Calcul d'un tableaux à double dimension :
_.chunk(['a', 'b', 'c', 'd'], 2) // U [['a', 'b'], ['c', 'd']] découpe un tableaux en plusieurs tableaux de la taille précisé


debugger
// Muté ou ne mute pas ?