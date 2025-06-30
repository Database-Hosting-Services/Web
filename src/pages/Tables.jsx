// src/pages/IndexesPage.jsx
import React, { useState } from "react";
import searchIconImg from "../assets/searchIcon.svg";
import filterIconImg from "../assets/filterIcon.svg";

const TablesPage = () => {
  const tables = [
    {
      Name: "Name",
      tableName: "users",
      indexName: "users_pkey",
      rows: 0,
      size: "1024 bytes",
    },
  ];

  const hasTables = tables.length > 0;

  return (
    <div className="min-h-screen bg-[#06071A] font-medium text-24 text-[#FFFFFF] p-7">
      <h1 className="text-2xl font-semibold mb-2 text-left">Database Tables</h1>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2 items-center">
          <div className="relative inline-block w-full">
            <button className="bg-[#191A30] text-gray-300 text-left w-full px-5 py-2 rounded-lg border border-[#282939]">
              Schema <span className="text-[#FFFFFF] font-bold">public</span>
            </button>
          </div>

          <div className="flex justify-center items-center w-[50px] h-[50px] cursor-pointer">
            <img src={filterIconImg} alt="filter projects" />
          </div>

          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent w-full focus:outline-none transition-all duration-300 autofill:text-text
              [box-shadow:0_0_1000px_1000px#191A30_inset]
              text-[16px] text-gray-300 placeholder:text-gray-300 rounded-lg border border-[#282939] space-y-6 px-6 py-2"
            />
            <span className="top-1/2 left-2 absolute text-gray-400 -translate-y-1/2 transform">
              <img src={searchIconImg} alt="search" />
            </span>
          </div>
        </div>

        <button className="bg-gradient-to-b from-[#682EC7] to-[#5A12D3] cursor-pointer space-y-4 px-5 py-2 rounded-lg text-[#FFFFFF] font-medium">
          + New table
        </button>
      </div>

      <div className="bg-[#191A30] rounded-lg  border border-[#282939]">
        <table className="w-full text-left table-fixed ">
          <thead>
            <tr className="text-[#FFFFFF] font-medium border-b text-lg  border-[#282939]">
              <th className="py-5 m-3 pl-4 ">Name</th>
              <th className="py-5 m-3 pl-4 ">Description</th>
              <th className="py-5 m-3 pl-4 ">Rows</th>
              <th className="py-5 m-3 pl-4 ">Size</th>
            </tr>
          </thead>
          <tbody>
            {hasTables ? (
              tables.map((index, i) => (
                <tr
                  key={i}
                  className="border-b border-[#282939] bg-[#282939]  text-[#FFFFFF] "
                >
                  <td className="py-5 m-3 pl-4 ">{index.Name}</td>
                  <td className="py-5 m-3 pl-4">{index.tableName}</td>
                  <td className="py-5 m-3 pl-4">{index.rows}</td>
                  <td className="py-5 m-3 pl-4">{index.size}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-6 text-left text-[#FFFFFF]">
                  <div className="m-2 pl-3">No Tables created yet</div>
                  <span className="text-sm m-2 pl-3 text-gray-500">
                    There are no tables found in the schema.
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablesPage;
