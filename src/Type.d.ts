export type Country = {
  name: { common: string };
  capital?: string[];
  population: number;
  region: string;
  borders?: string[];
  cca3: string;
  flags: { png: string };
};