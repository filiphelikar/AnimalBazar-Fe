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
  _id: string;
  druh: string;
}

export type FormValues = {
  nazev: string;
  popis: string;
  cenaSelect: 'Za odvoz' | 'Vyberte' | 'Číslo v Kč';
  cenaNum: number;
  prodejce: string;
  telefon: string;
  lokalita: string;
  psc: string;
  email: string;
  heslo: string;
  images: FileList;
};

export interface NewDataFormat {
  nazev: string;
  popis: string;
  cena: string | 'Za odvoz';
  prodejce: string;
  telefon: string;
  lokalita: string;
  psc: string;
  email: string;
  heslo: string;
  druh: string | undefined;
}
