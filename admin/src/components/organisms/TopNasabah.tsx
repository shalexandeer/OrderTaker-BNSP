import { User } from "lucide-react"

// Sample data for top customers
const topNasabahData = [
  { name: "Ahmad Rizky 1", transactions: 15, weight: 50 },
  { name: "Ahmad Rizky 2", transactions: 30, weight: 100 },
  { name: "Ahmad Rizky 3", transactions: 45, weight: 150 },
  { name: "Ahmad Rizky 4", transactions: 60, weight: 200 },
  { name: "Ahmad Rizky 5", transactions: 75, weight: 250 },
]

const TopNasabah = () => {
  return (
    <>
      <h3 className="font-display font-medium text-lg">Nasabah Teratas</h3>
      <div className="flex flex-col gap-4 mt-2">
        {topNasabahData.map((nasabah, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary/10 text-primary rounded-md">
                <User className="w-4 h-4 " />
              </div>
              <div>
                <h4 className="font-medium text-base">{nasabah.name}</h4>
                <p className="text-sm ">{nasabah.transactions} transaksi</p>
              </div>
            </div>
            <div className="font-medium text-lg">{nasabah.weight} kg</div>
          </div>
        ))}
      </div>
    </>
  )
}

export default TopNasabah
