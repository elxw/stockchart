# for stock in sorted(["FNGU", "FNGD", "TQQQ", "SOXL", "SPY", "UDOW", "QQQ"]):
#   print("{ value: \"%s\", label: \"%s\" }," % (stock, stock))



stocks = ["AAPL", "AMZN", "BABA", "BAC", "CGC", "CRSP", "EDIT", "FB",
  "GE", "GOOG", "JD", "MU", "NTNX", "SHOP", "SQ", "TRXC", "V", "XXII", "IQ", "NVDA", "ABBV",
  "WM", "JNJ", "AMD", "TWTR", "SNAP", "SBUX", "JPM", "MSFT", "ALGN", "F", "CRM", "WM",
  "DPZ", "ISRG", "CSCO", "PFE", "INTC", "DAL", "XOM", "GM", "CMCSA", "PYPL", "GPRO",
  "ZNGA", "P"]

for stock in sorted(set(stocks)):
  print("{ value: \"%s\", label: \"%s\" }," % (stock, stock))