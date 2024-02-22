interface IProduct {
  title: string;
  descripte: string;
  id?: number;
  id_user: number;
  images: [
    {
      id?: number;
      product_id?: number;
      path_image: string;
    }
  ];
  its_buy?: number;
  like?: number;
  price: number;
}
