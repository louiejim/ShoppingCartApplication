export interface products {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity_available: number;
  sold?: number;
  editMode?:boolean;
  img:string;
}
