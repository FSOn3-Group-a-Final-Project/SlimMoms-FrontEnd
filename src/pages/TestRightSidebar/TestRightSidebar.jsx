import RightSidebar from "../../components/rightSidebar/RightSidebar";

function TestRightSidebar() {
  const mockData = {
    date: "13.08.2023",
    left: 625,
    consumed: 2175,
    dailyRate: 2800,
    percentOfNormal: 78,
    notRecommended: ["Flour products", "Milk", "Red meat", "Smoked meat"],
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
      <RightSidebar
        date={mockData.date}
        left={mockData.left}
        consumed={mockData.consumed}
        dailyRate={mockData.dailyRate}
        percentOfNormal={mockData.percentOfNormal}
        notRecommended={mockData.notRecommended}
      />
    </div>
  );
}

export default TestRightSidebar;
