export interface Inzerat {
  id: number;
  nazev: string;
  prodejce: string;
  telefon: string;
  email: string;
  popis: string;
  cena: number | "Za odvoz";
  druh: "Kočka" | "Pes";
  images: string[];
}
