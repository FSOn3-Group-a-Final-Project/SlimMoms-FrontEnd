import { useState } from "react";
import Modal from "../../components/modal/Modal";
import DailyCalorieIntake from "../../components/dailyCalorieIntake/DailyCalorieIntake";
function TestModalPage() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Test Modal Sayfası</h2>
      <button onClick={handleOpen}>Test Et (Modal Aç)</button>

      <Modal isOpen={isOpen} onClose={handleClose}>
        <DailyCalorieIntake
          calories={2200}
          products={["Sugar", "White bread", "Red meat", "Milk"]}
        />
      </Modal>
    </div>
  );
}

export default TestModalPage;
