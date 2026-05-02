let dashboards = {
  magnus1180: {
    title: "1180 Magnus OR Table 装机看板",
    rankingTitle: "1180 Magnus 用户排名",
    modalTitle: "1180 手术床项目录入与更新",
    totalUnitsLabel: "台 1180 Magnus",
    visual: {
      type: "image",
      src: "assets/1180-magnus-hybrid-column.png",
      alt: "1180 Magnus operating table system"
    },
    productModels: ["B0", "B1", "B2", "B3", "B4", "B5"],
    lineTotalUnitsLabelTemplate: "台 {line} 手术床",
    productLineOptions: [
      { value: "all", label: "全部" },
      { value: "b0", label: "B0", ratio: 0.12 },
      { value: "b1", label: "B1", ratio: 0.16 },
      { value: "b2", label: "B2", ratio: 0.18 },
      { value: "b3", label: "B3", ratio: 0.2 },
      { value: "b4", label: "B4", ratio: 0.18 },
      { value: "b5", label: "B5", ratio: 0.16 }
    ],
    provinceData: [
      { name: "上海市", value: 18, latestSite: "瑞金医院北部院区", latestDate: "2026-04-18", coord: [121.47, 31.23] },
      { name: "浙江省", value: 16, latestSite: "浙江大学医学院附属邵逸夫医院", latestDate: "2026-04-10", coord: [120.15, 30.28] },
      { name: "江苏省", value: 15, latestSite: "南京鼓楼医院江北院区", latestDate: "2026-03-29", coord: [118.76, 32.06] },
      { name: "广东省", value: 14, latestSite: "中山大学附属第一医院南沙院区", latestDate: "2026-04-05", coord: [113.27, 23.13] },
      { name: "四川省", value: 12, latestSite: "四川大学华西医院天府院区", latestDate: "2026-03-22", coord: [104.06, 30.67] },
      { name: "湖北省", value: 10, latestSite: "武汉协和医院车谷院区", latestDate: "2026-04-01", coord: [114.3, 30.59] },
      { name: "湖南省", value: 9, latestSite: "湘雅三医院", latestDate: "2026-02-28", coord: [112.98, 28.19] },
      { name: "重庆市", value: 8, latestSite: "重庆医科大学附属第一医院", latestDate: "2026-03-17", coord: [106.55, 29.56] },
      { name: "福建省", value: 7, latestSite: "福建医科大学附属协和医院", latestDate: "2026-02-18", coord: [119.3, 26.08] },
      { name: "安徽省", value: 6, latestSite: "中国科大附一院", latestDate: "2026-01-25", coord: [117.28, 31.86] },
      { name: "广西壮族自治区", value: 5, latestSite: "广西医科大学第一附属医院", latestDate: "2026-01-18", coord: [108.32, 22.82] },
      { name: "云南省", value: 4, latestSite: "昆明医科大学第一附属医院", latestDate: "2025-12-19", coord: [102.71, 25.04] },
      { name: "贵州省", value: 3, latestSite: "贵州省人民医院", latestDate: "2025-12-05", coord: [106.71, 26.58] },
      { name: "江西省", value: 3, latestSite: "南昌大学第一附属医院", latestDate: "2025-11-22", coord: [115.86, 28.68] },
      { name: "海南省", value: 2, latestSite: "海南省人民医院", latestDate: "2025-11-08", coord: [110.35, 20.02] }
    ],
    users: [
      { name: "上海交通大学医学院附属瑞金医院", province: "上海", value: 6 },
      { name: "四川大学华西医院", province: "四川", value: 5 },
      { name: "浙江大学医学院附属邵逸夫医院", province: "浙江", value: 5 },
      { name: "南京鼓楼医院", province: "江苏", value: 4 },
      { name: "中山大学附属第一医院", province: "广东", value: 4 },
      { name: "华中科技大学同济医学院附属协和医院", province: "湖北", value: 3 },
      { name: "中南大学湘雅医院", province: "湖南", value: 3 },
      { name: "重庆医科大学附属第一医院", province: "重庆", value: 2 }
    ],
    partners: [
      { name: "华东洁定医疗系统服务商", province: "沪苏浙", value: 21 },
      { name: "南区手术室解决方案伙伴", province: "粤桂琼", value: 17 },
      { name: "西南医院项目联盟", province: "川渝云贵", value: 14 },
      { name: "华中临床工程渠道", province: "鄂湘赣", value: 12 },
      { name: "福建精密设备有限公司", province: "福建", value: 7 },
      { name: "安徽智慧手术室伙伴", province: "安徽", value: 6 }
    ],
    updates: [
      { date: "04-18", status: "装机", text: "上海瑞金医院北部院区完成 1180 Magnus 交付 2 台" },
      { date: "04-10", status: "签约", text: "浙江大学医学院附属邵逸夫医院新增复合手术室项目" },
      { date: "04-05", status: "装机", text: "中山大学附属第一医院南沙院区完成验收" },
      { date: "04-01", status: "签约", text: "武汉协和医院车谷院区确认 1180 Magnus 配置方案" },
      { date: "03-29", status: "装机", text: "南京鼓楼医院江北院区新增 1 台" },
      { date: "03-22", status: "装机", text: "四川大学华西医院天府院区完成首间 OR table 安装" }
    ],
    monthlyTrend: [
      { month: "2025-05", installed: 6 },
      { month: "2025-06", installed: 7 },
      { month: "2025-07", installed: 5 },
      { month: "2025-08", installed: 8 },
      { month: "2025-09", installed: 6 },
      { month: "2025-10", installed: 9 },
      { month: "2025-11", installed: 8 },
      { month: "2025-12", installed: 10 },
      { month: "2026-01", installed: 7 },
      { month: "2026-02", installed: 8 },
      { month: "2026-03", installed: 11 },
      { month: "2026-04", installed: 10 }
    ],
    yearlyTrend: [
      { year: "2022", installed: 18 },
      { year: "2023", installed: 25 },
      { year: "2024", installed: 31 },
      { year: "2025", installed: 38 },
      { year: "2026", installed: 20 }
    ]
  },
  tegris: {
    title: "Tegris Dashboard 装机看板",
    rankingTitle: "Tegris 用户排名",
    modalTitle: "Tegris 一体化手术室项目录入与更新",
    totalUnitsLabel: "套 Tegris 系统",
    visual: {
      type: "image",
      src: "assets/tegris-int-or-1.png",
      alt: "Tegris integrated operating room system",
      tags: ["Tegris VOIP", "Tegris Classic", "TIGERS"]
    },
    productModels: ["VOIP", "Classic", "TIGERS"],
    lineTotalUnitsLabelTemplate: "套 {line} 系统",
    productLineOptions: [
      { value: "all", label: "全部 Tegris" },
      { value: "voip", label: "VOIP" },
      { value: "classic", label: "Classic" },
      { value: "tigers", label: "TIGERS" }
    ],
    totalUnits: 232,
    quarterUnits: 0,
    provinceData: [
      {
            "name": "广东省",
            "value": 51,
            "latestSite": "广州富力医院",
            "latestDate": "2024-06-28",
            "coord": [
                  113.27,
                  23.13
            ]
      },
      {
            "name": "浙江省",
            "value": 37,
            "latestSite": "杭州星灿生物技术有限公司",
            "latestDate": "2025-11-20",
            "coord": [
                  120.15,
                  30.28
            ]
      },
      {
            "name": "上海市",
            "value": 22,
            "latestSite": "上海市闵行区中心医院",
            "latestDate": "2025-07-30",
            "coord": [
                  121.47,
                  31.23
            ]
      },
      {
            "name": "四川省",
            "value": 20,
            "latestSite": "绵阳市中医医院",
            "latestDate": "2023-10-26",
            "coord": [
                  104.06,
                  30.67
            ]
      },
      {
            "name": "北京市",
            "value": 16,
            "latestSite": "北京凯隆荣锐医疗设备有限公司",
            "latestDate": "2025-11-20",
            "coord": [
                  116.41,
                  39.9
            ]
      },
      {
            "name": "江苏省",
            "value": 14,
            "latestSite": "江南大学附属医院",
            "latestDate": "2025-06-05",
            "coord": [
                  118.76,
                  32.06
            ]
      },
      {
            "name": "山东省",
            "value": 11,
            "latestSite": "山东省公共卫生临床中心",
            "latestDate": "2022-12-20",
            "coord": [
                  117.0,
                  36.65
            ]
      },
      {
            "name": "湖北省",
            "value": 9,
            "latestSite": "武汉市青山区华润武钢总医院",
            "latestDate": "2022-11-21",
            "coord": [
                  114.3,
                  30.59
            ]
      },
      {
            "name": "云南省",
            "value": 8,
            "latestSite": "昆明医科大学第一附属医院",
            "latestDate": "2015-10-14",
            "coord": [
                  102.71,
                  25.04
            ]
      },
      {
            "name": "江西省",
            "value": 5,
            "latestSite": "九江学院第二附属医院",
            "latestDate": "2022-08-26",
            "coord": [
                  115.86,
                  28.68
            ]
      },
      {
            "name": "福建省",
            "value": 5,
            "latestSite": "福建医科大学附属协和医院旗山院区",
            "latestDate": "2021-04-28",
            "coord": [
                  119.3,
                  26.08
            ]
      },
      {
            "name": "贵州省",
            "value": 5,
            "latestSite": "上海交通大学医学院附属上海儿童医学中心贵州医院",
            "latestDate": "2024-07-16",
            "coord": [
                  106.71,
                  26.58
            ]
      },
      {
            "name": "甘肃省",
            "value": 5,
            "latestSite": "甘肃省中医院",
            "latestDate": "2023-08-18",
            "coord": [
                  103.82,
                  36.06
            ]
      },
      {
            "name": "山西省",
            "value": 4,
            "latestSite": "山西省心血管病医院",
            "latestDate": "2021-02-02",
            "coord": [
                  112.53,
                  37.87
            ]
      },
      {
            "name": "湖南省",
            "value": 4,
            "latestSite": "中南大学湘雅二医院",
            "latestDate": "2023-06-01",
            "coord": [
                  112.98,
                  28.19
            ]
      },
      {
            "name": "重庆市",
            "value": 2,
            "latestSite": "重庆大学附属肿瘤医院",
            "latestDate": "2019-07-30",
            "coord": [
                  106.55,
                  29.56
            ]
      },
      {
            "name": "天津市",
            "value": 2,
            "latestSite": "天津医科大学第二医院",
            "latestDate": "2022-11-21",
            "coord": [
                  117.2,
                  39.12
            ]
      },
      {
            "name": "河北省",
            "value": 1,
            "latestSite": "唐山南湖医院",
            "latestDate": "2017-11-15",
            "coord": [
                  114.48,
                  38.03
            ]
      },
      {
            "name": "辽宁省",
            "value": 1,
            "latestSite": "大连维特奥康复咨询有限公司",
            "latestDate": "2016-10-21",
            "coord": [
                  123.43,
                  41.8
            ]
      },
      {
            "name": "宁夏回族自治区",
            "value": 1,
            "latestSite": "固原市人民医院",
            "latestDate": "2015-09-10",
            "coord": [
                  106.27,
                  38.47
            ]
      },
      {
            "name": "海南省",
            "value": 1,
            "latestSite": "海南省人民医院",
            "latestDate": "2020-03-16",
            "coord": [
                  110.35,
                  20.02
            ]
      }
],
    users: [
      {
            "name": "昆明医科大学第一附属医院",
            "province": "云南",
            "value": 8
      },
      {
            "name": "广州市合众汇达医疗科技有限公司",
            "province": "广东",
            "value": 8
      },
      {
            "name": "珠海市人民医院医疗集团",
            "province": "广东",
            "value": 7
      },
      {
            "name": "深圳前海泰康医院",
            "province": "广东",
            "value": 7
      },
      {
            "name": "四川思芃商贸有限公司",
            "province": "四川",
            "value": 6
      },
      {
            "name": "四川泰康医院",
            "province": "四川",
            "value": 5
      },
      {
            "name": "山东省千佛山医院",
            "province": "山东",
            "value": 4
      },
      {
            "name": "华中科技大学协和深圳医院",
            "province": "广东",
            "value": 4
      }
],
    partners: [
      {
            "name": "广州市合众汇达医疗科技有限公司",
            "province": "广东",
            "value": 18
      },
      {
            "name": "杭州首术科技有限公司",
            "province": "浙江",
            "value": 7
      },
      {
            "name": "杭州大沨医疗器械有限公司",
            "province": "浙江",
            "value": 5
      },
      {
            "name": "逸佰医疗科技发展（上海）有限公司",
            "province": "贵州",
            "value": 5
      },
      {
            "name": "上海万淇生物科技有限公司",
            "province": "江苏",
            "value": 4
      },
      {
            "name": "广东三鸿医药有限公司",
            "province": "广东",
            "value": 4
      },
      {
            "name": "成都裕康医疗设备有限公司",
            "province": "四川",
            "value": 4
      },
      {
            "name": "江西利恒医药有限公司",
            "province": "江西",
            "value": 3
      }
],
    updates: [
      {
            "date": "11-20",
            "status": "装机",
            "text": "杭州星灿生物技术有限公司 完成 Tegris VOIP 装机"
      },
      {
            "date": "11-20",
            "status": "装机",
            "text": "北京凯隆荣锐医疗设备有限公司 完成 Tegris VOIP 装机"
      },
      {
            "date": "11-20",
            "status": "装机",
            "text": "北京凯隆荣锐医疗设备有限公司 完成 Tegris VOIP 装机"
      },
      {
            "date": "08-08",
            "status": "装机",
            "text": "杭州星灿生物技术有限公司 完成 Tegris VOIP 装机"
      },
      {
            "date": "08-08",
            "status": "装机",
            "text": "杭州星灿生物技术有限公司 完成 Tegris VOIP 装机"
      },
      {
            "date": "07-30",
            "status": "装机",
            "text": "上海市闵行区中心医院 完成 Tegris VOIP 装机"
      }
],
    monthlyTrend: [
      {
            "month": "2025-05",
            "installed": 0
      },
      {
            "month": "2025-06",
            "installed": 4
      },
      {
            "month": "2025-07",
            "installed": 1
      },
      {
            "month": "2025-08",
            "installed": 2
      },
      {
            "month": "2025-09",
            "installed": 0
      },
      {
            "month": "2025-10",
            "installed": 0
      },
      {
            "month": "2025-11",
            "installed": 3
      },
      {
            "month": "2025-12",
            "installed": 0
      },
      {
            "month": "2026-01",
            "installed": 0
      },
      {
            "month": "2026-02",
            "installed": 0
      },
      {
            "month": "2026-03",
            "installed": 0
      },
      {
            "month": "2026-04",
            "installed": 0
      }
],
    yearlyTrend: [
      {
            "year": "2022",
            "installed": 39
      },
      {
            "year": "2023",
            "installed": 26
      },
      {
            "year": "2024",
            "installed": 29
      },
      {
            "year": "2025",
            "installed": 16
      },
      {
            "year": "2026",
            "installed": 0
      }
],
    productLineData: {
      voip: {
      "totalUnits": 117,
      "quarterUnits": 0,
      "provinceData": [
            {
                  "name": "广东省",
                  "value": 31,
                  "latestSite": "广州富力医院",
                  "latestDate": "2024-06-28",
                  "coord": [
                        113.27,
                        23.13
                  ]
            },
            {
                  "name": "浙江省",
                  "value": 30,
                  "latestSite": "杭州星灿生物技术有限公司",
                  "latestDate": "2025-11-20",
                  "coord": [
                        120.15,
                        30.28
                  ]
            },
            {
                  "name": "江苏省",
                  "value": 10,
                  "latestSite": "江南大学附属医院",
                  "latestDate": "2025-06-05",
                  "coord": [
                        118.76,
                        32.06
                  ]
            },
            {
                  "name": "北京市",
                  "value": 8,
                  "latestSite": "北京凯隆荣锐医疗设备有限公司",
                  "latestDate": "2025-11-20",
                  "coord": [
                        116.41,
                        39.9
                  ]
            },
            {
                  "name": "四川省",
                  "value": 8,
                  "latestSite": "绵阳市中医医院",
                  "latestDate": "2023-10-26",
                  "coord": [
                        104.06,
                        30.67
                  ]
            },
            {
                  "name": "上海市",
                  "value": 7,
                  "latestSite": "上海市闵行区中心医院",
                  "latestDate": "2025-07-30",
                  "coord": [
                        121.47,
                        31.23
                  ]
            },
            {
                  "name": "湖南省",
                  "value": 4,
                  "latestSite": "中南大学湘雅二医院",
                  "latestDate": "2023-06-01",
                  "coord": [
                        112.98,
                        28.19
                  ]
            },
            {
                  "name": "甘肃省",
                  "value": 3,
                  "latestSite": "甘肃省中医院",
                  "latestDate": "2023-08-18",
                  "coord": [
                        103.82,
                        36.06
                  ]
            },
            {
                  "name": "贵州省",
                  "value": 3,
                  "latestSite": "上海交通大学医学院附属上海儿童医学中心贵州医院",
                  "latestDate": "2024-07-16",
                  "coord": [
                        106.71,
                        26.58
                  ]
            },
            {
                  "name": "湖北省",
                  "value": 2,
                  "latestSite": "华中科技大学同济医学院附属协和医院",
                  "latestDate": "2018-07-26",
                  "coord": [
                        114.3,
                        30.59
                  ]
            },
            {
                  "name": "重庆市",
                  "value": 2,
                  "latestSite": "重庆大学附属肿瘤医院",
                  "latestDate": "2019-07-30",
                  "coord": [
                        106.55,
                        29.56
                  ]
            },
            {
                  "name": "辽宁省",
                  "value": 1,
                  "latestSite": "大连维特奥康复咨询有限公司",
                  "latestDate": "2016-10-21",
                  "coord": [
                        123.43,
                        41.8
                  ]
            },
            {
                  "name": "河北省",
                  "value": 1,
                  "latestSite": "唐山南湖医院",
                  "latestDate": "2017-11-15",
                  "coord": [
                        114.48,
                        38.03
                  ]
            },
            {
                  "name": "江西省",
                  "value": 1,
                  "latestSite": "九江学院第二附属医院",
                  "latestDate": "2022-08-26",
                  "coord": [
                        115.86,
                        28.68
                  ]
            },
            {
                  "name": "山东省",
                  "value": 1,
                  "latestSite": "山东省公共卫生临床中心",
                  "latestDate": "2022-12-20",
                  "coord": [
                        117.0,
                        36.65
                  ]
            }
      ],
      "users": [
            {
                  "name": "深圳前海泰康医院",
                  "province": "广东",
                  "value": 7
            },
            {
                  "name": "广州市合众汇达医疗科技有限公司",
                  "province": "广东",
                  "value": 6
            },
            {
                  "name": "珠海市人民医院医疗集团",
                  "province": "广东",
                  "value": 6
            },
            {
                  "name": "四川泰康医院",
                  "province": "四川",
                  "value": 5
            },
            {
                  "name": "中南大学湘雅二医院",
                  "province": "湖南",
                  "value": 4
            },
            {
                  "name": "江苏省中西医结合医院",
                  "province": "江苏",
                  "value": 4
            },
            {
                  "name": "首都医科大学宣武医院",
                  "province": "北京",
                  "value": 4
            },
            {
                  "name": "广州富力医院",
                  "province": "广东",
                  "value": 4
            }
      ],
      "partners": [
            {
                  "name": "广州市合众汇达医疗科技有限公司",
                  "province": "广东",
                  "value": 10
            },
            {
                  "name": "杭州首术科技有限公司",
                  "province": "浙江",
                  "value": 5
            },
            {
                  "name": "上海万淇生物科技有限公司",
                  "province": "江苏",
                  "value": 4
            },
            {
                  "name": "杭州大沨医疗器械有限公司",
                  "province": "浙江",
                  "value": 4
            },
            {
                  "name": "逸佰医疗科技发展（上海）有限公司",
                  "province": "贵州",
                  "value": 4
            },
            {
                  "name": "西安宏亚安正科技有限公司",
                  "province": "甘肃",
                  "value": 3
            },
            {
                  "name": "宁波泰甬置业有限公司",
                  "province": "浙江",
                  "value": 3
            },
            {
                  "name": "北京世纪凯盈科学仪器有限公司",
                  "province": "江苏",
                  "value": 2
            }
      ],
      "updates": [
            {
                  "date": "11-20",
                  "status": "装机",
                  "text": "杭州星灿生物技术有限公司 完成 Tegris VOIP 装机"
            },
            {
                  "date": "11-20",
                  "status": "装机",
                  "text": "北京凯隆荣锐医疗设备有限公司 完成 Tegris VOIP 装机"
            },
            {
                  "date": "11-20",
                  "status": "装机",
                  "text": "北京凯隆荣锐医疗设备有限公司 完成 Tegris VOIP 装机"
            },
            {
                  "date": "08-08",
                  "status": "装机",
                  "text": "杭州星灿生物技术有限公司 完成 Tegris VOIP 装机"
            },
            {
                  "date": "08-08",
                  "status": "装机",
                  "text": "杭州星灿生物技术有限公司 完成 Tegris VOIP 装机"
            },
            {
                  "date": "07-30",
                  "status": "装机",
                  "text": "上海市闵行区中心医院 完成 Tegris VOIP 装机"
            }
      ],
      "monthlyTrend": [
            {
                  "month": "2025-05",
                  "installed": 0
            },
            {
                  "month": "2025-06",
                  "installed": 4
            },
            {
                  "month": "2025-07",
                  "installed": 1
            },
            {
                  "month": "2025-08",
                  "installed": 2
            },
            {
                  "month": "2025-09",
                  "installed": 0
            },
            {
                  "month": "2025-10",
                  "installed": 0
            },
            {
                  "month": "2025-11",
                  "installed": 3
            },
            {
                  "month": "2025-12",
                  "installed": 0
            },
            {
                  "month": "2026-01",
                  "installed": 0
            },
            {
                  "month": "2026-02",
                  "installed": 0
            },
            {
                  "month": "2026-03",
                  "installed": 0
            },
            {
                  "month": "2026-04",
                  "installed": 0
            }
      ],
      "yearlyTrend": [
            {
                  "year": "2022",
                  "installed": 18
            },
            {
                  "year": "2023",
                  "installed": 26
            },
            {
                  "year": "2024",
                  "installed": 29
            },
            {
                  "year": "2025",
                  "installed": 16
            },
            {
                  "year": "2026",
                  "installed": 0
            }
      ]
},
      classic: {
      "totalUnits": 115,
      "quarterUnits": 0,
      "provinceData": [
            {
                  "name": "广东省",
                  "value": 20,
                  "latestSite": "华中科技大学协和深圳医院",
                  "latestDate": "2022-11-21",
                  "coord": [
                        113.27,
                        23.13
                  ]
            },
            {
                  "name": "上海市",
                  "value": 15,
                  "latestSite": "上海市静安区华东医院",
                  "latestDate": "2022-11-21",
                  "coord": [
                        121.47,
                        31.23
                  ]
            },
            {
                  "name": "四川省",
                  "value": 12,
                  "latestSite": "四川思芃商贸有限公司",
                  "latestDate": "2022-07-22",
                  "coord": [
                        104.06,
                        30.67
                  ]
            },
            {
                  "name": "山东省",
                  "value": 10,
                  "latestSite": "青岛国林国际贸易有限公司",
                  "latestDate": "2021-10-08",
                  "coord": [
                        117.0,
                        36.65
                  ]
            },
            {
                  "name": "北京市",
                  "value": 8,
                  "latestSite": "北京映熹科技有限公司",
                  "latestDate": "2022-07-18",
                  "coord": [
                        116.41,
                        39.9
                  ]
            },
            {
                  "name": "云南省",
                  "value": 8,
                  "latestSite": "昆明医科大学第一附属医院",
                  "latestDate": "2015-10-14",
                  "coord": [
                        102.71,
                        25.04
                  ]
            },
            {
                  "name": "湖北省",
                  "value": 7,
                  "latestSite": "武汉市青山区华润武钢总医院",
                  "latestDate": "2022-11-21",
                  "coord": [
                        114.3,
                        30.59
                  ]
            },
            {
                  "name": "浙江省",
                  "value": 7,
                  "latestSite": "浙江大学医学院附属第一医院",
                  "latestDate": "2021-05-27",
                  "coord": [
                        120.15,
                        30.28
                  ]
            },
            {
                  "name": "福建省",
                  "value": 5,
                  "latestSite": "福建医科大学附属协和医院旗山院区",
                  "latestDate": "2021-04-28",
                  "coord": [
                        119.3,
                        26.08
                  ]
            },
            {
                  "name": "山西省",
                  "value": 4,
                  "latestSite": "山西省心血管病医院",
                  "latestDate": "2021-02-02",
                  "coord": [
                        112.53,
                        37.87
                  ]
            },
            {
                  "name": "江苏省",
                  "value": 4,
                  "latestSite": "江南大学附属医院",
                  "latestDate": "2020-03-12",
                  "coord": [
                        118.76,
                        32.06
                  ]
            },
            {
                  "name": "江西省",
                  "value": 4,
                  "latestSite": "萍乡市人民医院",
                  "latestDate": "2021-05-03",
                  "coord": [
                        115.86,
                        28.68
                  ]
            },
            {
                  "name": "贵州省",
                  "value": 2,
                  "latestSite": "盘州市人民医院",
                  "latestDate": "2018-11-15",
                  "coord": [
                        106.71,
                        26.58
                  ]
            },
            {
                  "name": "甘肃省",
                  "value": 2,
                  "latestSite": "解放军联勤保障部队940医院",
                  "latestDate": "2016-05-31",
                  "coord": [
                        103.82,
                        36.06
                  ]
            },
            {
                  "name": "天津市",
                  "value": 2,
                  "latestSite": "天津医科大学第二医院",
                  "latestDate": "2022-11-21",
                  "coord": [
                        117.2,
                        39.12
                  ]
            },
            {
                  "name": "宁夏回族自治区",
                  "value": 1,
                  "latestSite": "固原市人民医院",
                  "latestDate": "2015-09-10",
                  "coord": [
                        106.27,
                        38.47
                  ]
            },
            {
                  "name": "海南省",
                  "value": 1,
                  "latestSite": "海南省人民医院",
                  "latestDate": "2020-03-16",
                  "coord": [
                        110.35,
                        20.02
                  ]
            }
      ],
      "users": [
            {
                  "name": "昆明医科大学第一附属医院",
                  "province": "云南",
                  "value": 8
            },
            {
                  "name": "四川思芃商贸有限公司",
                  "province": "四川",
                  "value": 6
            },
            {
                  "name": "广州泰和肿瘤医院",
                  "province": "广东",
                  "value": 4
            },
            {
                  "name": "山东省千佛山医院",
                  "province": "山东",
                  "value": 4
            },
            {
                  "name": "南昌大学第一附属医院象湖院区",
                  "province": "江西",
                  "value": 3
            },
            {
                  "name": "华中科技大学协和深圳医院",
                  "province": "广东",
                  "value": 3
            },
            {
                  "name": "上海瑶革医疗设备有限公司",
                  "province": "上海",
                  "value": 3
            },
            {
                  "name": "荆州市智慧城市科技股份有限公司",
                  "province": "湖北",
                  "value": 3
            }
      ],
      "partners": [
            {
                  "name": "广州市合众汇达医疗科技有限公司",
                  "province": "广东",
                  "value": 8
            },
            {
                  "name": "广东三鸿医药有限公司",
                  "province": "广东",
                  "value": 4
            },
            {
                  "name": "成都裕康医疗设备有限公司",
                  "province": "四川",
                  "value": 3
            },
            {
                  "name": "山西精准互联科技发展有限公司",
                  "province": "山西",
                  "value": 3
            },
            {
                  "name": "江西利恒医药有限公司",
                  "province": "江西",
                  "value": 3
            },
            {
                  "name": "厦门象屿速传供应链发展股份有限公司",
                  "province": "福建",
                  "value": 3
            },
            {
                  "name": "中建投（广东）国际贸易有限公司",
                  "province": "湖北",
                  "value": 2
            },
            {
                  "name": "上海又诺贸易中心",
                  "province": "北京",
                  "value": 2
            }
      ],
      "updates": [
            {
                  "date": "11-21",
                  "status": "装机",
                  "text": "武汉市青山区华润武钢总医院 完成 Tegris Classic 装机"
            },
            {
                  "date": "11-21",
                  "status": "装机",
                  "text": "上海市静安区华东医院 完成 Tegris Classic 装机"
            },
            {
                  "date": "11-21",
                  "status": "装机",
                  "text": "天津医科大学第二医院 完成 Tegris Classic 装机"
            },
            {
                  "date": "11-21",
                  "status": "装机",
                  "text": "华中科技大学协和深圳医院 完成 Tegris Classic 装机"
            },
            {
                  "date": "11-21",
                  "status": "装机",
                  "text": "华中科技大学协和深圳医院 完成 Tegris Classic 装机"
            },
            {
                  "date": "11-21",
                  "status": "装机",
                  "text": "华中科技大学协和深圳医院 完成 Tegris Classic 装机"
            }
      ],
      "monthlyTrend": [
            {
                  "month": "2025-05",
                  "installed": 0
            },
            {
                  "month": "2025-06",
                  "installed": 0
            },
            {
                  "month": "2025-07",
                  "installed": 0
            },
            {
                  "month": "2025-08",
                  "installed": 0
            },
            {
                  "month": "2025-09",
                  "installed": 0
            },
            {
                  "month": "2025-10",
                  "installed": 0
            },
            {
                  "month": "2025-11",
                  "installed": 0
            },
            {
                  "month": "2025-12",
                  "installed": 0
            },
            {
                  "month": "2026-01",
                  "installed": 0
            },
            {
                  "month": "2026-02",
                  "installed": 0
            },
            {
                  "month": "2026-03",
                  "installed": 0
            },
            {
                  "month": "2026-04",
                  "installed": 0
            }
      ],
      "yearlyTrend": [
            {
                  "year": "2022",
                  "installed": 21
            },
            {
                  "year": "2023",
                  "installed": 0
            },
            {
                  "year": "2024",
                  "installed": 0
            },
            {
                  "year": "2025",
                  "installed": 0
            },
            {
                  "year": "2026",
                  "installed": 0
            }
      ]
},
      tigers: {
      "totalUnits": 0,
      "quarterUnits": 0,
      "provinceData": [],
      "users": [],
      "partners": [],
      "updates": [],
      "monthlyTrend": [
            {
                  "month": "2025-05",
                  "installed": 0
            },
            {
                  "month": "2025-06",
                  "installed": 0
            },
            {
                  "month": "2025-07",
                  "installed": 0
            },
            {
                  "month": "2025-08",
                  "installed": 0
            },
            {
                  "month": "2025-09",
                  "installed": 0
            },
            {
                  "month": "2025-10",
                  "installed": 0
            },
            {
                  "month": "2025-11",
                  "installed": 0
            },
            {
                  "month": "2025-12",
                  "installed": 0
            },
            {
                  "month": "2026-01",
                  "installed": 0
            },
            {
                  "month": "2026-02",
                  "installed": 0
            },
            {
                  "month": "2026-03",
                  "installed": 0
            },
            {
                  "month": "2026-04",
                  "installed": 0
            }
      ],
      "yearlyTrend": [
            {
                  "year": "2022",
                  "installed": 0
            },
            {
                  "year": "2023",
                  "installed": 0
            },
            {
                  "year": "2024",
                  "installed": 0
            },
            {
                  "year": "2025",
                  "installed": 0
            },
            {
                  "year": "2026",
                  "installed": 0
            }
      ]
}
    }
  },
  icMic: {
    title: "IC MIC Dashboard 装机看板",
    rankingTitle: "IC MIC 用户排名",
    modalTitle: "IC MIC 项目录入与更新",
    totalUnitsLabel: "台 IC MIC 设备",
    visual: {
      type: "image",
      src: "assets/ic-mic-dashboard.jpg",
      alt: "Getinge IC MIC washer disinfector"
    },
    productModels: ["S600", "Novito"],
    lineTotalUnitsLabelTemplate: "台 {line} 设备",
    productLineOptions: [
      { value: "all", label: "全部 IC MIC" },
      { value: "s600", label: "S600" },
      { value: "novito", label: "Novito" }
    ],
    provinceData: [
      { name: "上海市", value: 24, latestSite: "上海交通大学医学院附属仁济医院", latestDate: "2026-04-20", coord: [121.47, 31.23] },
      { name: "浙江省", value: 21, latestSite: "浙江省人民医院朝晖院区", latestDate: "2026-04-14", coord: [120.15, 30.28] },
      { name: "江苏省", value: 19, latestSite: "江苏省人民医院浦口分院", latestDate: "2026-04-06", coord: [118.76, 32.06] },
      { name: "广东省", value: 17, latestSite: "南方医科大学南方医院", latestDate: "2026-03-30", coord: [113.27, 23.13] },
      { name: "四川省", value: 14, latestSite: "成都市第三人民医院", latestDate: "2026-03-24", coord: [104.06, 30.67] },
      { name: "湖北省", value: 12, latestSite: "湖北省妇幼保健院光谷院区", latestDate: "2026-03-13", coord: [114.3, 30.59] },
      { name: "湖南省", value: 11, latestSite: "湖南省肿瘤医院", latestDate: "2026-03-02", coord: [112.98, 28.19] },
      { name: "重庆市", value: 10, latestSite: "重庆大学附属肿瘤医院", latestDate: "2026-02-22", coord: [106.55, 29.56] },
      { name: "福建省", value: 8, latestSite: "福建省立医院金山院区", latestDate: "2026-02-08", coord: [119.3, 26.08] },
      { name: "安徽省", value: 7, latestSite: "安徽省立医院南区", latestDate: "2026-01-29", coord: [117.28, 31.86] },
      { name: "广西壮族自治区", value: 6, latestSite: "柳州市人民医院", latestDate: "2026-01-16", coord: [108.32, 22.82] },
      { name: "云南省", value: 5, latestSite: "昆明市延安医院", latestDate: "2025-12-27", coord: [102.71, 25.04] },
      { name: "贵州省", value: 4, latestSite: "贵阳市第一人民医院", latestDate: "2025-12-15", coord: [106.71, 26.58] },
      { name: "江西省", value: 4, latestSite: "南昌市第一医院", latestDate: "2025-11-29", coord: [115.86, 28.68] },
      { name: "海南省", value: 3, latestSite: "三亚中心医院", latestDate: "2025-11-10", coord: [110.35, 20.02] }
    ],
    users: [
      { name: "上海交通大学医学院附属仁济医院", province: "上海", value: 8 },
      { name: "浙江省人民医院", province: "浙江", value: 7 },
      { name: "江苏省人民医院", province: "江苏", value: 6 },
      { name: "南方医科大学南方医院", province: "广东", value: 6 },
      { name: "成都市第三人民医院", province: "四川", value: 5 },
      { name: "湖北省妇幼保健院", province: "湖北", value: 4 },
      { name: "湖南省肿瘤医院", province: "湖南", value: 4 },
      { name: "重庆大学附属肿瘤医院", province: "重庆", value: 3 }
    ],
    partners: [
      { name: "华东 CSSD 设备服务商", province: "沪苏浙", value: 33 },
      { name: "南区感染控制解决方案伙伴", province: "粤桂琼", value: 26 },
      { name: "西南消毒供应中心联盟", province: "川渝云贵", value: 23 },
      { name: "华中院感工程渠道", province: "鄂湘赣", value: 21 },
      { name: "福建消供设备有限公司", province: "福建", value: 8 },
      { name: "安徽洁净供应室伙伴", province: "安徽", value: 7 }
    ],
    updates: [
      { date: "04-20", status: "装机", text: "上海仁济医院新增 IC MIC 清洗消毒设备 3 台" },
      { date: "04-14", status: "签约", text: "浙江省人民医院确认 CSSD 扩容项目" },
      { date: "04-06", status: "装机", text: "江苏省人民医院浦口分院完成 MIC 设备验收" },
      { date: "03-30", status: "装机", text: "南方医科大学南方医院完成 IC 产线联调" },
      { date: "03-24", status: "签约", text: "成都市第三人民医院新增清洗消毒中心配置" },
      { date: "03-13", status: "装机", text: "湖北省妇幼保健院光谷院区完成交付" }
    ],
    monthlyTrend: [
      { month: "2025-05", installed: 8 },
      { month: "2025-06", installed: 9 },
      { month: "2025-07", installed: 8 },
      { month: "2025-08", installed: 11 },
      { month: "2025-09", installed: 9 },
      { month: "2025-10", installed: 12 },
      { month: "2025-11", installed: 10 },
      { month: "2025-12", installed: 13 },
      { month: "2026-01", installed: 10 },
      { month: "2026-02", installed: 11 },
      { month: "2026-03", installed: 15 },
      { month: "2026-04", installed: 13 }
    ],
    yearlyTrend: [
      { year: "2022", installed: 24 },
      { year: "2023", installed: 32 },
      { year: "2024", installed: 39 },
      { year: "2025", installed: 45 },
      { year: "2026", installed: 25 }
    ]
  }
};

