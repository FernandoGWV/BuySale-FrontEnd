"use client";
import { UserContextAuth } from "@/context/userContext";
import Api from "@/services/Api";
import { useEffect, useState } from "react";

const SearchProducts = (props: any) => {
  const { dataUser, deslogar, isLoged } = UserContextAuth();
  const [allProducts, setAllProducts] = useState<[]>();
  const getProduct = async (value: string) => {
    try {
      const resultAll = await Api.get("/products").then((dados) => {
        if (dados.data.data) {
          const productsData = dados.data.data;
          const filteredProducts = productsData.filter((item: IProduct) =>
            item.title.toLocaleLowerCase().includes(value.toLocaleLowerCase())
          );

          setAllProducts(filteredProducts);
        }
      });
    } catch (error) {}
  };

  return (
    <>
      <input
        type="text"
        className="mx-auto outline-0 shadow-md z-50  w-6/12 h-14 text-myColor pl-2 rounded-3xl"
        onChange={({ target }: any) =>
          setTimeout(() => {
            getProduct(target.value);
          }, 700)
        }
      />
      <div className="flex flex-col justify-start  w-6/12 max-h-80 min-h-80 absolute top-14 z-40 bg-white shadow-sm rounded-md overflow-auto gap-5">
        {allProducts?.map((item: IProduct) => {
          return (
            <>
              <div className="flex shadow-md bg-stone-50 cursor-pointer items-center justify-between">
                <div className="flex items-center ml-2">
                  <img
                    src={`${process.env.NEXT_PUBLIC_URL}/${item?.images[0].path_image}`}
                    alt="imageProduct"
                    className="rounded-sm mr-2 w-24 h-24"
                  />
                  <h1>{item.title}</h1>
                </div>
                <h4>@masaky</h4>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default SearchProducts;
