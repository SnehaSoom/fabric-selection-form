import React, { useState } from "react";
import "./FabricOrderForm.css";

const FabricOrderForm = () => {
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [fabricName, setFabricName] = useState("");
  const [perPieceRequirement, setPerPieceRequirement] = useState(0.5);
  const [productionPerDay, setProductionPerDay] = useState(5);
  const [totalOrderQuantity, setTotalOrderQuantity] = useState(12000);
  const [unit, setUnit] = useState("M"); // Default unit
  const [processes, setProcesses] = useState("");
  const [stagesToSkip, setStagesToSkip] = useState(""); // Single value for dropdown
  const [colorQuantity, setColorQuantity] = useState([
    { color: "", quantity: "" },
  ]);
  const [chinaFabric, setChinaFabric] = useState(false);
  const [chinaFabricName, setChinaFabricName] = useState("");

  const handleColorChange = (index, field, value) => {
    const newColorQuantity = [...colorQuantity];
    newColorQuantity[index][field] = value;
    setColorQuantity(newColorQuantity);
  };

  const addColorQuantity = () => {
    setColorQuantity([...colorQuantity, { color: "", quantity: "" }]);
  };

  const handleStagesChange = (e) => {
    setStagesToSkip(e.target.value); // Update state with selected stage
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log({
      startDate,
      endDate,
      fabricName,
      perPieceRequirement,
      productionPerDay,
      totalOrderQuantity,
      unit,
      processes,
      stagesToSkip,
      colorQuantity,
      chinaFabric,
      chinaFabricName,
    });
  };

  return (
    <form className="fabric-order-form" onSubmit={handleSubmit}>
      <h1>T&A DATA SUBMISSION FORM</h1>
      <div className="date-fields">
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
      </div>
      <div className="production-quantity">
        <label>
          Production Per Day Per Machine:
          <input
            type="number"
            value={productionPerDay}
            onChange={(e) => setProductionPerDay(parseInt(e.target.value))}
          />
        </label>
        <label>
          Total Order Quantity:
          <input
            type="number"
            value={totalOrderQuantity}
            onChange={(e) => setTotalOrderQuantity(parseInt(e.target.value))}
          />
        </label>
      </div>
      <div className="fabric-field">
      <label>
        Fabric Name:
        <select
          value={processes}
          onChange={(e) => setFabricName(e.target.value)}
        >
          <option value="">Select Fabric</option>
          <option value="cotton">Cotton</option>
          <option value="silk">Silk</option>
          <option value="chiffon">Chiffon</option>
          <option value="satin">Satin</option>
        </select>
      </label>
      <label>
          Per Piece Requirement:
          <input
            type="number"
            step="0.1"
            value={perPieceRequirement}
            onChange={(e) => setPerPieceRequirement(parseFloat(e.target.value))}
          />
        </label>
      </div>
      <div className="unit-field">
        

        <label>
          Choose Unit:
          <select value={unit} onChange={(e) => setUnit(e.target.value)}>
            <option value="M">M</option>
            <option value="Kg">Kg</option>
          </select>
        </label>
        <label>
        Processes:
        <select
          value={fabricName}
          onChange={(e) => setProcesses(e.target.value)}
        >
          <option value="">Select Process</option>
          <option value="dying">Dying</option>
          <option value="mock-up">Mock Up</option>
          <option value="china-lace">China Lace</option>
          <option value="bag-viol">Bag Viol</option>
        </select>
      </label>
      </div>
     
      <div className="stage-field">
        <h3>Color and Quantity</h3>
        {colorQuantity.map((colorItem, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Color"
              value={colorItem.color}
              onChange={(e) =>
                handleColorChange(index, "color", e.target.value)
              }
            />
            <input
              type="number"
              placeholder="Quantity"
              value={colorItem.quantity}
              onChange={(e) =>
                handleColorChange(index, "quantity", e.target.value)
              }
            />
          </div>
        ))}
        <button type="button" onClick={addColorQuantity}>
          Add More
        </button>
        <label>
        Stages to Be Skipped:
        <select value={stagesToSkip} onChange={handleStagesChange}>
          <option value="">Select Stage to Skip</option>
          <option value="stage1">Stage 1</option>
          <option value="stage2">Stage 2</option>
          <option value="stage3">Stage 3</option>
          <option value="stage4">Stage 4</option>
        </select>
      </label>
      </div>
     

      <label>
        Is China Fabric Present?
        <select onChange={(e) => setChinaFabric(e.target.value === "yes")}>
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>
      </label>
      {chinaFabric && (
        <label>
          Select China Fabric:
          <input
            type="text"
            value={chinaFabricName}
            onChange={(e) => setChinaFabricName(e.target.value)}
          />
        </label>
      )}
      <label>
        Choose Major Fabric:
        <select
          value={fabricName}
          onChange={(e) => setFabricName(e.target.value)}
        >
          <option value="">Select Major Fabric</option>
          <option value="cotton">Cotton</option>
          <option value="silk">Silk</option>
          <option value="wool">Wool</option>
          <option value="linen">Linen</option>
          <option value="polyester">Polyester</option>
        </select>
      </label>
      <label>
        Trims:
        <select>
          <option value="">Add More Trims</option>
          <option value="trim1">Trim 1</option>
          <option value="trim2">Trim 2</option>
        </select>
      </label>
      <label>
        Accessories:
        <select>
          <option value="">Add More Accessories</option>
          <option value="accessory1">Accessory 1</option>
          <option value="accessory2">Accessory 2</option>
        </select>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FabricOrderForm;
