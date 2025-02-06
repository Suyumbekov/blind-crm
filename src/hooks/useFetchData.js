import { useState, useEffect } from "react";
import { supabase } from "../services/supabaseClient";

const useFetchData = (setOrders, setCounter) => {
  const [workers, setWorkers] = useState([]);
  const [fabrics, setFabrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { data: ordersData, error: ordersError } = await supabase
          .from("orders")
          .select("*");
        if (ordersError) throw ordersError;

        ordersData.sort((a, b) => {
          if (a.endDate && b.endDate) {
            const dateA = new Date(a.endDate);
            const dateB = new Date(b.endDate);
            return dateB - dateA;
          } else {
            return a.status - b.status;
          }
        });
        setOrders(ordersData);

        const { data: workersData, error: workersError } = await supabase
          .from("workers")
          .select("*");
        if (workersError) throw workersError;
        setWorkers(workersData);

        const { data: fabricsData, error: fabricsError } = await supabase
          .from("fabrics")
          .select("*");
        if (fabricsError) throw fabricsError;
        setFabrics(fabricsData);

        setCounter(ordersData.filter((order) => order.status !== 3).length);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setOrders, setCounter]);

  return { workers, fabrics, loading, error };
};

export default useFetchData;
