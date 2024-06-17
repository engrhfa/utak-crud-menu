// src/addSampleData.js
import { database } from "./firebase";
import { ref, set } from "firebase/database";

const sampleData = {
  "categories": [
    {
      "id": "ed093a4d-5990-46b7-a102-c686b416c353",
      "name": "Starters"
    },
    {
      "id": "ad551035-8217-4e27-8020-46da8c09c62e",
      "name": "Mains"
    },
    {
      "id": "bf78b067-2ba0-4cc5-bdca-bf893f6391bc",
      "name": "Sandwiches"
    },
    {
      "id": "d2bc30ff-b7bb-4b25-a14d-1bb462196cf2",
      "name": "Desserts"
    },
    {
      "id": "57c8b8fa-7df1-4ffe-9172-3da74159cb8c",
      "name": "Sides & Salads"
    },
    {
      "id": "c756d481-98f8-4abe-a815-3e36c05f90ea",
      "name": "Beverages"
    }
  ],
  "menuItems": [
    {
      "id": "a4d88169-6397-4f73-a2da-0afe94f1b020",
      "name": "Fries",
      "category": {
        "id": "ed093a4d-5990-46b7-a102-c686b416c353",
        "name": "Starters"
      },
      "price": "2.99",
      "cost": "1.00",
      "stock": "50",
      "options": ["Petite", "Standard"]
    },
    {
      "id": "1e303878-5ad2-41d2-81b2-cf9bf3be4e49",
      "name": "Pepperoni Pizza",
      "category": {
        "id": "ed093a4d-5990-46b7-a102-c686b416c353",
        "name": "Starters"
      },
      "price": "1.99",
      "cost": "0.50",
      "stock": "100",
      "options": ["Standard", "Sharing"]
    },
    {
      "id": "de3a4567-bfd4-4c2e-a71f-9dbb5bc4c8d6",
      "name": "Mozzarella Sticks",
      "category": {
        "id": "ed093a4d-5990-46b7-a102-c686b416c353",
        "name": "Starters"
      },
      "price": "4.99",
      "cost": "1.50",
      "stock": "60",
      "options": ["Standard", "Sharing"]
    },
    {
      "id": "34d86187-c1c5-43ff-9a5e-92b68cba26f5",
      "name": "Chicken Wings",
      "category": {
        "id": "ed093a4d-5990-46b7-a102-c686b416c353",
        "name": "Starters"
      },
      "price": "5.99",
      "cost": "2.00",
      "stock": "70",
      "options": ["Standard", "Sharing"]
    },
    {
      "id": "f7d88121-6214-4f19-a1da-1aee54f4b030",
      "name": "Grilled Chicken",
      "category": {
        "id": "ad551035-8217-4e27-8020-46da8c09c62e",
        "name": "Mains"
      },
      "price": "12.99",
      "cost": "5.00",
      "stock": "40",
      "options": ["Standard", "Sharing"]
    },
    {
      "id": "eb5b3f02-5db9-4b82-b5a1-34ff3ba36b2b",
      "name": "Beef Steak",
      "category": {
        "id": "ad551035-8217-4e27-8020-46da8c09c62e",
        "name": "Mains"
      },
      "price": "15.99",
      "cost": "6.50",
      "stock": "35",
      "options": ["Standard", "Sharing"]
    },
    {
      "id": "96c2f726-0f3e-4eb5-95a6-b5b7d707ef8e",
      "name": "Vegetarian Pasta",
      "category": {
        "id": "ad551035-8217-4e27-8020-46da8c09c62e",
        "name": "Mains"
      },
      "price": "10.99",
      "cost": "4.00",
      "stock": "45",
      "options": ["Standard", "Sharing"]
    },
    {
      "id": "e31b4d2b-faf3-45a4-a684-2c12b3ed7f68",
      "name": "Classic Burger",
      "category": {
        "id": "bf78b067-2ba0-4cc5-bdca-bf893f6391bc",
        "name": "Sandwiches"
      },
      "price": "8.99",
      "cost": "3.50",
      "stock": "60",
      "options": ["Standard", "Sharing"]
    },
    {
      "id": "4e2a1b2f-6df8-4bfc-9d1b-5a34f0d5bf3f",
      "name": "Chicken Sandwich",
      "category": {
        "id": "bf78b067-2ba0-4cc5-bdca-bf893f6391bc",
        "name": "Sandwiches"
      },
      "price": "7.99",
      "cost": "3.00",
      "stock": "55",
      "options": ["Standard", "Sharing"]
    },
    {
      "id": "783b5e11-89f4-4e4e-8c1c-14d9aeb9e5e5",
      "name": "Veggie Wrap",
      "category": {
        "id": "bf78b067-2ba0-4cc5-bdca-bf893f6391bc",
        "name": "Sandwiches"
      },
      "price": "6.99",
      "cost": "2.50",
      "stock": "50",
      "options": ["Standard", "Sharing"]
    },
    {
      "id": "37b1f2d9-1f9c-41e4-9e5f-2a4d0f4b5f91",
      "name": "Chocolate Cake",
      "category": {
        "id": "d2bc30ff-b7bb-4b25-a14d-1bb462196cf2",
        "name": "Desserts"
      },
      "price": "5.99",
      "cost": "2.00",
      "stock": "30",
      "options": ["Petite", "Standard"]
    },
    {
      "id": "c5d2b7f0-9e42-4a9b-b8b5-8a84f3a47345",
      "name": "Ice Cream Sundae",
      "category": {
        "id": "d2bc30ff-b7bb-4b25-a14d-1bb462196cf2",
        "name": "Desserts"
      },
      "price": "3.99",
      "cost": "1.50",
      "stock": "40",
      "options": ["Petite", "Standard"]
    },
    {
      "id": "a1d2b8f0-5e13-42f2-8b5d-8a84f3b47367",
      "name": "Cheesecake",
      "category": {
        "id": "d2bc30ff-b7bb-4b25-a14d-1bb462196cf2",
        "name": "Desserts"
      },
      "price": "4.99",
      "cost": "2.00",
      "stock": "35",
      "options": ["Petite", "Standard"]
    },
    {
      "id": "21fbd8b4-2cd9-41d4-8b78-8d832ef3f5d7",
      "name": "Garden Salad",
      "category": {
        "id": "57c8b8fa-7df1-4ffe-9172-3da74159cb8c",
        "name": "Sides & Salads"
      },
      "price": "4.99",
      "cost": "1.50",
      "stock": "50",
      "options": ["Sharing"]
    },
    {
      "id": "a32fdd61-4f27-4b22-8b21-8c11ed5b458d",
      "name": "Coleslaw",
      "category": {
        "id": "57c8b8fa-7df1-4ffe-9172-3da74159cb8c",
        "name": "Sides & Salads"
      },
      "price": "2.99",
      "cost": "1.00",
      "stock": "40",
      "options": ["Sharing"]
    },
    {
      "id": "51dc6b7d-3f19-4e7e-9c7c-6d841eb4d4c3",
      "name": "Mashed Potatoes",
      "category": {
        "id": "57c8b8fa-7df1-4ffe-9172-3da74159cb8c",
        "name": "Sides & Salads"
      },
      "price": "3.99",
      "cost": "1.20",
      "stock": "45",
      "options": ["Petite", "Sharing"]
    },
    {
      "id": "bc70cbe1-82a2-47dc-8b22-79e66d4580d7",
      "name": "Coke",
      "category": {
        "id": "c756d481-98f8-4abe-a815-3e36c05f90ea",
        "name": "Beverages"
      },
      "price": "1.99",
      "cost": "0.50",
      "stock": "100",
      "options": ["Petite", "Standard"]
    },
    {
      "id": "f62b7c5d-4d1d-41f8-8b24-8c23a4c5d673",
      "name": "Iced Tea",
      "category": {
        "id": "c756d481-98f8-4abe-a815-3e36c05f90ea",
        "name": "Beverages"
      },
      "price": "2.49",
      "cost": "0.60",
      "stock": "90",
      "options": ["Petite", "Standard"]
    },
    {
      "id": "ec31b67a-4d71-4f6b-8b25-8d33b4f7c578",
      "name": "Coffee",
      "category": {
        "id": "c756d481-98f8-4abe-a815-3e36c05f90ea",
        "name": "Beverages"
      },
      "price": "1.99",
      "cost": "0.40",
      "stock": "80",
      "options": ["Petite", "Standard"]
    }
  ],
  "options": [
    {
      "id": "68ea2ae4-132b-4329-bb84-06cd37c183b5",
      "name": "Petite"
    },
    {
      "id": "94b55c2f-285e-469b-8e0f-9b6569b2c144",
      "name": "Standard"
    },
    {
      "id": "0d3baced-d7cf-4a1d-a17b-d3e459121766",
      "name": "Sharing"
    },
  ]
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
