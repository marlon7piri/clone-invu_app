"use client";

import { useRouter } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Botones from "./Botones";
import { convertidordefecha } from "@/app/libs/convertidordefecha";
import ShowEmptyComponent from "@/app/components/ShowEmptyComponent";

const ListaDeProductos = ({ productos }) => {
  return (
    <table className="w-full   relative text-sm text-left text-gray-500 dark:text-gray-400 mt-8 shadow-2xl">
      <thead className="text-xs text-slate-900 uppercase bg-sky-500 dark:bg-gray-900 dark:text-gray-400   ">
        <tr>
          <th scope="col" className="px-6 py-3 cursor-pointer">
            Producto
          </th>
          <th scope="col" className="px-6 py-3">
            Precio Por Unidad
          </th>

          <th scope="col" className="px-6 py-3">
            Presentacion Por Unidad
          </th>

          <th scope="col" className="px-6 py-3">
            Costo
          </th>
          <th scope="col" className="px-6 py-3">
            Stock
          </th>

          <th scope="col" className="px-6 py-3">
            Proveedor
          </th>
          <th scope="col" className="px-6 py-3">
            Mas Vendido
          </th>
          <th scope="col" className="px-6 py-3">
            ITBMS
          </th>
          <th scope="col" className="px-6 py-3">
            Area
          </th>
          <th scope="col" className="px-6 py-3">
            Fecha de Creacion
          </th>

          <th scope="col" className="px-6 py-3">
            Accion
          </th>
        </tr>
      </thead>
      <tbody className="w-full ">
        {productos?.map((product) => {
          return (
            <tr
              className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              key={product._id}
            >
              <td className="px-6 py-4 ">{product.nombre}</td>
              <td className="px-6 py-4">${product.precio_por_unidad}</td>

              <td className="px-6 py-4">
                {product.presentacion_por_unidad}/{product.unidad}
              </td>

              <td className="px-6 py-4">${product.costo}</td>
              <td className="px-6 py-4">{product.stock}</td>
              <td className="px-6 py-4">{product.proveedor}</td>
              <td
                className={
                  product.mas_vendido
                    ? "px-6 py-4 text-green-700 font-bold"
                    : "px-6 py-4 text-red-700 font-bold"
                }
              >
                {product.mas_vendido ? "Si" : "No"}
              </td>
              <td className="px-6 py-4">{product.itbms}%</td>

              <td className="px-6 py-4">{product?.area?.nombre}</td>
              <td className="px-6 py-4">
                {convertidordefecha(product.createdAt)}
              </td>

              <td className="w-max h-full px-6 py-4  flex gap-1 justify-center items-center ">
                <Botones allproducto={product._id} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ListaDeProductos;
