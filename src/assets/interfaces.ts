export interface Inzerat {
  _id: number;
  nazev: string;
  prodejce: string;
  telefon: string;
  email: string;
  popis: string;
  cena: number | 'Za odvoz';
  druh: 'Kočka' | 'Pes';
  images: string[];
  lokalita: string;
  psc: number;
}

export interface Response {
  id: string;
  druh: string;
}
