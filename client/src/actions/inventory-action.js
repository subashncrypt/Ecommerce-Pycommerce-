/*
* @author: Meghdoort Ojha
*/

import axios from "axios";

export const addInventoryProduct = async (item) => {
    try {
        let result = await axios.post("/inventory/add-product", item)
        return result
    }
    catch(er){
        return er
    }
}

export const listInventoryProduct = async() => {
    try {
        let result = await axios.get("/inventory/products")
        return result
    }
    catch(er){
        return er
    }
}
export const deleteInventoryProductsById = async(id) => {
    try {
        let result = await axios.delete("/inventory/delete-product/"+id)
        return result
    }
    catch(er){
        return er
    }
}

export const getInventoryProductById = async(id) => {
    try {
        let result = await axios.get("/inventory/product/"+id)
        return result
    }
    catch(er){
        return er
    }
}
export const updateProductById = async(id,data) => {
    try {
        let result = await axios.put("/inventory/update-product/"+id,data)
        return result
    }
    catch(er){
        return er
    }
}