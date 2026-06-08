/* eslint-disable @typescript-eslint/no-unused-expressions */
import * as echarts from "echarts";
import { useEffect, useRef } from "react";

export default function Home() {
  // 1.获取dom节点
  const chatRef = useRef(null);
  useEffect(() => {
    // 2.初始化echarts实例
    const myChart = echarts.init(chatRef.current);

    // 3.准备图表参数
    const option = {
      xAxis: {
        type: "category",
        data: ["Vue", "React", "Angular"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [10, 40, 70],
          type: "bar",
        },
      ],
    };
    // 4.设置图表数据
    option && myChart.setOption(option);
  }, []);
  return (
    <div>
      <div
        ref={chatRef}
        id="main"
        style={{ width: "500px", height: "500px" }}
      ></div>
    </div>
  );
}
