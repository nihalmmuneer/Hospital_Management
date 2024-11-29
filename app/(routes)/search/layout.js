import React from "react";
import CategoryList from "./_components/CategoryList";
const layout = ({ children }) => {
  return (
    <div className="grid md:grid-cols-4 grid-cols-1">
      <div className="md:block">
        <CategoryList />
      </div>
      <div className=" md:col-span-3 p-2">{children}</div>
    </div>
  );
};

export default layout;
