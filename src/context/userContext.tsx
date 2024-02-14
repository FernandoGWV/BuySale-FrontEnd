"use client";
import Api from "@/services/Api";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface IAuthContext {
  isLoged: boolean;
  sessionCreate(email: string, password: string): void;
  dataUser: IUser | null;
  deslogar(): void;
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
    console.log(dataUser, "DADOS DE USUARIO");
  }, []);
  const sessionCreate = async (email: string, password: string) => {
    try {
      const result = await Api.post("account/session", {
        email: email,
        password: password,
      }).then((dados) => {
        localStorage.setItem("@token", dados.data.token);
        setDataUser(dados.data.user);
        setIsLoged(true);

        router.push("/");
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deslogar = () => {};

  return (
    <UserAuthProvider.Provider
      value={{ isLoged, sessionCreate, dataUser, deslogar }}
    >
      {children}
    </UserAuthProvider.Provider>
  );
};

export const UserContextAuth = () => {
  return useContext(UserAuthProvider);
};

export default UserAuthContext;
