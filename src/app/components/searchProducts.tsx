"use client";
import { UserContextAuth } from "@/context/userContext";
import Api from "@/services/Api";
import styles from "../../stylesAnimation/styles.module.css";
import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";

const SearchProducts = (props: any) => {
  const { dataUser, deslogar, isLoged } = UserContextAuth();
  const [allProducts, setAllProducts] = useState<[]>();
  const [textValue, setTextValue] = useState("");

  const getProduct: any = async (value: string) => {
    try {
      const resultAll = await Api.get("/products").then((dados) => {
        if (dados.data.data) {
          const productsData = dados.data.data;
          const filteredProducts = productsData.filter((item: IProduct) =>
            item.title.toLocaleLowerCase().includes(value)
          );
          console.log(dados.data.data);
          setAllProducts(filteredProducts);
        }
      });
    } catch (error) {}
  };

  let timer: any;
  const handleKeyUp = (event: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const searchText = event.target.value;
      // Realize a busca aqui com o termo searchText
      console.log("Realizar busca com:", searchText);
      setTextValue(searchText);
      if (searchText) {
        getProduct(searchText);
      }
    }, 500);
  };

  return (
    <>
      <input
        type="text"
        className="mx-auto outline-0 shadow-md z-50  w-6/12 h-14 text-myColor pl-2 rounded-3xl"
        onKeyUp={handleKeyUp}
      />

      {textValue.length ? (
        <div
          className={`${styles.animationModal} flex flex-col justify-start  w-6/12 max-h-80 min-h-80 absolute top-16 z-40 bg-white shadow-sm rounded-md overflow-auto gap-5`}
        >
          {allProducts?.map((item: IProduct) => {
            return (
              <>
                <div className="flex  shadow-md bg-stone-50 cursor-pointer items-center justify-between">
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
      ) : null}
    </>
  );
};

export default SearchProducts;
