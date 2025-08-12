import { Card } from "@/components/ui/card";

import "./App.css";

import { useQuery } from "@tanstack/react-query";

import TransactionsList from "./components/TransactionsList";
import TransactionsHeader from "./components/TransactionsHeader";

import { getAllTransactions } from "./api/transactions";

function App() {
  const { isPending, data: transactions } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const data = await getAllTransactions();
      console.log(data);
      return data;
    },
  });

  return (
    <Card className="w-full mx-auto p-4">
      <TransactionsHeader />

      {isPending ? (
        "Loading..."
      ) : (
        <TransactionsList transactions={transactions} />
      )}
    </Card>
  );
}

export default App;
