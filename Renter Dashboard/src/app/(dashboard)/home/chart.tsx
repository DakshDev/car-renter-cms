"use client";

import { useEffect, useRef, useState } from "react";
import Chart, { ChartData, ChartOptions } from "chart.js/auto";
import { ProductType } from "@/types/Product";
import { UserType } from "@/types/User";
import { RenterType } from "@/types/Renters";
import axios from "axios";

export default function ChartPage() {
  const acquisitionsRef = useRef<HTMLCanvasElement | null>(null);
  const chartSecondRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);
  const chartInstanceSec = useRef<Chart | null>(null);

  const [product, setproduct] = useState<ProductType[]>([]);
  const [user, setUser] = useState<UserType[]>([]);
  const [renter, setRenter] = useState<RenterType[]>([]);
  const [renterReq, setRenterReq] = useState<any>();
  // product
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/products");
        setproduct(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // user
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/users");
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Renter
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/renter");
        setRenter(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Renter Request
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/rentalRequests"
        );
        setRenterReq(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // ======================================
  // ======================================
  // Chart One
  useEffect(() => {
    if (!acquisitionsRef.current) return;

    const data: ChartData<"bar"> = {
      labels: ["Products", "Users", "Renter"],
      datasets: [
        {
          label: "All Users",
          data: [product?.length, user?.length, renter?.length],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(75, 192, 192)",
            "rgb(255, 205, 86)",
            "rgb(201, 203, 207)",
          ],
        },
      ],
    };

    const options: ChartOptions<"bar"> = {
      responsive: true,
      maintainAspectRatio: false,
    };

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(acquisitionsRef.current, {
      type: "bar",
      data,
      options,
    });

    return () => {
      chartInstance.current?.destroy();
    };
  }, [product, user, renter]);
  // ======================================
  // ======================================
  // Chart Two

  useEffect(() => {
    if (!chartSecondRef.current) return;

    const data: ChartData<"polarArea"> = {
      labels: ["Approved", "Reject", "Pending"],
      datasets: [
        {
          label: "Renters Requests Status",
          data: [50, 20, 35],
          backgroundColor: [
            "oklch(69.6% 0.17 162.48)",
            "rgb(255, 99, 132)",
            "#929292",
          ],
        },
      ],
    };

    const options: ChartOptions<"polarArea"> = {
      responsive: true,
      maintainAspectRatio: false,
    };

    if (chartInstanceSec.current) {
      chartInstanceSec.current.destroy();
    }

    chartInstanceSec.current = new Chart(chartSecondRef.current, {
      type: "polarArea",
      data,
      options,
    });

    console.log(renterReq);

    return () => {
      chartInstanceSec.current?.destroy();
    };
  }, [renterReq]);

  return (
    <div className="grid grid-rows-2 gap-2.5 h-full">
      <div className="h-full w-full bg-secondary/50 rounded-md p-5">
        <canvas ref={acquisitionsRef} />
      </div>
      <div className="h-full w-full bg-secondary/50 rounded-md p-5">
        <canvas ref={chartSecondRef} />
      </div>
    </div>
  );
}
