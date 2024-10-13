export type InstitutionsResponse = {
  id: string;
  name: string;
}[];

export type FacultiesAndDepartmentsResponse = {
  Faculties: {
    'Arts and Humanities': string[];
    'Social Sciences': string[];
    'Natural Sciences': string[];
    'Engineering and Technology': string[];
    'Medical and Health Sciences': string[];
    'Business and Economics': string[];
    'Law and Legal Studies': string[];
    Education: string[];
    'Architecture and Design': string[];
    'Agriculture and Environmental Sciences': string[];
    'Computer Science and IT': string[];
    'Fine Arts': string[];
    'Environmental and Earth Sciences': string[];
  };
};

export type InterestsResponse = {
  description: string;
  id: number;
  name: string;
}[];
