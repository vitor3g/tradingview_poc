"use client";

import { generateCandlestickData } from "@/utils/dataFeed";
import { CandleStick } from "./components/candleStick";

export default function Home() {
  return <CandleStick data={generateCandlestickData()} />;
}
