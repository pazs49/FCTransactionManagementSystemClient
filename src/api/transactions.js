const URL = "http://localhost:3000/api/v1/";

export const getAllTransactions = async () => {
  const response = await fetch(URL + "transactions");
  const data = await response.json();
  return data;
};

export const addTransaction = async (_transaction) => {
  const response = await fetch(URL + "transactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ transaction: _transaction }),
  });
  const data = await response.json();
  return data;
};