const provinceNames = [
  "上海市", "浙江省", "江苏省", "广东省", "四川省", "湖北省", "湖南省", "重庆市", "福建省", "安徽省",
  "广西壮族自治区", "云南省", "贵州省", "江西省", "海南省", "北京市", "天津市", "河北省", "山西省",
  "内蒙古自治区", "辽宁省", "吉林省", "黑龙江省", "山东省", "河南省", "西藏自治区", "陕西省", "甘肃省",
  "青海省", "宁夏回族自治区", "新疆维吾尔自治区"
];

const provinceCoordinates = {
  "上海市": [121.47, 31.23],
  "浙江省": [120.15, 30.28],
  "江苏省": [118.76, 32.06],
  "广东省": [113.27, 23.13],
  "四川省": [104.06, 30.67],
  "湖北省": [114.3, 30.59],
  "湖南省": [112.98, 28.19],
  "重庆市": [106.55, 29.56],
  "福建省": [119.3, 26.08],
  "安徽省": [117.28, 31.86],
  "广西壮族自治区": [108.32, 22.82],
  "云南省": [102.71, 25.04],
  "贵州省": [106.71, 26.58],
  "江西省": [115.86, 28.68],
  "海南省": [110.35, 20.02],
  "北京市": [116.41, 39.9],
  "天津市": [117.2, 39.12],
  "河北省": [114.48, 38.03],
  "山西省": [112.53, 37.87],
  "内蒙古自治区": [111.67, 40.82],
  "辽宁省": [123.43, 41.8],
  "吉林省": [125.32, 43.9],
  "黑龙江省": [126.63, 45.75],
  "山东省": [117, 36.65],
  "河南省": [113.62, 34.75],
  "西藏自治区": [91.13, 29.65],
  "陕西省": [108.94, 34.34],
  "甘肃省": [103.82, 36.06],
  "青海省": [101.78, 36.62],
  "宁夏回族自治区": [106.27, 38.47],
  "新疆维吾尔自治区": [87.62, 43.82]
};

