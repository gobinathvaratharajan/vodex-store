"use client";

import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { fetchHomeData } from "@/store/slices/dataSlice";

export function DataInitializer() {
  const dispatch = useDispatch<AppDispatch>();
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
        dispatch(fetchHomeData());
        initialized.current = true;
    }
  }, [dispatch]);

  return null;
}
