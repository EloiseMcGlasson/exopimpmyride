let tripToParse = "Perdita 8 10 8"

//merge the parsetrip with a key list
function parseTrip(trip) {
    let list=['client', 'depart', 'tempstrajet', 'prix']
	let list1 = trip.split(" ")
    let objt={}
    for (i=0; i< list.length; i++){
        objt[list[i]]= list1[i]
    }
    return objt
}

let tripsToParse = [
	"Roger 0 5 10",
	"Pongo 3 7 14",
	"Perdita 8 10 8",
	"Anita 16 3 7"
]
//use parseTrip for list of trips string
function parseTrips(trips) {
    let listeObjt=[]
    for (var v of trips){
       listeObjt.push(parseTrip(v))
    }
    //console.log(listeObjt)
    //ça marche mais c'est plus long et compliqué
	/*  trips.forEach((element)=>
        listeObjt.push(parseTrip(element)),
    
        //console.log(parseTrip(element))
        //console.log(listeObjt)
    ) 
    //listeObjt=Array.of(list)*/
    //console.log(listeObjt) 
    return listeObjt
}
// take listtrips and sum cost travel
function getTripsPrice(voyages){
    total=0
    voyages.forEach(element => {
        if(parseInt(element.prix)!=null){
            total+=parseInt(element.prix)
        }
    });
    //console.log(total)
    return total
}


let tripA={client: 'Roger', depart: '0', tempstrajet: '5', prix: '10'}
let tripB={client: 'Pongo', depart: '3', tempstrajet: '7', prix: '14'}
let tripC={client: 'Perdita', depart: '8', tempstrajet: '10', prix: '8'}
let tripD={client: 'Anita', depart: '16', tempstrajet: '3', prix: '7'}




function checkCompatibility(tripA, tripB){
    let bool=true
    //each trip is compatible with itself so not tested
    if (tripA!==tripB){
        if(parseInt(tripA.tempstrajet) + parseInt(tripA.depart)> parseInt(tripB.depart)){
            bool=false
        }
    }
    //console.log(parseInt(tripA.tempstrajet))
    //console.log(bool)
    return bool
}
// Compare listTrips with itself using checkCompatibility
function findCompatibilities(trips){
    let tab=[]
    let tab1=[]
    compatible = []
    let voyages = parseTrips(trips)
    voyages.forEach(element => {
        for(let v of voyages){
            //each trip is compatible with itself so not tested here
            if (v!== element){
                if (checkCompatibility(element, v)){ 
                    tab=[v, element]
                    /* console.log(v,element)
                    console.log(tab) */
                    tab1.push(tab)
                    //console.log(tab1)
                }else{
                    continue
                }
            }else{
                // add individual trip because each trip is compatible with itself
                tab=[v]
                tab1.push(tab)
            }
        }
    });
    compatible.push(tab1)
    //console.log(compatible)
    return compatible 
}

// check each list of compatible trip and sum cost trip, return the most valuable trip
function findBestPrice(trips){
    let prix
    let result=0
    let resultat=[]
    voyagesCompatibles = findCompatibilities(trips)
    //console.log(voyagesCompatibles)
    for ( compatibles of voyagesCompatibles[0]){
        
        //console.log(compatibles)
        prix = getTripsPrice(compatibles)
        //console.log(prix)
        if ( prix > result){
            result=prix
            //console.log(result)
        //console.log(compatibles, result)
        resultat = [compatibles, result]
        }
        
    }

    //console.log(resultat[0][0])
    return console.log("La meilleure combinaison est " + afficherObjet(resultat[0][0]) + " et " + afficherObjet(resultat[0][1]) + " pour un prix total de " + result + " euros.")
    
}

function afficherObjet(obj){
    return `${obj.client}, départ à ${obj.depart} heure(s) avec un temps de trajet de ${obj.tempstrajet} heures pour un prix de ${obj.prix} euros`;

}