let currentDashboardKey = "magnus1180";
let currentProductLineKey = "all";
let trendChart;
let yearTrendChart;
let mapChart;
let chinaGeoJson;

const projectFields = [
  "partNumber",
  "productModel",
  "serialNumber",
  "installProvince",
  "hospitalName",
  "channelName",
  "salesName",
  "orderDate",
  "installDate",
  "acceptanceDate",
  "warrantyExpireDate"
];

const formatNumber = new Intl.NumberFormat("zh-CN");
const brandColors = {
  blue: "#18274a",
  snow: "#e9e4e3",
  oat: "#d4cac8",
  clay: "#bfb1ac",
  cliff: "#8b7e79",
  granite: "#595857",
  midnight: "#495a6b",
  ocean: "#31b7bc",
  berry: "#e56b78",
  sun: "#f39200",
  grass: "#94b654",
  white: "#ffffff"
};

const defaultUsers = [
  {
    username: "Maquet",
    password: "123win",
    displayName: "系统管理员",
    role: "系统管理员"
  },
  {
    username: "Tomwu",
    password: "maquet",
    displayName: "Tom Wu",
    role: "Sr.Manager"
  },
  {
    username: "Jayding",
    password: "maquet",
    displayName: "Jay Ding",
    role: "Sr.Director SW"
  },
  {
    username: "Evanwang",
    password: "maquet",
    displayName: "Evan Wang",
    role: "Head of marketing"
  },
  {
    username: "Violajin",
    password: "maquet",
    displayName: "Viola Jin",
    role: "Head of marketing"
  },
  {
    username: "Leoyu",
    password: "maquet",
    displayName: "Leo Yu",
    role: "Head of marketing"
  },
  {
    username: "ChrisZhang",
    password: "maquet",
    displayName: "Chris Zhang",
    role: "Marketing Director"
  },
  {
    username: "Xiangzhu",
    password: "maquet",
    displayName: "Xiang Zhu",
    role: "Project manager"
  }
];
const importedUsersStorageKey = "getinge-dashboard-imported-users-v1";
const authSessionStorageKey = "getinge-dashboard-authenticated-user-v1";
const authUsersApiEndpoint = "/api/users";
const dashboardDataApiEndpoint = "/api/dashboard-data";
let importedUsersCache = [];
let authUsersBackendAvailable = false;
let dashboardDataBackendAvailable = false;
let dashboardInitialized = false;

