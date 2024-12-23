import { $get, $post } from "../utils/request.ts";

// 模拟数据
let mockData = {
  count: 8,
  data: [
    {
      id: 1,
      roomTypeName: "单人间",
      roomTypePrice: 100,
      roomTypeArea: 20,
      roomTypeBed: "1.5米",
      roomTypeWindow: "有",
      roomTypeDesc: "单人间",
    },
    {
      id: 2,
      roomTypeName: "双人间",
      roomTypePrice: 200,
      roomTypeArea: 30,
      roomTypeBed: "1.8米",
      roomTypeWindow: "有",
      roomTypeDesc: "双人间",
    },
    {
      id: 3,
      roomTypeName: "三人间",
      roomTypePrice: 300,
      roomTypeArea: 40,
      roomTypeBed: "2米",
      roomTypeWindow: "有",
      roomTypeDesc: "三人间",
    },
    {
      id: 4,
      roomTypeName: "豪华间",
      roomTypePrice: 400,
      roomTypeArea: 50,
      roomTypeBed: "2.5米",
      roomTypeWindow: "有",
      roomTypeDesc: "豪华间",
    },
    {
      id: 5,
      roomTypeName: "套房",
      roomTypePrice: 500,
      roomTypeArea: 60,
      roomTypeBed: "3米",
      roomTypeWindow: "有",
      roomTypeDesc: "套房",
    },
    {
      id: 6,
      roomTypeName: "总统套房",
      roomTypePrice: 600,
      roomTypeArea: 70,
      roomTypeBed: "3.5米",
      roomTypeWindow: "有",
      roomTypeDesc: "总统套房",
    },
    {
      id: 7,
      roomTypeName: "海景房",
      roomTypePrice: 700,
      roomTypeArea: 80,
      roomTypeBed: "4米",
      roomTypeWindow: "有",
      roomTypeDesc: "海景房",
    },
    {
      id: 8,
      roomTypeName: "湖景房",
      roomTypePrice: 800,
      roomTypeArea: 90,
      roomTypeBed: "4.5米",
      roomTypeWindow: "有",
      roomTypeDesc: "湖景房",
    }
  ],
};

// 获取所有房间类型列表
export const $getRoomTypeList = async () => {
  //   let res = await $get("roomType/getRoomTypeList", params);
  let res = mockData.data;
  return {
    data: res,
  };
};
