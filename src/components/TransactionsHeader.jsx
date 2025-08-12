import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { addTransaction } from "../api/transactions";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const TransactionsHeader = () => {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    transaction_date: "",
    account_number: "",
    account_holder_name: "",
    amount: "",
  });

  const [isOpenModal, setIsOpenModal] = useState(false);

  const mutation = useMutation({
    mutationFn: (data) => addTransaction(data),
    onSuccess: () => {
      setFormData({
        transaction_date: "",
        account_number: "",
        account_holder_name: "",
        amount: "",
      });
      queryClient.invalidateQueries(["transactions"]);
      setIsOpenModal(false);
    },
    onError: (error) => {
      console.error("Failed to add transaction:", error);
    },
  });

  const formatAccountNumber = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 12);
    const parts = [];
    for (let i = 0; i < digits.length; i += 4) {
      parts.push(digits.substring(i, i + 4));
    }
    return parts.join("-");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "account_number") {
      const formatted = formatAccountNumber(value);
      setFormData((prev) => ({
        ...prev,
        [name]: formatted,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const isFormValid = () => {
    const { transaction_date, account_number, account_holder_name, amount } =
      formData;
    const accountNumberValid = /^\d{4}-\d{4}-\d{4}$/.test(account_number);
    return (
      transaction_date.trim() !== "" &&
      accountNumberValid &&
      account_holder_name.trim() !== "" &&
      amount !== ""
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid()) return;
    mutation.mutate(formData);
  };

  return (
    <div className="flex gap-2">
      <h1 className="text-2xl">Transactions</h1>
      <Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
        <form>
          <DialogTrigger asChild>
            <Button>Add Transaction</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Transaction</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="transaction-date">Transaction Date</Label>
                <Input
                  id="transaction-date"
                  name="transaction_date"
                  type="date"
                  value={formData.transaction_date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="account-number">Account Number</Label>
                <Input
                  type="text"
                  id="account-number"
                  name="account_number"
                  value={formData.account_number}
                  onChange={handleChange}
                  maxLength={14}
                  placeholder="1234-5678-9012"
                  required
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="account-holder-name">Account Holder Name</Label>
                <Input
                  id="account-holder-name"
                  name="account_holder_name"
                  value={formData.account_holder_name}
                  placeholder="Jan Doe"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                onClick={handleSubmit}
                type="submit"
                disabled={mutation.isLoading || !isFormValid()}
              >
                {mutation.isLoading ? "Saving..." : "Submit"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
};

export default TransactionsHeader;
