"use client";

import { deleteOrdersAllBuy } from "@/lib/actions/appointment.actions";
import React from "react";

const DeAchat = () => {
  const handleDelete = async () => {
    alert("Delete");
    const response = await deleteOrdersAllBuy();
    alert(response?.successMessage);
  };
  return <button onClick={handleDelete}>delete many</button>;
};

export default DeAchat;