function normalizeCredential(value) {
  return String(value ?? "").trim();
}

function getImportedUsers() {
  return importedUsersCache;
}

function getLocalImportedUsers() {
  try {
    return JSON.parse(localStorage.getItem(importedUsersStorageKey)) || [];
  } catch (error) {
    return [];
  }
}

function setLocalImportedUsers(users) {
  localStorage.setItem(importedUsersStorageKey, JSON.stringify(users));
}

async function loadImportedUsers() {
  const localUsers = getLocalImportedUsers();
  importedUsersCache = localUsers;

  if (!window.location.protocol.startsWith("http")) {
    return false;
  }

  try {
    const response = await fetch(authUsersApiEndpoint, { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Unable to load backend users");
    }

    const payload = await response.json();
    const backendUsers = Array.isArray(payload.users) ? payload.users : [];
    if (!backendUsers.length && localUsers.length) {
      authUsersBackendAvailable = true;
      await setImportedUsers(localUsers);
      return true;
    }

    importedUsersCache = backendUsers;
    setLocalImportedUsers(importedUsersCache);
    authUsersBackendAvailable = true;
    return true;
  } catch (error) {
    authUsersBackendAvailable = false;
    importedUsersCache = localUsers;
    return false;
  }
}

async function setImportedUsers(users) {
  importedUsersCache = users;
  setLocalImportedUsers(users);

  if (!window.location.protocol.startsWith("http")) {
    return users;
  }

  try {
    const response = await fetch(authUsersApiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ users })
    });

    if (!response.ok) {
      throw new Error("Unable to save backend users");
    }

    const payload = await response.json();
    importedUsersCache = Array.isArray(payload.users) ? payload.users : users;
    setLocalImportedUsers(importedUsersCache);
    authUsersBackendAvailable = true;
    return importedUsersCache;
  } catch (error) {
    authUsersBackendAvailable = false;
    return users;
  }
}

function cloneDashboardData(source) {
  return JSON.parse(JSON.stringify(source));
}

