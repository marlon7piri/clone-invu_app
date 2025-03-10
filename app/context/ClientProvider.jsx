"use client";

import { UrlWeb } from "@/app/libs/UrlWeb";
import { useParams, useRouter } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import toast from "react-hot-toast";
import { getAllProductos } from "../libs/actions/productos/get-productos";
const { createContext, useContext, useState, useEffect, useRef } = require("react");

const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  const [pedidos, setPedidos] = useState([]);
  const [totalProductos, setTotalProductos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [orden, setOrden] = useState([]);

  const [mermas, setMermas] = useState([]);
  const [tablademermas, setTablademermas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tablaProductos, setTablaProductos] = useState([]);
  const [dinerototal, setDinerototal] = useState(0);
  const [avisodecorreo, setAvisodecorreo] = useState(false);
  const [session, setSession] = useState({})
  const router = useRouter();
  const params = useParams();
  const reNavDashboard = useRef(true)
  const [isVisibleMenu, setIsVisibleMenu] = useState(true)


  const getProductoPorCategoria = async (categoria) => {
    const res = await fetch(
      `${UrlWeb}/categoriaProducto`,

      {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: JSON.stringify({ categoria })
      }
    );
    const data = await res.json();

    return data;
  };

  useEffect(() => {
    const obtenerTodosLosProductos = async () => {
      const res = await fetch(`${UrlWeb}/productos`);
      const data = await res.json();
      setTotalProductos(data);
      conteoDineroTotal(data);
    };
    obtenerTodosLosProductos();
  }, []);

  const ordenarPorNombre = () => {
    let res = tablaProductos.sort((a, b) =>
      a.nombre.localeCompare(b.nombre, undefined, { sensitivity: "base" })
    );

    setProductos(res);
    router.refresh();
  };


  

  const changeWidth = () => {
    setIsVisibleMenu(!isVisibleMenu)

  }

  const conteoDineroTotal = (array) => {
    const valor = array?.reduce((acc, current) => {
      return (acc += current.precio_por_unidad * current.stock);
    }, 0);

    setDinerototal(valor);
  };

  const deleteOrdenProduct = (id) => {
    setOrden((prevSTate) => prevSTate.filter(y => y.id !== id))
  }

  const deleteInventario = async (id) => {

    const accion = confirm(`Seguro desea eliminar el inventario?`)

    if (accion) {
      try {
        const res = await fetch(`${UrlWeb}/inventario/${id}`, {
          method: "DELETE",
        })


        if (res.ok) {
          toast.success('Inventario eliminado')
          router.refresh()
        }
      } catch (error) {
        throw new Error(error)
      }
    }

  }




  return (
    <SessionProvider>
      <ClientContext.Provider
        value={{
          pedidos,
          setPedidos,
          ordenarPorNombre,
          setProductos,
          setTablaProductos,
          productos,
          loading,
          setLoading,
          setTotalProductos,
          totalProductos,
          tablaProductos,
          getProductoPorCategoria,
          mermas,
          setMermas,
          setTablademermas,
          tablademermas,
          dinerototal,
          avisodecorreo,
          setAvisodecorreo,
          orden,
          deleteOrdenProduct,
          setOrden, session, setSession, deleteInventario, changeWidth, isVisibleMenu
        }}
      >
        {children}
      </ClientContext.Provider>
    </SessionProvider>
  );
};

export const useClientContext = () => {
  return useContext(ClientContext);
};
