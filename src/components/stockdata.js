export const stockOptions =
[
  { value: "AAPL", label: "AAPL" },
  { value: "ABBV", label: "ABBV" },
  { value: "ALGN", label: "ALGN" },
  { value: "AMD", label: "AMD" },
  { value: "AMZN", label: "AMZN" },
  { value: "BABA", label: "BABA" },
  { value: "BAC", label: "BAC" },
  { value: "CGC", label: "CGC" },
  { value: "CMCSA", label: "CMCSA" },
  { value: "CRM", label: "CRM" },
  { value: "CRSP", label: "CRSP" },
  { value: "CSCO", label: "CSCO" },
  { value: "DAL", label: "DAL" },
  { value: "DPZ", label: "DPZ" },
  { value: "EDIT", label: "EDIT" },
  { value: "F", label: "F" },
  { value: "FB", label: "FB" },
  { value: "GE", label: "GE" },
  { value: "GM", label: "GM" },
  { value: "GOOG", label: "GOOG" },
  { value: "GPRO", label: "GPRO" },
  { value: "INTC", label: "INTC" },
  { value: "IQ", label: "IQ" },
  { value: "ISRG", label: "ISRG" },
  { value: "JD", label: "JD" },
  { value: "JNJ", label: "JNJ" },
  { value: "JPM", label: "JPM" },
  { value: "MSFT", label: "MSFT" },
  { value: "MU", label: "MU" },
  { value: "NTNX", label: "NTNX" },
  { value: "NVDA", label: "NVDA" },
  { value: "P", label: "P" },
  { value: "PFE", label: "PFE" },
  { value: "PYPL", label: "PYPL" },
  { value: "SBUX", label: "SBUX" },
  { value: "SHOP", label: "SHOP" },
  { value: "SNAP", label: "SNAP" },
  { value: "SQ", label: "SQ" },
  { value: "T", label: "T" },
  { value: "TRXC", label: "TRXC" },
  { value: "TWTR", label: "TWTR" },
  { value: "V", label: "V" },
  { value: "WM", label: "WM" },
  { value: "XOM", label: "XOM" },
  { value: "XXII", label: "XXII" },
  { value: "ZNGA", label: "ZNGA" },
]


export const etfOptions =
[
  { value: "FNGU", label: "FNGU"},
  { value: "QQQ", label: "QQQ" },
  { value: "SOXL", label: "SOXL" },
  { value: "SPY", label: "SPY" },
  { value: "SPXU", label: "SPXU" },
  { value: "TQQQ", label: "TQQQ" },
  { value: "UDOW", label: "UDOW" },
]


export const groupedOptions = [
  {
    label: 'stocks',
    options: stockOptions,
  },
  {
    label: 'etfs',
    options: etfOptions,
  },
];