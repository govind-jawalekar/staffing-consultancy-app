import React, { useState, useEffect } from "react";
import AppRoutes from "./routes/Approutes";
import globalCSS from "./styles/globalCSS";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";



export default function App() {
  return (
    <>
      <HelmetProvider>
        <style>{globalCSS}</style>
        <Toaster
          toastOptions={{
            style: {
              background: '#6e8ea5',
              color: '#fff',
              fontFamily: 'Lato, sans-serif',
            },
            success: {
              iconTheme: {
                primary: '#34A85A',
                secondary: '#fff',
              },
            },
          }}
        />
        <AppRoutes />
      </HelmetProvider>
    </>
  );
}