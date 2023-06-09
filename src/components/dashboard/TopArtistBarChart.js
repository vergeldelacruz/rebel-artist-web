import React from "react";
import { ResponsiveBar } from "@nivo/bar";

export default function TopArtistBarChart({ data }) {
  let keys = ["Payout"];
  const commonProperties = {
    margin: { top: 30, right: 80, bottom: 60, left: 80 },
    data: data,
    indexBy: "name",
    keys,
    padding: 0.2,
    labelTextColor: "white",
    labelSkipWidth: 16,
    labelSkipHeight: 16,
  };
  return (
    <div style={{ height: 320, maxWidth: 900 }}>
      <ResponsiveBar
        axisLeft={{
          format: ".2s",
        }}
        {...commonProperties}
        colors={{ scheme: "category10" }}
      />
    </div>
  );
}
