export interface Event {
  id: number;
  titre: string;
  description: string;
  date_deb: Date;
  date_fin: Date;
  location: string;
  categorie: string;
  statut: string;
  transparence: string;
  nbMaj: number;
  color: string;
}
