import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      style={{
        display: "flex ",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2> 404 Страница не найдена.</h2>
      <p>
        Вернуться на <Link to={"/"}> главную</Link>.
      </p>
    </div>
  );
}
