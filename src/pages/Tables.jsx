// src/pages/IndexesPage.jsx
import React from "react";
import searchIconImg from "../assets/searchIcon.svg";
import filterIconImg from "../assets/filterIcon.svg";
import CreateIndexPage from "./createIndex";
import { useState } from "react";
const IndexesPage = () => {
  const [showCreateIndex, setShowCreateIndex] = useState(false);
  const indexes = [
    // {
    //   schemaName: "public",
    //   tableName: "users",
    //   indexName: "users_pkey",
    // },
    // {
    //   schemaName: "public",
    //   tableName: "users",
    //   indexName: "users_pkey",
    // },
    // {
    //   schemaName: "public",
    //   tableName: "orders",
    //   indexName: "orders_pkey",
    // },
  ];
  const Indexes = indexes.length > 0;
  return (
    <div className="min-h-screen bg-[#06071A] font-medium text-24 text-[#FFFFFF] p-7">
      <h1 className="text-2xl font-semibold  mb-2 text-left">
        Database Tables
      </h1>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2 items-center">
          <div className="relative inline-block w-full">
            <button className="bg-[#191A30] text-gray-300 text-left w-full px-5 py-2 rounded-lg border border-[#282939]">
              Schema <span className="text-[#FFFFFF] font-bold">public</span>
            </button>
          </div>
          <div className="flex justify-center items-center   w-[50px] h-[50px] cursor-pointer ">
            <img src={filterIconImg} alt="filter projects" />
          </div>

          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent w-full focus:outline-none transition-all duration-300 autofill:text-text
                [box-shadow:0_0_1000px_1000px#191A30_inset]
                  text-[16px]  text-gray-300 placeholder:text-gray-300 rounded-lg border border-[#282939] space-y-6 px-6 py-2"
            />
            <span className="top-1/2 left-2 absolute text-gray-400 -translate-y-1/2 transform">
              <img src={searchIconImg} alt="search" />
            </span>
          </div>
        </div>

        <button
          onClick={() => setShowCreateIndex(true)}
          className="bg-gradient-to-b from-[#682EC7] to-[#5A12D3]  cursor-pointer space-y-4 px-5 py-2 rounded-lg text-[#FFFFFF] font-medium"
        >
          + New Table
        </button>
      </div>

      <div className="bg-[#191A30] rounded-lg p-6 border border-[#282939]">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[#FFFFFF] font-normal border-b border-[#282939]">
              <th className="pb-3">Name</th>
              <th className="pb-3">Describtion</th>
              <th className="pb-3">Rows</th>
              <th className="pb-3">Size</th>
            </tr>
          </thead>
          <tbody>
            {Indexes ? (
              indexes.map((index, i) => (
                <tr key={i} className="border-b border-[#282939] ">
                  <td className="py-3">{index.schemaName}</td>
                  <td className="py-3">{index.tableName}</td>
                  <td className="py-3">{index.indexName}</td>
                  <td className="py-3">{index.indexName}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="py-6 text-left text-[#FFFFFF]">
                  <div className="mb-2">No indexes created yet</div>
                  <span className="text-sm text-gray-500">
                    There are no indexes found in the schema.
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {showCreateIndex && (
        <div className="fixed inset-2  backdrop-blur-sm  bg-opacity-0 z-2 flex items-center justify-center">
          <CreateIndexPage onClose={() => setShowCreateIndex(false)} />
        </div>
      )}
    </div>
  );
};

export default IndexesPage;
