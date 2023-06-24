
import React, { useState } from "react";
import { ethers } from "ethers";
import contractAbi from "./contractABI.json"

;

const AllergyModal = (props) => {
  const [allergyDetails, setAllergyDetails] = useState({
    allergyName: "",
    disease: "",
    description: "",
    medication: "",
    diagnosedDate: "",
  });

  const contractAddress = "0x8084B71fd847053621f36a3A87DDC885f45A467D"; // Replace with your actual contract address
  const contractABI = contractAbi;; // Replace with your actual contract ABI

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  if (!props.show) {
    return null;
  }

  const addAllergyModal = async () => {
    try {
      const { allergyName, diagnosedDate, description, medication } = allergyDetails;

      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      // Call the contract method to add the allergy
      const tx = await contract.addAllergy(allergyName, diagnosedDate, description, medication);

      // Wait for the transaction to be confirmed
      await tx.wait();

      // Transaction successful
      console.log("Allergy added successfully");

      // Clear the form
      setAllergyDetails({
        allergyName: "",
        disease: "",
        description: "",
        medication: "",
        diagnosedDate: "",
      });
    } catch (error) {
      console.error("Error adding allergy:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAllergyDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <div className="modal allergy_modal" onClick={props.onClose}>
      <div className="modal_content" onClick={(e) => e.stopPropagation()}>
        <div className="modal_title">
          <h2>Add Allergy</h2>
        </div>
        <div className="modal_body">
          <h4>Allergy Name</h4>
          <input
            type="text"
            placeholder="Enter Allergy Name"
            name="allergyName"
            value={allergyDetails.allergyName}
            onChange={handleInputChange}
          />
          <h4>Diagnosed date</h4>
          <input
            type="text"
            placeholder="Put in the date"
            name="diagnosedDate"
            value={allergyDetails.diagnosedDate}
            onChange={handleInputChange}
          />
          <h4>Disease</h4>
          <input
            type="text"
            placeholder="Disease"
            name="disease"
            value={allergyDetails.disease}
            onChange={handleInputChange}
          />
          <h4>Description</h4>
          <input
            type="text"
            placeholder="Description"
            name="description"
            value ={allergyDetails.description}
            onChange={handleInputChange}
          />
          <h4>Medication</h4>
          <textarea
            name="medication"
            cols="30"
            rows="10"
            placeholder="Medication"
            value={allergyDetails.medication}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="modal_footer">
          <button onClick={addAllergyModal}>Add</button>
          <button onClick={props.onClose} className="close_button">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllergyModal;
