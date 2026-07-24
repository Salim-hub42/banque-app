export interface Transaction
 {
  id: string;
  compteId: string;
  type: 'depot' | 'virement' | 'retrait';
  montant: number;
  description: string;
  date: string;
}