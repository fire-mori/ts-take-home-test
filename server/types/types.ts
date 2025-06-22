export type Row = {
  id: number;
  brandId: number;
  createdAt: Date;
  text: string;
};

export type Insert = {
  brandId: number;
  createdAt: Date;
  text: string;
};

export type Delete = {
  id: number;
};
