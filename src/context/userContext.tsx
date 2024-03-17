"use client";
import Api from "@/services/Api";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

type IUpdate = {
  id: number;
  name?: string;
  email?: string;
  password?: string;
  file?: File;
  wallet?: number;
};

interface IAuthContext {
  isLoged: boolean;
  sessionCreate(email: string, password: string): void;
  dataUser: IUser | null;
  deslogar(): void;
  newUser(data: any, file: any): void;
  updateUser(data: {}, file: any): void;
  deleteUser(IdUser: number): void;
}

const UserAuthProvider = createContext({} as IAuthContext);

const UserAuthContext = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isLoged, setIsLoged] = useState(false);
  const [dataUser, setDataUser] = useState<IUser | null>(null);
  const [products, setProducts] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("@user") && localStorage.getItem("@token")) {
      setDataUser(JSON.parse(localStorage.getItem("@user") || "[]"));
      setIsLoged(true);
    }
  }, []);

  const getProfileUser = async (idUser: number) => {
    try {
      const response = await Api.get(`/account/get-profile/${idUser}`).then(
        (dados) => {
          localStorage.setItem("@user", JSON.stringify(dados.data.data));
          setDataUser(dados.data.data);
        }
      );
    } catch (error) {}
  };

  const sessionCreate = async (email: string, password: string) => {
    try {
      const result = await Api.post("account/session", {
        email: email,
        password: password,
      }).then((dados) => {
        localStorage.setItem("@token", dados.data.token);
        setIsLoged(true);
        getProfileUser(dados.data.id);
        router.push("/");
      });
    } catch (error) {
      console.log(error);
    }
  };

  const newUser = async (data: any, file: any) => {
    try {
      const result = await Api.post(
        "/account/createAccount",
        {
          ...data,
          iconUser: file,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      ).then((dados) => {
        localStorage.setItem("@token", dados.data.token);
        localStorage.setItem("@user", JSON.stringify(dados.data.user));
        setDataUser(dados.data.user);
        setIsLoged(true);
        router.push("/");
      });
    } catch (error) {
      console.log(error);
    }
  };
  const updateUser = async (data: IUpdate, file: any) => {
    console.log(file);
    try {
      const response = await Api.put(
        `/account/updateAccount/${dataUser?.id}`,
        {
          ...data,
          userIcon: file === null ? dataUser?.userIcon : file,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.status) {
        localStorage.removeItem("@user");
        getProfileUser(data?.id);
        router.push("/");
      }
    } catch (error) {}
  };

  const deslogar = () => {
    if (localStorage.getItem("@user") && localStorage.getItem("@token")) {
      localStorage.removeItem("@user");
      localStorage.removeItem("@token");
      setDataUser(null);
      setIsLoged(false);
    }
  };

  const deleteUser = async (IdUser: number) => {
    try {
      const response = await Api.delete(`/account/${IdUser}`).then((dados) => {
        if (dados.data.status) {
          router.push("/");
          deslogar();
        }
      });
    } catch (error) {}
  };
  return (
    <UserAuthProvider.Provider
      value={{
        isLoged,
        sessionCreate,
        dataUser,
        deslogar,
        newUser,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </UserAuthProvider.Provider>
  );
};

export const UserContextAuth = () => {
  return useContext(UserAuthProvider);
};

export default UserAuthContext;
