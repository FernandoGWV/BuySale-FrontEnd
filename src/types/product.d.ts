type IMessages = {
  id: number;
  message: string;
  name: string;
  user_icon: string;
  user_id: number;
  product_id: number;
};

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
  messages?: [IMessages];
}
