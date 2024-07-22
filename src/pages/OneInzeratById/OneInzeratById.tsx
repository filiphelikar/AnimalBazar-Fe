import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../utils/useFetch";
import { Inzerat } from "../../assets/interfaces";
import OneInzerat from "../../components/OneInzeratById/OneInzerat";

const OneInzeratById = () => {
  const { id } = useParams();

  const { data, status } = useFetch<Inzerat>(
    `http://localhost:3000/api/inzerat/${id}`
  );

  return (
    <>
      {data && status === "success" ? (
        <OneInzerat {...data} />
      ) : (
        <div>error {/*TODO error component*/}</div>
      )}
    </>
  );
};

export default OneInzeratById;
