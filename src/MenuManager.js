import React, { useState, useEffect } from "react";
import { database } from "./firebase";
import {
  ref,
  push,
  onValue,
  set,
  remove,
  update,
  child,
  get,
} from "firebase/database";
import {
  Grid,
  Typography,
  Button,
  TextField,
  Tabs,
  Tab,
  Drawer,
  IconButton,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  Checkbox,
  FormGroup,
  FormControlLabel,
  OutlinedInput,
  ListItemText,
  FormHelperText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { v4 as uuidv4 } from "uuid";
import "./MenuManager.css";

const MenuManager = () => {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("allItems");
  const [selectedItemId, setSelectedItemId] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [createEditMode, setCreateEditMode] = useState("create");
  const [selectedItem, setSelectedItem] = useState({});
  const [hasOptions, setHasOptions] = useState(false);
  const [newItem, setNewItem] = useState({
    id: "",
    name: "",
    category: {
      id: "",
      name: "",
    },
    price: "",
    cost: "",
    stock: "",
    options: [],
    hasOptions: false,
  }); //change to null

  useEffect(() => {
    const categoriesRef = ref(database, "categories");
    onValue(categoriesRef, (snapshot) => {
      const categoriesData = snapshot.val();
      if (categoriesData) {
        const categoriesArray = Object.keys(categoriesData).map((key) => ({
          id: key,
          ...categoriesData[key],
        }));
        setCategories(categoriesArray);
        if (!selectedCategory && categoriesArray.length > 0) {
          setSelectedCategory(categoriesArray[0].id);
        }
      } else {
        setCategories([]);
      }
    });

    const menuItemsRef = ref(database, "menuItems");
    onValue(menuItemsRef, (snapshot) => {
      const menuItemsData = snapshot.val();
      if (menuItemsData) {
        const menuItemsArray = Object.keys(menuItemsData).map((key) => ({
          id: key,
          ...menuItemsData[key],
        }));
        setMenuItems(menuItemsArray);
      } else {
        setMenuItems([]);
      }
    });

    const optionsref = ref(database, "options");
    onValue(optionsref, (snapshot) => {
      const optionsData = snapshot.val();
      if (optionsData) {
        const optionsArray = Object.keys(optionsData).map((key) => ({
          id: key,
          ...optionsData[key],
        }));
        setSelectedOptions(optionsArray);
      } else {
        setSelectedOptions([]);
      }
    });
  }, []);

  //#region functions
  const addItem = () => {
    if (
      !newItem ||
      !newItem.name ||
      !newItem.category ||
      !newItem.price ||
      !newItem.cost ||
      !newItem.stock
    ) {
      //console.error("Please fill out all required fields");
      return;
    }

    const category = categories.find((item) => item.name === newItem.category);

    if (!category) {
      console.error("Invalid category selected");
      return;
    }

    if (newItem) {
      const newData = {
        ...newItem,
        id: uuidv4(),
        category: category,
        hasOptions: hasOptions,
      };
      const newItemRef = push(ref(database, "menuItems"));
      set(newItemRef, newData)
        .then(() => {
          console.log("Menu item added successfully");
          setNewItem({
            id: "",
            name: "",
            category: {
              id: "",
              name: "",
            },
            price: "",
            cost: "",
            stock: "",
            options: [],
            hasOptions: false,
          });
          setHasOptions(false);
        })
        .catch((error) => console.error("Error adding menu item:", error));
    } else {
      console.error("No item data provided");
    }
  };

  const deleteItem = () => {
    const itemKey = returnItemKey("menuItems", selectedItem.id);
    const itemRefPath = `menuItems/${itemKey}`;
    const itemRef = ref(database, itemRefPath);

    remove(itemRef)
      .then(() => {
        console.log("Menu item deleted successfully");
        setCreateEditMode("create");
        setSelectedItemId("");
        setSelectedItem({});
      })
      .catch((error) => {
        console.error("Error deleting menu item:", error);
      });
  };

  const updateItem = () => {
    if (!selectedItem || !selectedItem.id) {
      console.error("No valid item selected for update");
      return;
    }

    const itemKey = returnItemKey("menuItems", selectedItem.id);
    const itemRefPath = `menuItems/${itemKey}`;
    const itemRef = ref(database, itemRefPath);

    update(itemRef, selectedItem)
      .then(() => {
        console.log("Menu item updated successfully");

        const item = returnItem("menuItems", itemKey);
        console.log("updated Item", item);
      })
      .catch((error) => {
        console.error("Error updating menu item:", error);
      });
  };

  const returnItemKey = (table, id) => {
    const tableRef = ref(database, table);
    let itemKey;

    //get item
    onValue(tableRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        itemKey = Object.keys(data).find((key) => data[key].id === id);
      } else {
      }
    });

    return itemKey;
  };

  const returnItem = (table, itemKey) => {
    const tableRef = ref(database, table);
    let item;

    //get item
    onValue(tableRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        item = data[itemKey];
      } else {
      }
    });

    return item;
  };

  const toggleEditMode = (itemId) => {
    const item = menuItems.find((o) => o.id === itemId);
    setSelectedItem(item);
    setCreateEditMode("edit");
    //setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setSelectedItemId("");
    setCreateEditMode("create");
  };

  const handleAddItemChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleHasOptions = (e) => {
    const { name, value } = e.target;
    setHasOptions(e.target.checked);
    setNewItem((prev) => ({ ...prev, [name]: [] }));
  };

  const handleEditItemChange = (e) => {
    const { name, value } = e.target;
    let category;
    if (name === "category") {
      category = categories.find((item) => item.name === value);
    }
    setSelectedItem((prev) => ({
      ...prev,
      [name]: name === "category" ? category : value,
    }));
  };

  const handleOptionsChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewItem({
      ...newItem,
      options: typeof value === "string" ? value.split(",") : value,
    });
  };

  console.log('SelectedItem', selectedItem)

  const returnElements = () => {
    let elements;
    switch (createEditMode) {
      case "create":
        elements = (
          <>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Add Menu Item
            </Typography>
            <div style={{ marginBottom: "10px" }}>
              <TextField
                label="Name"
                id="name"
                name="name"
                variant="outlined"
                size="small"
                fullWidth
                sx={{ marginBottom: 1 }}
                value={newItem.name}
                onChange={handleAddItemChange}
              />
              <TextField
                label="Price"
                name="price"
                type="number"
                variant="outlined"
                size="small"
                fullWidth
                sx={{ marginBottom: 1 }}
                value={newItem.price}
                onChange={handleAddItemChange}
              />
              <TextField
                label="Cost"
                name="cost"
                type="number"
                variant="outlined"
                size="small"
                fullWidth
                sx={{ marginBottom: 1 }}
                value={newItem.cost}
                onChange={handleAddItemChange}
              />
              <TextField
                label="Amount in Stock"
                name="stock"
                type="number"
                variant="outlined"
                size="small"
                fullWidth
                sx={{ marginBottom: 1 }}
                value={newItem.stock}
                onChange={handleAddItemChange}
              />
              <FormControl
                fullWidth
                variant="outlined"
                size="small"
                sx={{ marginBottom: 1 }}
              >
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  label="Category"
                  name="category"
                  value={newItem.category}
                  onChange={handleAddItemChange}
                >
                  {categories.map((item) => (
                    <MenuItem key={item.id} id={item.id} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {/* Options section */}
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox value={hasOptions} />}
                  label="Includes options"
                  onChange={handleHasOptions}
                  name="hasOptions"
                />
              </FormGroup>
              {hasOptions && (
                <FormControl sx={{ m: 1, width: 300 }}>
                  <InputLabel id="options-label">Options</InputLabel>
                  <Select
                    labelId="optons-label"
                    id="options"
                    multiple
                    value={newItem.options}
                    onChange={handleOptionsChange}
                    input={<OutlinedInput label="Options" />}
                    renderValue={(selected) => selected.join(", ")}
                    // MenuProps={MenuProps}
                  >
                    {selectedOptions.map((option) => (
                      <MenuItem key={option.id} value={option.name}>
                        <Checkbox
                          checked={newItem.options.indexOf(option.name) > -1}
                        />
                        <ListItemText primary={option.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              <div className="action-buttons">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => addItem()}
                >
                  Add item
                </Button>
              </div>
            </div>
          </>
        );
        break;
      case "edit":
        elements = (
          <>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Update Item
            </Typography>

            <div style={{ marginBottom: "10px" }}>
              <TextField
                required
                label="Name"
                id="name"
                name="name"
                variant="outlined"
                size="small"
                fullWidth
                sx={{ marginBottom: 1 }}
                value={selectedItem.name}
                onChange={handleEditItemChange}
              />
              <TextField
                label="Price"
                name="price"
                type="number"
                variant="outlined"
                size="small"
                fullWidth
                sx={{ marginBottom: 1 }}
                value={selectedItem.price}
                onChange={handleEditItemChange}
              />
              <TextField
                label="Cost"
                name="cost"
                type="number"
                variant="outlined"
                size="small"
                fullWidth
                sx={{ marginBottom: 1 }}
                value={selectedItem.cost}
                onChange={handleEditItemChange}
              />
              <TextField
                label="Amount in Stock"
                name="stock"
                type="number"
                variant="outlined"
                size="small"
                fullWidth
                sx={{ marginBottom: 1 }}
                value={selectedItem.stock}
                onChange={handleEditItemChange}
              />
              <FormControl
                fullWidth
                variant="outlined"
                size="small"
                sx={{ marginBottom: 1 }}
              >
                <InputLabel>Category</InputLabel>
                <Select
                  label="Category"
                  name="category"
                  value={selectedItem.category.name}
                  onChange={handleEditItemChange}
                >
                  {categories.map((item) => (
                    <MenuItem key={item.id} id={item.id} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {/* Options section */}
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox value={hasOptions} />}
                  label="Includes options"
                  onChange={handleHasOptions}
                  value={selectedItem.hasOptions}
                />
              </FormGroup>
              {hasOptions && (
                <FormControl sx={{ m: 1, width: 300 }}>
                  <InputLabel id="options-label">Options</InputLabel>
                  <Select
                    labelId="optons-label"
                    id="options"
                    multiple
                    value={newItem.options}
                    onChange={handleOptionsChange}
                    input={<OutlinedInput label="Options" />}
                    renderValue={(selected) => selected.join(", ")}
                    // MenuProps={MenuProps}
                  >
                    {selectedOptions.map((option) => (
                      <MenuItem key={option.id} value={option.name}>
                        <Checkbox
                          checked={newItem.options.indexOf(option.name) > -1}
                        />
                        <ListItemText primary={option.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              <div className="action-buttons">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => updateItem()}
                >
                  Update item
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => deleteItem()}
                >
                  Delete Item
                </Button>
              </div>
            </div>
          </>
        );
        break;
      default:
        break;
    }

    return elements;
  };

  //#endregion

  return (
    <Grid container spacing={3} sx={{ padding: 3 }}>
      <Grid item xs={12}>
        <Grid item xs={12} id="header">
          <Typography className="welcome-msg" variant="h4">
            Welcome, User!
          </Typography>
          {createEditMode != "create" && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setCreateEditMode("create")}
              id="addItem"
            >
              + ADD MENU ITEM
            </Button>
          )}
        </Grid>
        <Grid item xs={12} id="tabs">
          <Tabs
            id="categoryTabs"
            className="category-tabs"
            value={selectedCategory}
            onChange={(event, newValue) => setSelectedCategory(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="Categories"
          >
            <Tab
              key="allItems"
              value="allItems"
              label="All Items"
              className="all-items"
            />
            {categories.map((category) => (
              <Tab
                key={category.id}
                value={category.name}
                label={category.name}
                className={category.name}
              />
            ))}
          </Tabs>
        </Grid>
        <Grid item xs={12} id={`content`}>
          <Grid item xs={9} id="menuItems">
            <Grid container spacing={1}>
              {menuItems.length != 0 ? (
                (selectedCategory === "allItems"
                  ? menuItems
                  : menuItems.filter(
                      (item) => item.category.name === selectedCategory
                    )
                ).map((item) => (
                  <Grid item key={item.id} xs={8} sm={6} md={3}>
                    <div
                      className="menu-item"
                      onClick={() => toggleEditMode(item.id)}
                    >
                      <Typography className="menu-item-name" variant="h4">
                        {item.name}
                      </Typography>
                    </div>
                  </Grid>
                ))
              ) : (
                <div>
                  <Typography className="menu-item-name" variant="h6">
                    No Available items
                  </Typography>
                </div>
              )}
            </Grid>
          </Grid>
          <Grid item xs={4} lg={3} id="formSection">
            <Grid container>{returnElements()}</Grid>
          </Grid>
        </Grid>
      </Grid>

      <Drawer anchor="right" open={drawerOpen} onClose={closeDrawer}>
        <div style={{ width: "300px", padding: "20px" }}>
          {returnElements()}
        </div>
      </Drawer>
    </Grid>
  );
};

export default MenuManager;
