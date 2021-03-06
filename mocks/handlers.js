const { rest } = require("msw");

const API_BASE = "https://gasnow.gpumine.org/api";

const handlers = [
  rest.get(`${API_BASE}/stats`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        basefee: "162500000000",
        totalburn: "9230000000000000000000000",
        burn10m: "2000000000000000000",
        burn1h: "22000000000000000000",
        burn24h: "2000000000000000000000",
        gasfee24h: [
          {
            time: 1646910000,
            basefee: "80000000000",
            tip: "5000000000",
          },
          {
            time: 1646913600,
            basefee: "60000000000",
            tip: "4900000000",
          },
        ],
        gasfee7d: [
          {
            time: 1646197828,
            basefee: "80000000000",
            tip: "5000000000",
          },
        ],
        gasfee1m: [
          {
            time: 1646197828,
            basefee: "80000000000",
            tip: "5000000000",
          },
        ],
        eth: {
          usd: 2304.56,
          twd: 90000.06,
          cny: 90000.06,
          hkd: 90000.06,
          gbp: 90000.06,
        },
      })
    );
  }),
  rest.get(`${API_BASE}/gashistory`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        history: [
          {
            time: 1646168400,
            basefee: "80000000000",
            tip: "5000000000",
          },
        ],
      })
    );
  }),
  rest.get(`${API_BASE}/diff`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        history3m: [
          {
            time: 1646910000,
            difficulty: "12939227482888851",
            tip: "128000000000000000000",
          },
          {
            time: 1646913600,
            difficulty: "12939227482888777",
            tip: "126000000000000000000",
          },
          {
            time: 1646917200,
            difficulty: "12939227582888777",
            tip: "136000000000000000000",
          },
        ],
        history6m: [
          {
            time: 1646168400,
            difficulty: "12939227482888851",
            tip: "128000000000000000000",
          },
        ],
        history1y: [
          {
            time: 1646168400,
            difficulty: "12939227482888851",
            tip: "128000000000000000000",
          },
        ],
        totalhistory: [
          {
            time: 1646168400,
            difficulty: "12939227482888851",
            tip: "128000000000000000000",
          },
        ],
      })
    );
  }),
];

module.exports = handlers;
