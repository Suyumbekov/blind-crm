import { useState } from "react";
import { supabase } from "../services/supabaseClient";

const useHandleData = (orders, initialWorkers, setOrders, setCounter) => {
  const [workers, setWorkers] = useState(initialWorkers || []);

  const updateOrders = async (data) => {
    try {
      const { error } = await supabase.from("orders").insert([data]);
      if (error) throw error;
      else {
        setCounter((prevCounter) => prevCounter + 1);
        setOrders((prevOrders) => [data, ...prevOrders]);
      }
    } catch (err) {
      console.error("Error adding order:", err);
    }
  };

  const statusChange = async (id, status, dateTime) => {
    try {
      const { error } = await supabase
        .from("orders")
        .update({ status, end_date: dateTime })
        .eq("id", id);
      if (error) throw error;

      const updatedOrders = orders.map((order) =>
        order.id === id ? { ...order, status: status } : order
      );

      if (dateTime) {
        updatedOrders.sort((a, b) => {
          if (a.endDate && b.endDate) {
            const dateA = new Date(a.endDate);
            const dateB = new Date(b.endDate);
            return dateB - dateA;
          } else {
            return a.status - b.status;
          }
        });
      }

      setOrders(updatedOrders);

      if (status === 3) {
        setCounter((prevCounter) => prevCounter - 1);
      }
    } catch (err) {
      console.error("Error updating order status:", err);
    }
  };

  const handleAddWorker = async (name) => {
    try {
      const { data, error } = await supabase
        .from("workers")
        .insert([{ name }])
        .select();
      if (error) throw error;

      setWorkers((prevWorkers) => [...prevWorkers, data[0]]);
    } catch (err) {
      console.error("Error adding worker:", err);
    }
  };

  const handleDeleteWorker = async (workerId) => {
    try {
      const { error } = await supabase
        .from("workers")
        .delete()
        .eq("id", workerId);
      if (error) throw error;

      setWorkers((prevWorkers) =>
        prevWorkers.filter((worker) => worker.id !== workerId)
      );
    } catch (err) {
      console.error("Error deleting worker:", err);
    }
  };

  return {
    workers,
    updateOrders,
    statusChange,
    handleAddWorker,
    handleDeleteWorker,
  };
};

export default useHandleData;
