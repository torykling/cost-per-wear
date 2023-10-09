import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Cost Per Wear" },
    { name: "description", content: "Calculate the value of your wardrobe" },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Cost Per Wear</h1>
      <Link to="/clothing-items">Wardrobe
      </Link>
    </div>
  );
}
