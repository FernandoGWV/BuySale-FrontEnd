"use client";
import { UserContextAuth } from "@/context/userContext";
import Api from "@/services/Api";
import React, { useEffect, useState } from "react";
const Product = ({ params }: { params: { id: any } }) => {
  const { dataUser } = UserContextAuth();
  const [productUnique, setProductUnique] = useState<IProduct>();
  const getProduct = async () => {
    try {
      const result = await Api.get("/products").then((dados) => {
        const filteredProducts = dados.data.data.filter(
          (item: any) => item.id === Number(params.id)
        );
        setProductUnique(filteredProducts[0]);
        console.log(filteredProducts, "DADOS PRODUSC");
      });
    } catch (error) {}
  };

  useEffect(() => {
    getProduct();
  }, []);

  return <div>ID:{productUnique?.title}</div>;
};

export default Product;
