import { useRef, useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const amountInput = useRef();
  const [balance, setBalance] = useState(
    Number(localStorage.getItem("balance")) || 0,
  );
  const [transactions, setTransactions] = useState(
    JSON.parse(localStorage.getItem("transactions")) || [],
  );

  const Withdraw = () => {
    const amount = Number(amountInput.current.value);
    if (Number.isFinite(amount) && amount > 0 && amount <= balance) {
      let transaction = {
        beforeBalance: balance,
        afterBalance: balance - amount,
        amount: amount,
        type: "Withdraw",
      };
      let copy = [...transactions];
      copy.push(transaction);
      setTransactions(copy);
      localStorage.setItem("transactions", JSON.stringify(copy));
      setBalance(balance - amount);
      localStorage.setItem("balance", String(balance - amount));
      toast.success("Successful");
    } else {
      toast.error("Error");
    }
    amountInput.current.value = "";
  };

  const deposite = () => {
    const amount = Number(amountInput.current.value);
    if (Number.isFinite(amount) && amount > 0) {
      let transaction = {
        beforeBalance: balance,
        afterBalance: balance + amount,
        amount: amount,
        type: "Deposit",
      };
      let copy = [...transactions];
      copy.push(transaction);
      setTransactions(copy);
      localStorage.setItem("transactions", JSON.stringify(copy));
      setBalance(balance + amount);
      localStorage.setItem("balance", String(balance + amount));
      toast.success("Successful");
    } else {
      toast.error("Error");
    }
    amountInput.current.value = "";
  };

  const deleteItems = (i) => {
    let copy = [...transactions];
    copy.splice(i, 1);
    setTransactions(copy);
    localStorage.setItem("transactions", JSON.stringify(copy));
  };

  return (
    <>
      <div className="m-5">
        <h1 className="bg-green-600 flex justify-center mb-8 items-center max-w-[20%] m-auto p-3 rounded-2xl">
          Your Balance is : <span className="ml-3 text-3xl ">{balance}</span>
        </h1>
        <div className="text-center">
          <label>Enter Amount : </label>
          <input ref={amountInput} type="Enter Amount" className="input" />
          <button onClick={Withdraw} className="btn btn-error btn-soft ml-3">
            Withdraw
          </button>
          <button onClick={deposite} className="btn btn-success btn-soft ml-3">
            deposite
          </button>
        </div>
      </div>
      <div>
        <table className="table bg-gray-700 mt-8 capitalize text-center">
          <thead>
            <tr>
              <td>#</td>
              <td>before balance</td>
              <td>after balance</td>
              <td>amount</td>
              <td>type</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {transactions.map((el, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{el.beforeBalance}</td>
                  <td>{el.afterBalance}</td>
                  <td>{el.amount}</td>
                  <td>{el.type}</td>
                  <td><button  onClick={deleteItems} className="btn btn-error">Delete</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}