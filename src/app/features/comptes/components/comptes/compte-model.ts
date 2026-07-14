export interface Compte
 {
   id: string;
   iban:string;
   type: 'courant' | 'epargne';  // union de littéraux
   solde:number;
   statut: 'actif' | 'suspendu' | 'cloture';  
   clientId: string;             // relation entre entités
   dateOuverture: string;
}