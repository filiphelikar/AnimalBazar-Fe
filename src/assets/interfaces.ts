export interface Inzerat {
  _id: string;
  nazev: string;
  prodejce: string;
  telefon: string;
  email: string;
  popis: string;
  cena: string | 'Za odvoz';
  druh: string;
  images: string[];
  lokalita: string;
  psc: string;
}

export interface Response {
  id: string;
  druh: string;
}
