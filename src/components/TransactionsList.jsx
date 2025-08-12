import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TransactionsList = ({ transactions }) => {
  const statusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "settled":
        return "bg-green-500";
      case "failed":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Transaction Date</TableHead>
          <TableHead>Account Number</TableHead>
          <TableHead>Account Holder Name</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => {
          return (
            <TableRow key={Math.random()}>
              <TableCell>{transaction["Transaction Date"]}</TableCell>
              <TableCell>{transaction["Account Number"]}</TableCell>
              <TableCell>{transaction["Account Holder Name"]}</TableCell>
              <TableCell>{transaction["Amount"]}</TableCell>
              <TableCell
                className={statusColor(transaction["Status"].toLowerCase())}
              >
                {transaction["Status"]}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
export default TransactionsList;
