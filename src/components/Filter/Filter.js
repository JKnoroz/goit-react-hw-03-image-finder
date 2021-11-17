import React from "react";
import s from "./Filter.module.css";

const Filter = ({ value, onChange }) => (
  <label className={s.label}>
    Filter{" "}
    <input type="text" className={s.input} value={value} onChange={onChange} />
  </label>
);

export default Filter;
