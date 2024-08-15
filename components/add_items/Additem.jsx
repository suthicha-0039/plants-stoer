"use client";

import { useState } from "react";
import FormAdditem from "./FormAdditem"; // Import the form component

const Additem = () => {
// State variables for loading and submitted states
const [loading, setLoading] = useState(false);
const [submitted, setSubmitted] = useState(false);

return (
  <div className="parent-container">
    <div className="bg-slate-300 p-4">
      <div className="text-3xl font-bold m-4">เพิ่มรายการสินค้า</div>

      {/* Conditionally render content based on loading state */}
      {!loading ? (
        <FormAdditem
          // Pass loading and submitted states to FormAdditemComponent for coordination
          loading={loading}
          setLoading={setLoading}
          submitted={submitted}
          setSubmitted={setSubmitted}
        />
      ) : (
        <div className="loading-message">กำลังบันทึกข้อมูล...</div>
      )}
    </div>
  </div>
);
};

export default Additem;
