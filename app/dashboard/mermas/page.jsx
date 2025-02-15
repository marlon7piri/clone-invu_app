import React from "react";
import TablaMermas from "./TablaMermas";
import FiltrosMermas from "./FiltrosMermas";
import { getMermas } from "@/app/libs/actions/mermas/get-mermas";
import { getServerSession } from "next-auth";
import { authoptions } from "@/app/api/auth/[...nextauth]/route";

const Mermas = async ({ searchParams }) => {
  const session = await getServerSession(authoptions)
  const fecha = searchParams.fecha || ''
  const mermas = await getMermas(session?.user?.restaurante_id,fecha);




  return (
    <div className="w-full h-screen ">
      <div className="w-full h-full flex flex-col gap-4 p-4">
        <h1 className="text-3xl font-bold text-center">Mermas</h1>
        <FiltrosMermas />
        <TablaMermas mermas={mermas} />
      </div>
    </div>
  );
};

export default Mermas;
