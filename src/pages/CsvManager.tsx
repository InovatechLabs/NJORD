import React from "react";
import CsvManager from "../components/csv/CsvManager";
import Nav from "../components/nav/Nav";
import Footer from "../components/home/footer/Footer";

export default function CsvManagerPage() {
  return (
    <>
      <Nav />
      <CsvManager />
      <Footer />
    </>
  );
}
