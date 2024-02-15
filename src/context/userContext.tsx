"use client";
import Api from "@/services/Api";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface IAuthContext {
  isLoged: boolean;
  sessionCreate(email: string, password: string): void;
  dataUser: IUser | null;
  deslogar(): void;
  newUser(data: any, file: any): void;
}

const UserAuthProvider = createContext({} as IAuthContext);

const UserAuthContext = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isLoged, setIsLoged] = useState(false);
  const [dataUser, setDataUser] = useState<IUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("@user") && localStorage.getItem("@token")) {
      setDataUser(JSON.parse(localStorage.getItem("@user") || "[]"));
      setIsLoged(true);
    }
  }, []);
  const sessionCreate = async (email: string, password: string) => {
    try {
      const result = await Api.post("account/session", {
        email: email,
        password: password,
      }).then((dados) => {
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

  const deslogar = () => {
    if (localStorage.getItem("@user") && localStorage.getItem("@token")) {
      localStorage.removeItem("@user");
      localStorage.removeItem("@token");
      setDataUser(null);
      setIsLoged(false);
    }
  };

  return (
    <UserAuthProvider.Provider
      value={{ isLoged, sessionCreate, dataUser, deslogar, newUser }}
    >
      {children}
    </UserAuthProvider.Provider>
  );
};

export const UserContextAuth = () => {
  return useContext(UserAuthProvider);
};

export default UserAuthContext;
