import history from "@/assets/history.svg";
import plus from "@/assets/plus.svg";
import arrow from "@/assets/arrow.svg";
import divide from "@/assets/divide.svg";
import world from "@/assets/world.svg";
import community from "@/assets/community.svg";
import { plans } from "@/appData";
import { Table, Typography } from '@/components';
import { Link } from "react-router-dom";
import clsx from "clsx";

const Membership = () => {
  const cards = [
    {
      img: divide,
      title: "Fee Discounts",
      description:
        "Reduce your transaction fees based on your staking tier, saving you money on every trade.",
    },
    {
      img: world,
      title: "Environmental Impact ",
      description:
        "Support sustainability initiatives and contribute to reducing global carbon emissions.",
    },
    {
      img: community,
      title: "Community Status",
      description:
        "Gain recognition in our community with exclusive badges and access to special events.",
    },
  ];
  
  // For bg of the Membership cards
  const bgColors = ["bg-white", "bg-[#A6B3B1]", "bg-[#4C6663]", "bg-[#C2A57B]"];

  // Transaction History columns configuration
  const transactionColumns = [
    {
      accessorKey: "date",
      header: "Date"
    },
    {
      accessorKey: "plan",
      header: "Plan"
    },
    {
      accessorKey: "type",
      header: "Type"
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => (
        <Typography variant="body2">
          {row.original.amount.toLocaleString()} XCB
        </Typography>
      )
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span className={clsx(
          "px-2 py-1 rounded-full text-xs",
          {
            "bg-green-600 text-white": row.original.status === "Confirmed",
            "bg-yellow-600 text-white": row.original.status === "Pending",
            "bg-blue-600 text-white": row.original.status === "Completed"
          }
        )}>
          {row.original.status}
        </span>
      )
    },
    {
      accessorKey: "tx",
      header: "Blockchain Tx",
      cell: ({ row }) => (
        <Typography variant="body2">
          <a 
            href={`https://etherscan.io/tx/${row.original.tx}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 underline"
          >
            {row.original.tx}
          </a>
        </Typography>
      )
    }
  ];

  // Enhanced transaction history data
  const transactionData = [
    {
      date: "2024-03-20",
      plan: "Gold",
      type: "Stake",
      amount: 5000000,
      status: "Confirmed",
      tx: "0x3a5f...e9d1"
    },
    {
      date: "2024-03-15",
      plan: "Gold",
      type: "Unstake",
      amount: 2500000,
      status: "Completed",
      tx: "0x4b2e...f8c2"
    },
    {
      date: "2024-03-10",
      plan: "Silver",
      type: "Stake",
      amount: 2500000,
      status: "Confirmed",
      tx: "0x6d9a...b4e3"
    },
    {
      date: "2024-03-05",
      plan: "Silver",
      type: "Reward",
      amount: 50000,
      status: "Confirmed",
      tx: "0x8f1c...a7d4"
    },
    {
      date: "2024-03-01",
      plan: "Bronze",
      type: "Stake",
      amount: 1000000,
      status: "Confirmed",
      tx: "0x2e7b...c9f5"
    }
  ];

  return (
    <div className="transition-all duration-fast">
      <div className="space-y-4 text-tbase">
        {/* ROW 1 - Balance */}
        <div className="space-y-4">
          <Typography variant="h4" className="border-b-2 border-[#363638] pb-2">
            Membership
          </Typography>
          
          <div className="border-[#D8D8D8] shadow-xl dark:border-[#363638] rounded-xl border p-4">
            <Typography variant="subtitle2" className="tracking-wide mb-3">
              TOTAL XCB BALANCE
            </Typography>
            
            <div className="grid gap-3 sm:flex justify-between items-center">
              <div>
                <Typography variant="h4" className="tracking-wide">
                  1,000,000 <span className="text-sm opacity-80">XCB</span>
                </Typography>
              </div>

              <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 px-3 py-2 text-sm text-white border dark:bg-[#141517] rounded-lg bg-[#A6B3B1] dark:border-[#363638] hover:bg-opacity-90 transition-colors">
                  <img src={history} alt="history" className="w-4 h-4" />
                  <span>History</span>
                </button>
                <Link 
                  to="/wallet/deposit" 
                  className="flex items-center justify-center gap-2 px-3 py-2 text-sm text-white border dark:bg-black rounded-lg bg-[#4C6663] dark:border-[#363638] hover:bg-opacity-90 transition-colors"
                >
                  <img src={plus} alt="plus" className="w-4 h-4" />
                  <span>Deposit</span>
                </Link>
              </div>
            </div>
            
            <Typography variant="body2" className="mt-3 text-tbase opacity-80">
              15.3% from last month
            </Typography>
          </div>
        </div>

        {/* Row 2 - Current Plan */}
        <div className="space-y-3">
          <Typography variant="h5">Your Current Membership Plan</Typography>
          
          <div className="border-[#363638] bg-[#2F2F2F] text-white rounded-xl shadow-xl border p-4">
            <Typography variant="subtitle1" className="tracking-wide mb-3 text-white">
              <span className="font-semibold">BRONZE</span> Plan
            </Typography>
            
            <div className="grid gap-3 sm:flex justify-between items-center">
              <Typography variant="body1" className="text-white">
                Staked: <span className="text-sm opacity-80 ml-1">1,000,000 XCB</span>
              </Typography>
              
              <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Typography variant="body2" className="text-white">
                  Manage Plan
                </Typography>
                <img src={arrow} alt="arrow" className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex items-center gap-4 mt-3">
              <div className="bg-[#949494] px-2 py-1 rounded-full">
                <Typography variant="caption" className="text-white">
                  5% Fee Discount
                </Typography>
              </div>
              <Typography variant="caption" className="text-white">
                Next review: May 15, 2025
              </Typography>
            </div>
          </div>
        </div>

        {/* ROW 3 - Available Plans */}
        <div className="space-y-3">
          <Typography variant="h5">Available Membership Plans</Typography>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {plans.map((plan, index) => (
              <div
                key={plan.id}
                className={`flex flex-col gap-3 border shadow-xl dark:bg-[#191919] dark:border-[#363638] rounded-xl p-4 ${
                  bgColors[index % bgColors.length]
                }`}
              >
                <div>
                  <img src={plan.image} alt={plan.name} className="w-12 h-12" />
                </div>
                
                <div className="space-y-2">
                  <Typography variant="h6">{plan.name}</Typography>
                  <Typography variant="h4">{plan.amount}</Typography>
                  <Typography variant="body2">{plan.tokenName} required</Typography>
                  <Typography variant="subtitle2">{plan.discount}</Typography>
                </div>

                <ul className="flex flex-col space-y-1 text-center">
                  {plan.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center">
                      <Typography variant="body2" className="text-center">
                        {benefit}
                      </Typography>
                    </li>
                  ))}
                </ul>
                
                <button className="mt-auto w-full py-2 px-3 rounded-lg bg-black text-white hover:bg-opacity-90 transition-all duration-300">
                  <Typography variant="caption" className="text-white">Choose Plan</Typography>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Row 4 - Benefits */}
        <div className="space-y-3">
          <Typography variant="h5">Benefits of Staking XCB</Typography>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-xl border dark:border-[#363638] p-4">
            {cards.map((card, index) => (
              <div
                key={index}
                className="border dark:border-[#363638] p-4 rounded-lg bg-[#A6B3B1] dark:bg-[#191919]"
              >
                <img src={card.img} alt={card.title} className="w-10 h-10 mb-3" />
                <Typography variant="subtitle2" className="mb-2">
                  {card.title}
                </Typography>
                <Typography variant="body2">
                  {card.description}
                </Typography>
              </div>
            ))}
          </div>
        </div>

        {/* Row 5 - Transaction History */}
        <div className="grid bg-secondary shadow-xl border rounded-xl p-4">
          <Table
            columns={transactionColumns}
            data={transactionData}
            showSearch
            showPageSize
            showDataFilter
            dateField="date"
            title="Transaction History"
            defaultPageSize={5}
          />
        </div>
      </div>
    </div>
  );
};

export default Membership;