async function loadDashboardData() {
  if (!window.location.protocol.startsWith("http")) {
    return false;
  }

  try {
    const response = await fetch(dashboardDataApiEndpoint, { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Unable to load dashboard data");
    }

    const payload = await response.json();
    if (payload.dashboards && typeof payload.dashboards === "object") {
      dashboards = payload.dashboards;
      dashboardDataBackendAvailable = true;
      return true;
    }
  } catch (error) {
    dashboardDataBackendAvailable = false;
  }

  return false;
}

async function saveDashboardData(nextDashboards) {
  dashboards = nextDashboards;

  if (!window.location.protocol.startsWith("http")) {
    return dashboards;
  }

  try {
    const response = await fetch(dashboardDataApiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ dashboards })
    });

    if (!response.ok) {
      throw new Error("Unable to save dashboard data");
    }

    const payload = await response.json();
    if (payload.dashboards && typeof payload.dashboards === "object") {
      dashboards = payload.dashboards;
    }
    dashboardDataBackendAvailable = true;
  } catch (error) {
    dashboardDataBackendAvailable = false;
  }

  return dashboards;
}

function allLoginUsers() {
  return [...defaultUsers, ...getImportedUsers()];
}

function getAuthenticatedUser() {
  try {
    return JSON.parse(sessionStorage.getItem(authSessionStorageKey));
  } catch (error) {
    return null;
  }
}

function setAuthClasses(isAuthenticated) {
  document.body.classList.toggle("auth-locked", !isAuthenticated);
  document.body.classList.toggle("authenticated", isAuthenticated);
}

function setLoginMessage(message, type = "error") {
  const target = document.querySelector("#loginMessage");
  target.textContent = message;
  target.classList.toggle("success", type === "success");
}

function findLoginUser(username, password) {
  const normalizedUsername = normalizeCredential(username).toLowerCase();
  const normalizedPassword = normalizeCredential(password);

  return allLoginUsers().find((user) => (
    normalizeCredential(user.username).toLowerCase() === normalizedUsername
    && normalizeCredential(user.password) === normalizedPassword
  ));
}

function setAuthenticatedUser(user) {
  sessionStorage.setItem(authSessionStorageKey, JSON.stringify({
    username: user.username,
    displayName: user.displayName || user.username,
    role: user.role || user.position || "授权用户",
    loggedInAt: new Date().toISOString()
  }));
  setAuthClasses(true);
  renderUserProfile();
  initializeDashboardApp();
}

function clearAuthenticatedUser() {
  sessionStorage.removeItem(authSessionStorageKey);
  setAuthClasses(false);
  renderUserProfile();
  document.querySelector("#loginPassword").value = "";
  setLoginMessage("已退出登录，请重新输入账号密码。");
  setTimeout(() => document.querySelector("#loginUsername").focus(), 0);
}

function renderUserProfile() {
  const user = getAuthenticatedUser();
  const importedUser = user?.username
    ? allLoginUsers().find((item) => normalizeCredential(item.username).toLowerCase() === normalizeCredential(user.username).toLowerCase())
    : null;
  const displayNameTarget = document.querySelector("#userDisplayName");
  const positionTarget = document.querySelector("#userPosition");

  if (!displayNameTarget || !positionTarget) {
    return;
  }

  displayNameTarget.textContent = importedUser?.displayName || user?.displayName || user?.username || "--";
  positionTarget.textContent = importedUser?.role || user?.role || "授权用户";
}

function importedUserFromRow(row) {
  const normalizedRow = Object.fromEntries(
    Object.entries(row).map(([key, value]) => [String(key).trim().toLowerCase(), value])
  );
  const username = normalizeCredential(
    normalizedRow.username
    || normalizedRow.user
    || normalizedRow.account
    || normalizedRow["用户名"]
    || normalizedRow["用户"]
    || normalizedRow["账号"]
  );
  const password = normalizeCredential(
    normalizedRow.password
    || normalizedRow.pass
    || normalizedRow["密码"]
  );

  if (!username || !password) {
    return null;
  }

  return {
    username,
    password,
    displayName: normalizeCredential(normalizedRow.name || normalizedRow.displayname || normalizedRow["名称"] || normalizedRow["姓名"]) || username,
    role: normalizeCredential(normalizedRow.role || normalizedRow.position || normalizedRow["职位"] || normalizedRow["角色"]) || "user"
  };
}

async function mergeImportedUsers(nextUsers) {
  const userMap = new Map();
  getImportedUsers().forEach((user) => userMap.set(user.username.toLowerCase(), user));
  nextUsers.forEach((user) => userMap.set(user.username.toLowerCase(), user));
  const mergedUsers = [...userMap.values()];
  return setImportedUsers(mergedUsers);
}

async function importUsersFromExcel(file) {
  if (!file) {
    return;
  }

  if (!window.XLSX) {
    document.querySelector("#userImportStatus").textContent = "Excel 解析库未加载，请检查 assets/xlsx.full.min.js。";
    return;
  }

  const data = await file.arrayBuffer();
  const workbook = XLSX.read(data, { type: "array" });
  const firstSheetName = workbook.SheetNames[0];
  const rows = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName], { defval: "" });
  const importedUsers = rows.map(importedUserFromRow).filter(Boolean);

  if (!importedUsers.length) {
    document.querySelector("#userImportStatus").textContent = "未找到用户数据，请使用 序号/名称/职位/用户名/密码 表头。";
    return;
  }

  const mergedUsers = await mergeImportedUsers(importedUsers);
  const storageLabel = authUsersBackendAvailable ? "后台" : "本机";
  document.querySelector("#userImportStatus").textContent = `已导入 ${importedUsers.length} 位用户，${storageLabel}共 ${mergedUsers.length} 位授权用户。`;
  setLoginMessage("用户导入成功，可以直接登录。", "success");
}

function normalizedSheetRow(row) {
  return Object.fromEntries(
    Object.entries(row).map(([key, value]) => [String(key).trim().toLowerCase(), value])
  );
}

function sheetCell(row, aliases) {
  const normalizedRow = normalizedSheetRow(row);
  for (const alias of aliases) {
    const value = normalizedRow[String(alias).trim().toLowerCase()];
    if (value !== undefined && value !== null && String(value).trim() !== "") {
      return value;
    }
  }
  return "";
}

function normalizeProductKey(value) {
  const key = String(value ?? "").trim();
  const aliases = {
    "1180": "magnus1180",
    "1180 magnus": "magnus1180",
    "1180 magnus or table": "magnus1180",
    "1180页面": "magnus1180",
    "magnus": "magnus1180",
    "magnus1180": "magnus1180",
    "tegris": "tegris",
    "tegris dashboard": "tegris",
    "tegris页面": "tegris",
    "ic": "icMic",
    "ic mic": "icMic",
    "ic-mic": "icMic",
    "ic mic dashboard": "icMic",
    "ic-mic页面": "icMic",
    "icmic": "icMic",
    "icMic": "icMic"
  };
  return aliases[key.toLowerCase()] || key;
}

function normalizeLineKey(value) {
  const key = String(value ?? "").trim();
  return key && key.toLowerCase() !== "all" && key !== "全部" ? key.toLowerCase() : "";
}

function normalizeModelKey(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/-/g, "");
}

function canonicalProvinceName(value) {
  const raw = String(value ?? "").trim();
  if (!raw) {
    return "";
  }

  return provinceNames.find((province) => province === raw)
    || provinceNames.find((province) => province.replace(/省|市|壮族自治区|回族自治区|维吾尔自治区|自治区/g, "") === raw)
    || provinceNames.find((province) => province.includes(raw) || raw.includes(province.replace(/省|市|壮族自治区|回族自治区|维吾尔自治区|自治区/g, "")))
    || raw;
}

function numberCell(row, aliases) {
  const value = Number(sheetCell(row, aliases));
  return Number.isFinite(value) ? value : 0;
}

function dateTextCell(row, aliases) {
  const value = sheetCell(row, aliases);
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }
  return String(value ?? "").trim();
}

function rowsFromSheet(workbook, sheetName) {
  const sheet = workbook.Sheets[sheetName];
  return sheet ? XLSX.utils.sheet_to_json(sheet, { defval: "", cellDates: true }) : [];
}

