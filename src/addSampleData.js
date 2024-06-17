// src/addSampleData.js
import { database } from "./firebase";
import { ref, set } from "firebase/database";

const sampleData = {
  categories: [
    {
      id: "ed093a4d-5990-46b7-a102-c686b416c353",
      name: "Starters",
    },
    {
      id: "ad551035-8217-4e27-8020-46da8c09c62e",
      name: "Mains",
    },
    {
      id: "bf78b067-2ba0-4cc5-bdca-bf893f6391bc",
      name: "Sandwiches",
    },
    {
      id: "d2bc30ff-b7bb-4b25-a14d-1bb462196cf2",
      name: "Desserts",
    },
    {
      id: "57c8b8fa-7df1-4ffe-9172-3da74159cb8c",
      name: "Sides & Salads",
    },
    {
      id: "c756d481-98f8-4abe-a815-3e36c05f90ea",
      name: "Beverages",
    },
  ],
  menuItems: [
    // {
    //   id: "a4d88169-6397-4f73-a2da-0afe94f1b020",
    //   name: "Fries",
    //   category: {
    //     id: "ed093a4d-5990-46b7-a102-c686b416c353",
    //     name: "Starters",
    //   },
    //   price: "2.99",
    //   cost: "1.00",
    //   stock: "50",
    //   options: ["Petite", "Standard"],
    // },
    // {
    //   id: "bc70cbe1-82a2-47dc-8b22-79e66d4580d7",
    //   name: "Coke",
    //   category: {
    //     id: "c756d481-98f8-4abe-a815-3e36c05f90ea",
    //     name: "Beverages",
    //   },
    //   price: "1.99",
    //   cost: "0.50",
    //   stock: "100",
    //   options: ["Petite", "Standard"],
    // },
    // {
    //   id: "1e303878-5ad2-41d2-81b2-cf9bf3be4e49",
    //   name: "Peperroni Pizza",
    //   category: {
    //     id: "ed093a4d-5990-46b7-a102-c686b416c353",
    //     name: "Starters",
    //   },
    //   price: "1.99",
    //   cost: "0.50",
    //   stock: "100",
    //   options: ["Sharing"],
    // },
  ],
  options: [
    {
      id: "68ea2ae4-132b-4329-bb84-06cd37c183b5",
      name: "Petite",
    },
    {
      id: "94b55c2f-285e-469b-8e0f-9b6569b2c144",
      name: "Standard",
    },
    {
      id: "0d3baced-d7cf-4a1d-a17b-d3e459121766",
      name: "Sharing",
    },
  ],
};

const addSampleData = () => {
  const categoriesRef = ref(database, "categories");
  const menuItemsRef = ref(database, "menuItems");
  const optionsRef = ref(database, "options");

  set(categoriesRef, sampleData.categories)
    .then(() => {
      console.log("Categories added successfully");
    })
    .catch((error) => {
      console.error("Error adding categories:", error);
    });

  set(menuItemsRef, sampleData.menuItems)
    .then(() => {
      console.log("Menu items added successfully");
    })
    .catch((error) => {
      console.error("Error adding menu items:", error);
    });

  set(optionsRef, sampleData.options)
    .then(() => {
      console.log("Options added successfully");
    })
    .catch((error) => {
      console.error("Error adding options:", error);
    });
};

export default addSampleData;
