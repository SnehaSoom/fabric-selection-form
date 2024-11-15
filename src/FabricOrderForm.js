import React, { useState } from "react";
import Select from 'react-select';
import "./FabricOrderForm.css";

const fabricNameOptions = [
  { value: 'Cotton', label: 'Cotton' },
  { value: 'chiffon', label: 'chiffon' },
  { value: 'satin', label: 'satin' },
];

const fabricStageOptions = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
];

const FabricOrderForm = () => {
  const [fabricName, setFabricName] = useState("");
  const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split("T")[0]);
  const [productionPerDay, setProductionPerDay] = useState(5);
  const [totalOrderQuantity, setTotalOrderQuantity] = useState(12000);
  const [fabricEntries, setFabricEntries] = useState([
    {
      fabricName: "",
      unit: "",
      processes: [],
      stagesToSkip: "",
      colorQuantity: [{ color: "", quantity: "" }]
    }
  ]);
  const [chinaFabric, setChinaFabric] = useState(false);
  const [chinaFabricName, setChinaFabricName] = useState("");

  // Function to get filtered options based on selected fabric name
  const getFilteredOptions = (selectedFabric) => {
    return fabricNameOptions.filter(option => option.value === selectedFabric || selectedFabric === "");
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedFabricEntries = [...fabricEntries];
    updatedFabricEntries[index][name] = value; // Update the state based on the input field name
    setFabricEntries(updatedFabricEntries);
  };

  const handleFabricChange = (index, selectedOptions, name) => {
    const updatedFabricEntries = [...fabricEntries];
    updatedFabricEntries[index][name] = selectedOptions ? selectedOptions : [];
    setFabricEntries(updatedFabricEntries);
  };

  const handleUnitChange = (index, event) => {
    const { value } = event.target;
    const updatedFabricEntries = [...fabricEntries];
    updatedFabricEntries[index].unit = value;
    setFabricEntries(updatedFabricEntries);
  };

  const handleColorChange = (index, colorIndex, key, value) => {
    const updatedFabricEntries = [...fabricEntries];
    updatedFabricEntries[index].colorQuantity[colorIndex][key] = value;
    setFabricEntries(updatedFabricEntries);
  };

  const addColorQuantity = (index) => {
    const updatedFabricEntries = [...fabricEntries];
    updatedFabricEntries[index].colorQuantity.push({ color: "", quantity: "" });
    setFabricEntries(updatedFabricEntries);
  };

  const removeColorQuantity = (index, colorIndex) => {
    const updatedFabricEntries = [...fabricEntries];
    updatedFabricEntries[index].colorQuantity = updatedFabricEntries[index].colorQuantity.filter((_, i) => i !== colorIndex);
    setFabricEntries(updatedFabricEntries);
  };

  const addFabricEntry = () => {
    setFabricEntries((prevEntries) => [
      ...prevEntries,
      {
        fabricName: "",
        unit: "",
        processes: [],
        stagesToSkip: "",
        colorQuantity: [{ color: "", quantity: "" }]
      }
    ]);
  };

  const removeFabricEntry = (index) => {
    let updatedFabricEntries = [...fabricEntries];
    updatedFabricEntries = updatedFabricEntries.filter((_, i) => i !== index);
    setFabricEntries(updatedFabricEntries);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      startDate,
      endDate,
      productionPerDay,
      totalOrderQuantity,
      fabricEntries,
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
        <label>Fabric Section</label>
        {fabricEntries.map((fabricEntry, index) => (
          <div key={index} className="fabric-section">
            <div className="fabric-form-section">
              <div className="fabric-form-fields">
                <label>
                  Fabric Name:
                  <Select
                    value={fabricEntry.fabricName}
                    onChange={(value) => {
                      handleFabricChange(index, value, 'fabricName');
                      setFabricName(value.value); // Update the selected fabric name
                    }}
                    options={getFilteredOptions(fabricName)}
                    isClearable
                    placeholder="Select"
                  />
                </label>
                <label>
                  Per Piece Requirement:
                  <input
                    className="piece-input"
                    type="number"
                    step="0.1"
                    name="perPieceRequirement"
                    value={fabricEntry.perPieceRequirement}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </label>
              </div>
              <div className="fabric-form-col-fields">
                <label>Unit:</label>
                <div className="fabric-form-row-fields">
                  <label>
                    <input
                      type="radio"
                      name="unit"
                      value="M"
                      checked={fabricEntry.unit === "M"}
                      onChange={(e) => handleUnitChange(index, e)}
                    />
                    M
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="unit"
                      value="Kg"
                      checked={fabricEntry.unit === "Kg"}
                      onChange={(e) => handleUnitChange(index, e)}
                    />
                    Kg
                  </label>
                </div>
              </div>
              <div className="fabric-form-fields">
                <label>
                  Processes:
                  <Select
                    value={fabricEntry.processes}
                    onChange={(value) => handleFabricChange(index, value, 'processes')}
                    options={getFilteredOptions(fabricName)}
                    isMulti
                    isClearable
                    placeholder="Select"
                  />
                </label>
              </div>
              <div className="fabric-form-fields">
                <div className="stage-field">
                  <label>Color and Quantity</label>
                  {fabricEntry.colorQuantity.map((colorItem, colorIndex) => (
                    <div className="stage-field-mobile-view" key={colorIndex}>
                      <input
                        style={{ width: '100px', marginRight: '14px' }}
                        type="text"
                        placeholder="Color"
                        value={colorItem.color}
                        onChange={(e) => handleColorChange(index, colorIndex, "color", e.target.value)}
                      />
                      <input
                        style={{ width: '100px', marginRight: '12px' }}
                        type="number"
                        placeholder="Quantity"
                        value={colorItem.quantity}
                        onChange={(e) => handleColorChange(index, colorIndex, "quantity", e.target.value)}
                      />
                      {fabricEntry.colorQuantity.length > 1 && <button className="color-desk-btn" style={{ marginRight: '14px' }} type="button" onClick={() => removeColorQuantity(index, colorIndex)}>
                        - Remove
                      </button>}
                      {(fabricEntry.colorQuantity.length - 1 === colorIndex) && <button className="color-desk-btn" type="button" onClick={() => addColorQuantity(index)}>
                        + Add
                      </button>}
                      {fabricEntry.colorQuantity.length > 1 && <button className="color-btn" type="button" onClick={() => removeColorQuantity(index, colorIndex)}>
                        -
                      </button>}
                      {(fabricEntry.colorQuantity.length - 1 === colorIndex) && <button className="color-btn" type="button" onClick={() => addColorQuantity(index)}>
                        +
                      </button>}
                    </div>
                  ))}
                </div>
              </div>
              <div className="fabric-form-fields">
                <label>
                  Stages to Be Skipped:
                  <Select
                    value={fabricEntry.stagesToSkip}
                    onChange={(value) => handleFabricChange(index, value, 'stagesToSkip')}
                    options={fabricStageOptions}
                    isClearable
                    placeholder="Select"
                  />
                </label>
              </div>
            </div>
            <div className="fabric-btn-section">
              {(fabricEntries.length - 1 === index) && <button type="button" onClick={addFabricEntry}> + Add</button>}
              {fabricEntries.length > 1 && <button type="button" onClick={() => removeFabricEntry(index)}>- Remove</button>}
            </div>
            <div className="fabric-btn-view-section">
              {(fabricEntries.length - 1 === index) && <button type="button" onClick={addFabricEntry}> + </button>}
              {fabricEntries.length > 1 && <button type="button" onClick={() => removeFabricEntry(index)}> - </button>}
            </div>
          </div>
        ))}

        <label>
          Is China Fabric Present?
          <select className='Select' onChange={(e) => setChinaFabric(e.target.value === "yes")}>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </label>
        {
          chinaFabric && (
            <label style={{ width: '250px' }}>
              Select China Fabric:
              <Select
                value={chinaFabricName}
                onChange={(value) => setChinaFabricName(value)}
                options={getFilteredOptions(fabricName)}
                isMulti
                isClearable
                placeholder="Select"
              />
            </label>
          )
        }
        <label>
          Choose Major Fabric:
          <select className='Select' value={fabricName} onChange={(e) => setFabricName(e.target.value)}>
            <option value="">Select Major Fabric</option>
            {getFilteredOptions(fabricName).map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>
        <label>
          Trims:
          <select className='Select'>
            <option value="">Add More Trims</option>
            <option value="trim1">Trim 1</option>
            <option value="trim2">Trim 2</option>
          </select>
        </label>
        <label>
          Accessories:
          <select className='Select'>
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