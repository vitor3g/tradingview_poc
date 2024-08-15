import { generateCandlestickData } from "@/utils/dataFeed";
import { createChart, ColorType } from "lightweight-charts";
import React, { useEffect, useRef } from "react";

type CandleStickProps = {
  data: {
    time: string;
    open: number;
    high: number;
    low: number;
    close: number;
  }[];
  colors?: {
    backgroundColor: string;
    lineColor: string;
    textColor: string;
    areaTopColor: string;
    upColor: string;
    downColor: string;
  };
};

export const CandleStick = (props: CandleStickProps) => {
  const {
    data,
    colors: {
      backgroundColor = "#17181C",
      lineColor = "#1C1D21",
      textColor = "white",
      areaTopColor = "#2962FF",
      upColor = "#049F68",
      downColor = "#EF243C",
    } = {},
  } = props;

  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current?.clientWidth });
    };

    const chart = createChart(chartContainerRef.current!, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor,
        attributionLogo: false,
      },
      grid: {
        vertLines: {
          color: lineColor,
        },
        horzLines: {
          color: lineColor,
        },
      },

      width: chartContainerRef.current?.clientWidth,
      height: 940,
    });

    chart.timeScale().fitContent();

    const newSeries = chart.addCandlestickSeries({
      upColor,
      downColor,
    });
    newSeries.setData(data);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [
    data,
    backgroundColor,
    lineColor,
    textColor,
    areaTopColor,
    upColor,
    downColor,
  ]);

  return <div ref={chartContainerRef} />;
};