function excelDateValue(row, aliases) {
  const value = sheetCell(row, aliases);
  if (value instanceof Date) {
    return value;
  }

  const text = String(value ?? "").trim();
  if (!text) {
    return null;
  }

  const normalized = text.replace(/\//g, "-");
  const parsed = new Date(normalized);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function isoDate(date) {
  return date ? date.toISOString().slice(0, 10) : "";
}

function monthKey(date) {
  return date ? isoDate(date).slice(0, 7) : "";
}

function yearKey(date) {
  return date ? isoDate(date).slice(0, 4) : "";
}

function dateSortValue(record) {
  return (record.installDate || record.salesDate || new Date(0)).getTime();
}

function dashboardRowsFromSheet(workbook, sheetName, productKey) {
  return rowsFromSheet(workbook, sheetName)
    .map((row) => {
      const productModel = String(sheetCell(row, ["型号选择", "型号", "productModel", "产品型号"])).trim();
      const installProvince = canonicalProvinceName(sheetCell(row, ["装机省份", "省份", "installProvince"]));
      const terminalUser = String(sheetCell(row, ["终端用户", "用户", "医院", "客户", "hospitalName"])).trim();
      const quantity = numberCell(row, ["数量", "装机量", "quantity", "value"]) || 1;

      if (!productModel || !installProvince || !terminalUser || quantity <= 0) {
        return null;
      }

      return {
        serialNo: String(sheetCell(row, ["装机编号", "Serial_No", "serialNo", "序列号", "SN"])).trim(),
        productKey,
        productModel,
        modelKey: normalizeModelKey(productModel),
        quantity,
        configDescription: String(sheetCell(row, ["配置描述", "配置", "描述", "configuration"])).trim(),
        installProvince,
        terminalUser,
        channelName: String(sheetCell(row, ["销售渠道", "渠道", "channelName"])).trim() || "未填写渠道",
        salesName: String(sheetCell(row, ["销售", "销售姓名", "salesName"])).trim() || "未填写销售",
        salesDate: excelDateValue(row, ["销售时间", "销售日期", "orderDate", "salesDate"]),
        installDate: excelDateValue(row, ["装机时间", "装机日期", "installDate"]),
        warrantyExpireDate: excelDateValue(row, ["保修过期时间", "保修到期", "warrantyExpireDate"])
      };
    })
    .filter(Boolean);
}

function dashboardRowsFromUnifiedSheet(workbook) {
  return rowsFromSheet(workbook, "装机数据")
    .map((row) => {
      const productKey = normalizeProductKey(sheetCell(row, ["产品", "产品页面", "product", "productKey"]));
      const productModel = String(sheetCell(row, ["型号", "型号选择", "productModel", "产品型号"])).trim();
      const installProvince = canonicalProvinceName(sheetCell(row, ["省份", "装机省份", "installProvince"]));
      const terminalUser = String(sheetCell(row, ["最终客户", "终端用户", "用户", "医院", "客户", "hospitalName"])).trim();
      const quantity = numberCell(row, ["数量", "装机量", "quantity", "value"]) || 1;

      if (!productKey || !productModel || !installProvince || !terminalUser || quantity <= 0) {
        return null;
      }

      return {
        serialNo: String(sheetCell(row, ["装机编号", "Serial_No", "serialNo", "序列号", "SN"])).trim(),
        productKey,
        productModel,
        modelKey: normalizeModelKey(productModel),
        quantity,
        configDescription: String(sheetCell(row, ["配置", "配置描述", "描述", "configuration"])).trim(),
        installProvince,
        terminalUser,
        channelName: String(sheetCell(row, ["销售渠道", "渠道", "channelName"])).trim() || "未填写渠道",
        salesName: String(sheetCell(row, ["销售", "销售姓名", "salesName"])).trim() || "未填写销售",
        salesDate: excelDateValue(row, ["订单时间", "销售时间", "销售日期", "orderDate", "salesDate"]),
        installDate: excelDateValue(row, ["装机时间", "装机日期", "installDate"]),
        warrantyExpireDate: excelDateValue(row, ["保修过期时间", "保修到期", "warrantyExpireDate"])
      };
    })
    .filter(Boolean);
}

function sumRecords(records) {
  return records.reduce((sum, record) => sum + record.quantity, 0);
}

function topGroupedRecords(records, keyGetter, provinceGetter) {
  const map = new Map();
  records.forEach((record) => {
    const key = keyGetter(record);
    if (!key) {
      return;
    }
    const item = map.get(key) || { name: key, province: provinceGetter(record), value: 0 };
    item.value += record.quantity;
    map.set(key, item);
  });

  return [...map.values()]
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);
}

function latestRecord(records) {
  return [...records].sort((a, b) => dateSortValue(b) - dateSortValue(a))[0];
}

function generatedProvinceData(records) {
  const map = new Map();
  records.forEach((record) => {
    const item = map.get(record.installProvince) || {
      name: record.installProvince,
      value: 0,
      latestSite: record.terminalUser,
      latestDate: isoDate(record.installDate || record.salesDate),
      coord: provinceCoordinates[record.installProvince] || [104.2, 35.8],
      latestTime: 0
    };
    item.value += record.quantity;

    const time = dateSortValue(record);
    if (time >= item.latestTime) {
      item.latestSite = record.terminalUser;
      item.latestDate = isoDate(record.installDate || record.salesDate);
      item.latestTime = time;
    }
    map.set(record.installProvince, item);
  });

  return [...map.values()]
    .sort((a, b) => b.value - a.value)
    .map(({ latestTime, ...item }) => item);
}

function generatedUpdates(records) {
  return [...records]
    .sort((a, b) => dateSortValue(b) - dateSortValue(a))
    .slice(0, 6)
    .map((record) => {
      const date = record.installDate || record.salesDate;
      const dateLabel = date ? isoDate(date).slice(5) : "--";
      const config = record.configDescription ? `（${record.configDescription}）` : "";
      return {
        date: dateLabel,
        status: record.installDate ? "装机" : "签约",
        text: `${record.terminalUser} 完成 ${record.productModel}${config} ${record.quantity} 台`
      };
    });
}

function generatedMonthlyTrend(records) {
  const datedRecords = records.filter((record) => record.installDate || record.salesDate);
  const endDate = latestRecord(datedRecords)?.installDate || latestRecord(datedRecords)?.salesDate || new Date();
  const months = [];
  for (let index = 11; index >= 0; index -= 1) {
    const date = new Date(endDate.getFullYear(), endDate.getMonth() - index, 1);
    months.push(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`);
  }

  const totals = new Map(months.map((month) => [month, 0]));
  datedRecords.forEach((record) => {
    const key = monthKey(record.installDate || record.salesDate);
    if (totals.has(key)) {
      totals.set(key, totals.get(key) + record.quantity);
    }
  });

  return months.map((month) => ({ month, installed: totals.get(month) || 0 }));
}

function generatedYearlyTrend(records) {
  const datedRecords = records.filter((record) => record.installDate || record.salesDate);
  const endYear = Number(yearKey(latestRecord(datedRecords)?.installDate || latestRecord(datedRecords)?.salesDate)) || new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, index) => String(endYear - 4 + index));
  const totals = new Map(years.map((year) => [year, 0]));
  datedRecords.forEach((record) => {
    const key = yearKey(record.installDate || record.salesDate);
    if (totals.has(key)) {
      totals.set(key, totals.get(key) + record.quantity);
    }
  });

  return years.map((year) => ({ year, installed: totals.get(year) || 0 }));
}

function generatedQuarterUnits(records) {
  const datedRecords = records.filter((record) => record.installDate || record.salesDate);
  const endDate = latestRecord(datedRecords)?.installDate || latestRecord(datedRecords)?.salesDate;
  if (!endDate) {
    return 0;
  }

  const quarter = Math.floor(endDate.getMonth() / 3);
  return datedRecords
    .filter((record) => {
      const date = record.installDate || record.salesDate;
      return date.getFullYear() === endDate.getFullYear() && Math.floor(date.getMonth() / 3) === quarter;
    })
    .reduce((sum, record) => sum + record.quantity, 0);
}

function buildDashboardDataFromRecords(baseDashboard, records) {
  const dashboard = {
    ...baseDashboard,
    provinceData: generatedProvinceData(records),
    users: topGroupedRecords(records, (record) => record.terminalUser, (record) => record.installProvince),
    partners: topGroupedRecords(records, (record) => record.channelName, (record) => record.installProvince),
    updates: generatedUpdates(records),
    monthlyTrend: generatedMonthlyTrend(records),
    yearlyTrend: generatedYearlyTrend(records),
    totalUnits: sumRecords(records),
    quarterUnits: generatedQuarterUnits(records),
    sourceRecords: records.map((record) => ({
      ...record,
      salesDate: isoDate(record.salesDate),
      installDate: isoDate(record.installDate),
      warrantyExpireDate: isoDate(record.warrantyExpireDate)
    }))
  };

  dashboard.productLineData = {};
  (baseDashboard.productLineOptions || [])
    .filter((option) => option.value !== "all")
    .forEach((option) => {
      const optionModelKey = normalizeModelKey(option.label);
      const lineRecords = records.filter((record) => record.modelKey === optionModelKey || normalizeModelKey(record.productModel) === normalizeModelKey(option.value));
      dashboard.productLineData[option.value] = buildDashboardDataFromRecords({ ...baseDashboard, productLineOptions: [] }, lineRecords);
    });

  return dashboard;
}

function importDashboardDataWorkbook(workbook) {
  const nextDashboards = cloneDashboardData(dashboards);
  const unifiedRecords = dashboardRowsFromUnifiedSheet(workbook);

  if (unifiedRecords.length) {
    Object.keys(nextDashboards).forEach((productKey) => {
      const records = unifiedRecords.filter((record) => record.productKey === productKey);
      if (records.length) {
        nextDashboards[productKey] = buildDashboardDataFromRecords(nextDashboards[productKey], records);
      }
    });
    return nextDashboards;
  }

  const sheetMap = [
    ["magnus1180", "1180用户列表"],
    ["tegris", "Tegris用户列表"],
    ["icMic", "IC-MIC用户列表"]
  ];

  sheetMap.forEach(([productKey, sheetName]) => {
    const records = dashboardRowsFromSheet(workbook, sheetName, productKey);
    if (records.length && nextDashboards[productKey]) {
      nextDashboards[productKey] = buildDashboardDataFromRecords(nextDashboards[productKey], records);
    }
  });

  return nextDashboards;
}

async function importDashboardDataFromExcel(file) {
  if (!file) {
    return;
  }

  if (!window.XLSX) {
    setLoginMessage("Excel 解析库未加载，请检查 assets/xlsx.full.min.js。");
    return;
  }

  const button = document.querySelector("#dashboardExcelButton");
  button.textContent = "正在导入...";
  const data = await file.arrayBuffer();
  const workbook = XLSX.read(data, { type: "array", cellDates: true });
  const nextDashboards = importDashboardDataWorkbook(workbook);
  await saveDashboardData(nextDashboards);
  renderDashboard();
  button.textContent = dashboardDataBackendAvailable ? "导入完成" : "已导入本页";
  setTimeout(() => {
    button.textContent = "导入装机数据";
  }, 1800);
}

async function initializeAuth() {
  await loadImportedUsers();
  await loadDashboardData();

  const loadedUsers = getImportedUsers().length;
  document.querySelector("#userImportStatus").textContent = loadedUsers
    ? `已加载 ${loadedUsers} 位${authUsersBackendAvailable ? "后台" : "本机"}授权用户。`
    : "请导入授权用户 Excel 后登录。";

  document.querySelector("#loginForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const user = findLoginUser(
      document.querySelector("#loginUsername").value,
      document.querySelector("#loginPassword").value
    );

    if (!user) {
      setLoginMessage("用户名或密码不正确。");
      return;
    }

    setLoginMessage("登录成功，正在进入看板。", "success");
    setAuthenticatedUser(user);
  });

  document.querySelector("#userExcelInput").addEventListener("change", (event) => {
    importUsersFromExcel(event.target.files[0]).catch(() => {
      document.querySelector("#userImportStatus").textContent = "导入失败，请确认文件格式为 .xlsx、.xls 或 .csv。";
    }).finally(() => {
      event.target.value = "";
    });
  });

  document.querySelector("#dashboardExcelButton").addEventListener("click", () => {
    document.querySelector("#dashboardExcelInput").click();
  });

  document.querySelector("#dashboardExcelInput").addEventListener("change", (event) => {
    importDashboardDataFromExcel(event.target.files[0]).catch(() => {
      const button = document.querySelector("#dashboardExcelButton");
      button.textContent = "导入失败";
      setTimeout(() => {
        button.textContent = "导入装机数据";
      }, 1800);
    }).finally(() => {
      event.target.value = "";
    });
  });

  document.querySelector("#logoutButton").addEventListener("click", clearAuthenticatedUser);

  if (sessionStorage.getItem(authSessionStorageKey)) {
    setAuthClasses(true);
    renderUserProfile();
    initializeDashboardApp();
  } else {
    setAuthClasses(false);
    renderUserProfile();
    setTimeout(() => document.querySelector("#loginUsername").focus(), 0);
  }
}

function currentDashboard() {
  return dashboards[currentDashboardKey];
}

function currentProductLine() {
  return currentDashboard().productLineOptions?.find((line) => line.value === currentProductLineKey);
}

function lineAdjustedValue(value, productLine) {
  if (productLine?.ratio) {
    return Math.max(1, Math.round(value * productLine.ratio));
  }

  if (productLine?.value === "s600") {
    return Math.max(1, Math.round(value * 0.62));
  }

  if (productLine?.value === "novito") {
    return Math.max(1, value - Math.max(1, Math.round(value * 0.62)));
  }

  return value;
}

function dashboardLinePrefix(dashboard) {
  return dashboard.title
    .replace(" Dashboard 装机看板", "")
    .replace(" 装机看板", "");
}

function productLineTotalUnitsLabel(dashboard, lineLabel) {
  return (dashboard.lineTotalUnitsLabelTemplate || "台 {line} 设备").replace("{line}", lineLabel);
}

function currentDashboardData() {
  const dashboard = currentDashboard();
  const productLine = currentProductLine();

  if (!productLine || productLine.value === "all") {
    return dashboard;
  }

  const lineLabel = productLine.label;
  const linePrefix = dashboardLinePrefix(dashboard);
  const lineData = dashboard.productLineData?.[productLine.value];

  if (lineData) {
    return {
      ...dashboard,
      ...lineData,
      title: `${linePrefix} ${lineLabel} Dashboard 装机看板`,
      rankingTitle: `${linePrefix} ${lineLabel} 用户排名`,
      modalTitle: `${linePrefix} ${lineLabel} 项目录入与更新`,
      totalUnitsLabel: productLineTotalUnitsLabel(dashboard, lineLabel)
    };
  }

  return {
    ...dashboard,
    title: `${linePrefix} ${lineLabel} Dashboard 装机看板`,
    rankingTitle: `${linePrefix} ${lineLabel} 用户排名`,
    modalTitle: `${linePrefix} ${lineLabel} 项目录入与更新`,
    totalUnitsLabel: productLineTotalUnitsLabel(dashboard, lineLabel),
    provinceData: dashboard.provinceData.map((item) => ({
      ...item,
      value: lineAdjustedValue(item.value, productLine),
      latestSite: `${item.latestSite} ${lineLabel} 项目`
    })),
    users: dashboard.users.map((item) => ({
      ...item,
      value: lineAdjustedValue(item.value, productLine)
    })),
    partners: dashboard.partners.map((item) => ({
      ...item,
      value: lineAdjustedValue(item.value, productLine)
    })),
    updates: dashboard.updates.map((item) => ({
      ...item,
      text: item.text.replace("IC MIC", lineLabel).replace("IC 产线", `${lineLabel} 产线`).replace("MIC 设备", `${lineLabel} 设备`)
    })),
    monthlyTrend: dashboard.monthlyTrend.map((item) => ({
      ...item,
      installed: lineAdjustedValue(item.installed, productLine)
    })),
    yearlyTrend: dashboard.yearlyTrend.map((item) => ({
      ...item,
      installed: lineAdjustedValue(item.installed, productLine)
    }))
  };
}

function projectStorageKey() {
  return `getinge-${currentDashboardKey}-projects-v1`;
}

function renderDashboardChrome() {
  const dashboard = currentDashboardData();
  document.title = `Getinge SW China ${dashboard.title}`;
  document.querySelector("#dashboardTitle").textContent = dashboard.title;
  document.querySelector("#userRankingTitle").textContent = dashboard.rankingTitle;
  document.querySelector("#projectModalTitle").textContent = dashboard.modalTitle;
  document.querySelector("#totalUnitsLabel").textContent = dashboard.totalUnitsLabel;
  document.querySelector("#productVisual").setAttribute("aria-label", dashboard.visual.alt);

  const visual = document.querySelector("#productVisual");
  if (dashboard.visual.type === "image") {
    visual.classList.remove("product-visual--system");
    visual.innerHTML = `<img src="${dashboard.visual.src}" alt="${dashboard.visual.alt}" />`;
  } else {
    visual.classList.add("product-visual--system");
    visual.innerHTML = `
      <div class="tegris-visual" aria-hidden="true">
        <span class="tegris-screen"></span>
        <span class="tegris-link"></span>
        <span class="tegris-console"></span>
        <div class="tegris-tags">
          ${dashboard.visual.tags.map((tag) => `<b>${tag}</b>`).join("")}
        </div>
      </div>
    `;
  }
}

function renderKpis() {
  const dashboard = currentDashboardData();
  const totalUnits = dashboard.totalUnits ?? dashboard.provinceData.reduce((sum, item) => sum + item.value, 0);
  const quarterUnits = dashboard.quarterUnits ?? dashboard.updates.length + Math.round(totalUnits * 0.14);

  document.querySelector("#totalUnits").textContent = formatNumber.format(totalUnits);
  document.querySelector("#coveredProvinces").textContent = dashboard.provinceData.length;
  document.querySelector("#quarterUnits").textContent = quarterUnits;
  document.querySelector("#partnerCount").textContent = dashboard.partners.length;
}

function renderRanking(targetId, items) {
  const target = document.querySelector(targetId);

  if (!items.length) {
    target.innerHTML = `<div class="project-result__meta">暂无数据</div>`;
    return;
  }

  const maxValue = Math.max(...items.map((item) => item.value));

  target.innerHTML = items
    .map((item, index) => {
      const width = Math.max(8, Math.round((item.value / maxValue) * 100));

      return `
        <article class="ranking-item">
          <span class="rank-no">${index + 1}</span>
          <div class="ranking-body">
            <div class="ranking-name-row">
              <span class="ranking-name" title="${item.name}">${item.name}</span>
              <span class="ranking-province">${item.province}</span>
            </div>
            <div class="bar-shell" aria-hidden="true">
              <div class="bar-fill" style="--bar-width: ${width}%"></div>
            </div>
          </div>
          <strong class="ranking-value">${item.value}</strong>
        </article>
      `;
    })
    .join("");
}

function renderTicker() {
  const track = document.querySelector("#newsTicker");
  const updates = currentDashboardData().updates;
  if (!updates.length) {
    track.innerHTML = `
      <div class="ticker-item">
        <span class="ticker-time">--</span>
        <span class="ticker-status">暂无</span>
        <span>当前产品暂无装机记录</span>
      </div>
    `;
    return;
  }

  const items = [...updates, ...updates]
    .map(
      (item) => `
        <div class="ticker-item">
          <span class="ticker-time">${item.date}</span>
          <span class="ticker-status">${item.status}</span>
          <span>${item.text}</span>
        </div>
      `
    )
    .join("");

  track.innerHTML = items;
}

function renderTrendChart() {
  const monthlyTrend = currentDashboardData().monthlyTrend;
  const target = document.querySelector("#installTrend");
  trendChart = trendChart || echarts.init(target);
  const trendLine = monthlyTrend.map((item, index, source) => {
    const windowItems = source.slice(Math.max(0, index - 2), index + 1);
    const average = windowItems.reduce((sum, current) => sum + current.installed, 0) / windowItems.length;
    return Number(average.toFixed(1));
  });

  trendChart.setOption({
    grid: {
      top: 34,
      right: 10,
      bottom: 34,
      left: 30
    },
    tooltip: {
      trigger: "axis",
      borderWidth: 0,
      backgroundColor: "rgba(16, 32, 61, 0.94)",
      textStyle: { color: "#fff" },
      axisPointer: { type: "shadow" },
      formatter(items) {
        const year = items[0]?.axisValue || "";
        const lines = items.map((item) => `${item.marker}${item.seriesName}：${item.value} 台`);
        return `<strong>${year}</strong><br/>${lines.join("<br/>")}`;
      }
    },
    legend: {
      top: 0,
      right: 0,
      itemWidth: 10,
      itemHeight: 8,
      textStyle: {
        color: brandColors.midnight,
        fontSize: 11
      }
    },
    xAxis: {
      type: "category",
      data: monthlyTrend.map((item) => item.month.slice(5)),
      axisTick: { show: false },
      axisLine: { lineStyle: { color: brandColors.oat } },
      axisLabel: {
        color: brandColors.midnight,
        fontSize: 11,
        interval: 1
      }
    },
    yAxis: {
      type: "value",
      minInterval: 1,
      splitLine: { lineStyle: { color: "#eee9e8" } },
      axisLabel: {
        color: brandColors.midnight,
        fontSize: 11
      }
    },
    series: [
      {
        name: "月度新增",
        type: "bar",
        barWidth: 12,
        data: monthlyTrend.map((item) => item.installed),
        itemStyle: {
          color: brandColors.ocean,
          borderRadius: [4, 4, 0, 0]
        }
      },
      {
        name: "3月均线",
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 5,
        data: trendLine,
        lineStyle: {
          width: 3,
          color: brandColors.blue
        },
        itemStyle: {
          color: brandColors.blue,
          borderColor: brandColors.white,
          borderWidth: 2
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(24, 39, 74, 0.18)" },
              { offset: 1, color: "rgba(24, 39, 74, 0.02)" }
            ]
          }
        }
      }
    ]
  }, true);
}

function renderYearTrendChart() {
  const yearlyTrend = currentDashboardData().yearlyTrend || [];
  const target = document.querySelector("#yearInstallTrend");
  yearTrendChart = yearTrendChart || echarts.init(target);
  const maxValue = Math.max(1, ...yearlyTrend.map((item) => item.installed));

  yearTrendChart.setOption({
    grid: {
      top: 24,
      right: 12,
      bottom: 32,
      left: 34
    },
    tooltip: {
      trigger: "axis",
      borderWidth: 0,
      backgroundColor: "rgba(16, 32, 61, 0.94)",
      textStyle: { color: "#fff" },
      axisPointer: { type: "shadow" },
      formatter(items) {
        const item = items[0];
        return `<strong>${item.axisValue}</strong><br/>${item.marker}年度新增：${item.value} 台`;
      }
    },
    xAxis: {
      type: "category",
      data: yearlyTrend.map((item) => item.year),
      axisTick: { show: false },
      axisLine: { lineStyle: { color: brandColors.oat } },
      axisLabel: {
        color: brandColors.midnight,
        fontSize: 11
      }
    },
    yAxis: {
      type: "value",
      minInterval: 1,
      max: Math.ceil(maxValue * 1.18),
      splitLine: { lineStyle: { color: "#eee9e8" } },
      axisLabel: {
        color: brandColors.midnight,
        fontSize: 11
      }
    },
    series: [
      {
        name: "年度新增",
        type: "bar",
        barWidth: 22,
        data: yearlyTrend.map((item) => item.installed),
        itemStyle: {
          borderRadius: [5, 5, 0, 0],
          color(params) {
            const colors = [brandColors.oat, brandColors.ocean, brandColors.grass, brandColors.sun, brandColors.blue];
            return colors[Math.min(params.dataIndex, colors.length - 1)];
          }
        },
        label: {
          show: true,
          position: "top",
          color: brandColors.blue,
          fontSize: 11,
          fontWeight: 700
        }
      }
    ]
  }, true);
}

function latestScatterData() {
  return currentDashboardData().provinceData.map((item) => ({
    name: item.latestSite,
    value: [...item.coord, item.value],
    province: item.name,
    latestDate: item.latestDate
  }));
}

function getStoredProjects() {
  try {
    return JSON.parse(localStorage.getItem(projectStorageKey())) || [];
  } catch {
    return [];
  }
}

function setStoredProjects(projects) {
  localStorage.setItem(projectStorageKey(), JSON.stringify(projects));
}

function defaultProductModel() {
  const dashboard = currentDashboard();
  const productLineLabel = currentProductLine()?.label;
  if (
    currentProductLineKey !== "all" &&
    productLineLabel &&
    dashboard.productModels.includes(productLineLabel)
  ) {
    return productLineLabel;
  }

  return dashboard.productModels[0];
}

function getProjectFormData() {
  const data = {};
  projectFields.forEach((field) => {
    data[field] = document.querySelector(`#${field}`).value.trim();
  });

  return data;
}

function setProjectFormData(project = {}) {
  document.querySelector("#projectId").value = project.id || "";
  projectFields.forEach((field) => {
    const fieldElement = document.querySelector(`#${field}`);
    fieldElement.value = project[field] || (field === "productModel" ? defaultProductModel() : "");
  });

  document.querySelector("#formStatus").textContent = project.id
    ? `正在更新：${project.hospitalName || project.serialNumber}`
    : "新建项目";
}

function projectMatchesSearch(project, keyword) {
  if (!keyword) {
    return true;
  }

  const haystack = projectFields.map((field) => project[field]).join(" ").toLowerCase();
  return haystack.includes(keyword.toLowerCase());
}

function renderProjectResults() {
  const projects = getStoredProjects().sort((a, b) => (b.updatedAt || "").localeCompare(a.updatedAt || ""));
  const keyword = document.querySelector("#projectSearchInput").value.trim();
  const activeId = document.querySelector("#projectId").value;
  const filtered = projects.filter((project) => projectMatchesSearch(project, keyword));
  const results = document.querySelector("#projectResults");

  document.querySelector("#projectSummary").textContent =
    `已录入 ${projects.length} 个项目${keyword ? `，匹配 ${filtered.length} 个` : ""}`;

  if (!filtered.length) {
    results.innerHTML = `
      <div class="project-result__meta">
        暂无匹配项目。保存新项目后，可按 SN、医院、PN、型号、渠道、销售或省份搜索。
      </div>
    `;
    return;
  }

  results.innerHTML = filtered
    .map((project) => `
      <button class="project-result ${project.id === activeId ? "active" : ""}" type="button" data-project-id="${project.id}">
        <span class="project-result__top">
          <strong class="project-result__hospital">${project.hospitalName || "未命名医院"}</strong>
          <span class="project-result__province">${project.installProvince || "未填省份"}</span>
        </span>
        <span class="project-result__meta">
          型号：${project.productModel || "-"}<br/>
          SN：${project.serialNumber || "-"}<br/>
          PN：${project.partNumber || "-"}<br/>
          渠道：${project.channelName || "-"} ｜ 销售：${project.salesName || "-"}
        </span>
      </button>
    `)
    .join("");
}

function populateProvinceOptions() {
  const select = document.querySelector("#installProvince");

  select.innerHTML = `<option value="">请选择省份</option>${provinceNames
    .map((province) => `<option value="${province}">${province}</option>`)
    .join("")}`;
}

function populateProductModelOptions() {
  const select = document.querySelector("#productModel");
  select.innerHTML = currentDashboard().productModels
    .map((model) => `<option value="${model}">${model}</option>`)
    .join("");
}

function renderProductLineSwitcher() {
  const control = document.querySelector("#productLineControl");
  const switcher = document.querySelector("#productLineSwitcher");
  const options = currentDashboard().productLineOptions || [];

  if (!options.length) {
    control.hidden = true;
    currentProductLineKey = "all";
    switcher.innerHTML = "";
    return;
  }

  control.hidden = false;
  if (!options.some((option) => option.value === currentProductLineKey)) {
    currentProductLineKey = options[0].value;
  }

  switcher.innerHTML = options
    .map((option) => `<option value="${option.value}">${option.label}</option>`)
    .join("");
  switcher.value = currentProductLineKey;
}

function showProjectModal() {
  const modal = document.querySelector("#projectModal");
  modal.hidden = false;
  document.body.classList.add("modal-open");
  renderProjectResults();
  setTimeout(() => document.querySelector("#projectSearchInput").focus(), 0);
}

function hideProjectModal() {
  document.querySelector("#projectModal").hidden = true;
  document.body.classList.remove("modal-open");
}

window.showProjectModal = showProjectModal;
window.hideProjectModal = hideProjectModal;

function saveProject(event) {
  event.preventDefault();

  const projects = getStoredProjects();
  const existingId = document.querySelector("#projectId").value;
  const data = getProjectFormData();
  const now = new Date().toISOString();
  const duplicate = projects.find(
    (project) => project.serialNumber === data.serialNumber && project.id !== existingId
  );

  if (duplicate) {
    document.querySelector("#formStatus").textContent = `SN 已存在：${duplicate.hospitalName || duplicate.serialNumber}`;
    return;
  }

  if (existingId) {
    const index = projects.findIndex((project) => project.id === existingId);
    if (index >= 0) {
      projects[index] = { ...projects[index], ...data, updatedAt: now };
      setStoredProjects(projects);
      setProjectFormData(projects[index]);
    }
  } else {
    const project = {
      id: `project-${Date.now()}`,
      dashboard: currentDashboardKey,
      ...data,
      createdAt: now,
      updatedAt: now
    };
    projects.push(project);
    setStoredProjects(projects);
    setProjectFormData(project);
  }

  renderProjectResults();
  document.querySelector("#formStatus").textContent = "项目已保存，可继续搜索或更新";
}

function initializeProjectRegistry() {
  populateProvinceOptions();
  populateProductModelOptions();

  document.querySelector("#openProjectModal").addEventListener("click", showProjectModal);
  document.querySelector("#closeProjectModal").addEventListener("click", hideProjectModal);
  document.querySelector("[data-close-project-modal]").addEventListener("click", hideProjectModal);
  document.querySelector("#projectSearchInput").addEventListener("input", renderProjectResults);
  document.querySelector("#projectForm").addEventListener("submit", saveProject);
  document.querySelector("#newProjectButton").addEventListener("click", () => {
    setProjectFormData();
    renderProjectResults();
    document.querySelector("#partNumber").focus();
  });
  document.querySelector("#projectResults").addEventListener("click", (event) => {
    const result = event.target.closest("[data-project-id]");
    if (!result) {
      return;
    }

    const project = getStoredProjects().find((item) => item.id === result.dataset.projectId);
    if (project) {
      setProjectFormData(project);
      renderProjectResults();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !document.querySelector("#projectModal").hidden) {
      hideProjectModal();
    }
  });
}

async function ensureChinaMap() {
  if (!chinaGeoJson) {
    chinaGeoJson = await fetch("assets/china.json").then((response) => response.json());
    echarts.registerMap("china", chinaGeoJson);
  }
}

async function renderMap() {
  await ensureChinaMap();
  const provinceData = currentDashboardData().provinceData;
  mapChart = mapChart || echarts.init(document.querySelector("#chinaMap"));
  const compact = window.innerWidth < 900;

  mapChart.setOption({
    color: [brandColors.ocean, brandColors.sun],
    tooltip: {
      trigger: "item",
      borderWidth: 0,
      backgroundColor: "rgba(16, 32, 61, 0.94)",
      textStyle: { color: "#fff" },
      formatter(params) {
        if (params.seriesType === "scatter") {
          return `
            <strong>${params.name}</strong><br/>
            省份：${params.data.province}<br/>
            最新日期：${params.data.latestDate}<br/>
            省内总装机：${params.value[2]} 台
          `;
        }

        const province = provinceData.find((item) => item.name === params.name);
        if (!province) {
          return `${params.name}<br/>暂无装机记录`;
        }

        return `
          <strong>${params.name}</strong><br/>
          总装机量：${province.value} 台<br/>
          最新场地：${province.latestSite}<br/>
          最新日期：${province.latestDate}
        `;
      }
    },
    visualMap: {
      min: 0,
      max: Math.max(1, ...provinceData.map((item) => item.value)),
      show: true,
      left: 16,
      bottom: 14,
      itemWidth: 14,
      itemHeight: 118,
      text: ["高装机", "低装机"],
      textStyle: {
        color: brandColors.midnight,
        fontSize: 11,
        fontWeight: 700
      },
      calculable: true,
      formatter(value) {
        return `${Math.round(value)} 台`;
      },
      inRange: {
        color: [
          brandColors.snow,
          brandColors.oat,
          brandColors.ocean,
          brandColors.grass,
          brandColors.sun,
          brandColors.berry,
          brandColors.blue
        ]
      }
    },
    geo: {
      map: "china",
      roam: true,
      zoom: 1.12,
      top: 24,
      bottom: 10,
      itemStyle: {
        areaColor: brandColors.snow,
        borderColor: brandColors.white,
        borderWidth: 1.25
      },
      emphasis: {
        label: { color: brandColors.blue, fontWeight: 700 },
        itemStyle: {
          areaColor: brandColors.sun,
          borderColor: brandColors.blue,
          borderWidth: 1.4
        }
      }
    },
    series: [
      {
        name: "总装机量",
        type: "map",
        map: "china",
        geoIndex: 0,
        data: provinceData.map(({ name, value }) => ({ name, value }))
      },
      {
        name: "最新装机场地",
        type: "scatter",
        coordinateSystem: "geo",
        symbolSize(value) {
          return compact ? Math.max(8, Math.min(15, value[2] + 2)) : Math.max(9, Math.min(22, value[2] + 5));
        },
        itemStyle: {
          color: brandColors.sun,
          borderColor: brandColors.white,
          borderWidth: 2,
          shadowBlur: 12,
          shadowColor: "rgba(243, 146, 0, 0.46)"
        },
        label: {
          show: !compact,
          formatter: "{b}",
          color: brandColors.blue,
          fontSize: 10,
          position: "right",
          backgroundColor: "rgba(255, 255, 255, 0.84)",
          padding: [3, 5],
          borderRadius: 4
        },
        labelLayout: {
          hideOverlap: true,
          moveOverlap: "shiftY"
        },
        emphasis: {
          scale: 1.12
        },
        data: latestScatterData()
      }
    ]
  }, true);
}

function renderDashboard() {
  renderProductLineSwitcher();
  const dashboard = currentDashboardData();
  renderDashboardChrome();
  renderKpis();
  renderRanking("#userRanking", dashboard.users);
  renderRanking("#partnerRanking", dashboard.partners);
  renderTrendChart();
  renderYearTrendChart();
  renderTicker();
  renderMap();
  populateProductModelOptions();
  setProjectFormData();
  renderProjectResults();
}

function initializeProductSwitcher() {
  const switcher = document.querySelector("#productSwitcher");
  switcher.addEventListener("change", (event) => {
    currentDashboardKey = event.target.value;
    currentProductLineKey = "all";
    renderDashboard();
  });

  document.querySelector("#productLineSwitcher").addEventListener("change", (event) => {
    currentProductLineKey = event.target.value;
    renderDashboard();
  });
}

window.addEventListener("resize", () => {
  trendChart?.resize();
  yearTrendChart?.resize();
  mapChart?.resize();
  renderMap();
});

function initializeDashboardApp() {
  if (dashboardInitialized) {
    setTimeout(() => {
      trendChart?.resize();
      yearTrendChart?.resize();
      mapChart?.resize();
      renderMap();
    }, 0);
    return;
  }

  dashboardInitialized = true;
  initializeProjectRegistry();
  initializeProductSwitcher();
  renderDashboard();
}

initializeAuth();
