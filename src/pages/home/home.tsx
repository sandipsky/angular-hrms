
import { Card } from '../../components/card/card';
import { DoughnutChart } from '../../components/doughnut-chart/doughnut-chart';
import { LineChart } from '../../components/line-chart/line-chart';
import { transactionData } from "../../data/transactiondata";


const Home = () => {
  return (
    <div className="p-8 space-y-8">
      {/* Row 1: Cards */}
      <div className="flex space-x-4">
        <Card title="Balance" value="$5000" icon="💰" />
        <Card title="Total Income" value="$7000" icon="📈" />
        <Card title="Total Expense" value="$2000" icon="💸" />
      </div>

      {/* Row 2: Charts */}
      <div className="flex w-1/2">
        {/* <div className="flex-1 bg-white shadow-lg rounded-lg p-4 w-1/2">
          <h2 className="text-xl font-semibold mb-4">Monthly Expense Trends</h2>
          <LineChart />
        </div> */}
        <div className="flex-1 bg-white shadow-lg rounded-lg p-4 w-[500px]">
          <h2 className="text-xl font-semibold mb-4">Top 5 Expenses</h2>
          <DoughnutChart />
        </div>
      </div>

      {/* Row 3: Transaction Table */}
      <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b text-left">Date</th>
                            <th className="px-4 py-2 border-b text-left">Description</th>
                            <th className="px-4 py-2 border-b text-right">Amount</th>
                            <th className="px-4 py-2 border-b text-left">Type</th>
                            <th className="px-4 py-2 border-b text-left">Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactionData.map((transaction) => (
                            <tr key={transaction.id}>
                                <td className="px-4 py-2 border-b">{transaction.date}</td>
                                <td className="px-4 py-2 border-b">{transaction.description}</td>
                                <td className="px-4 py-2 border-b text-right">${transaction.amount.toFixed(2)}</td>
                                <td className="px-4 py-2 border-b">
                                    <span className={`px-2 py-1 rounded-full text-white ${transaction.type === "Income" ? "bg-green-500" : "bg-red-500"}`}>
                                        {transaction.type}
                                    </span>
                                </td>
                                <td className="px-4 py-2 border-b">{transaction.category}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    </div>
  );
};

export default Home;
