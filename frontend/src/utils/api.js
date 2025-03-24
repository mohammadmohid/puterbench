export const API_LINK = "https://puterbench.vercel.app/api";

// Product API functions
export const fetchProducts = async () => {
  const response = await fetch(`${API_LINK}/products/getProducts`);
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
};

export const fetchProductById = async (id) => {
  const response = await fetch(
    `https://puterbench.vercel.app/api/products/getProduct/${id}`
  );
  if (!response.ok) throw new Error("Failed to fetch product");
  return response.json();
};

export const createProduct = async (formData) => {
  const response = await fetch(`${API_LINK}/products/addProduct`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) throw new Error("Failed to create product");
  return response.json();
};

export const updateProduct = async (id, formData) => {
  const response = await fetch(
    `https://puterbench.vercel.app/api/products/updateProduct/${id}`,
    {
      method: "PUT",
      body: formData,
    }
  );
  if (!response.ok) throw new Error("Failed to update product");
  return response.json();
};

export const deleteProduct = async (id) => {
  const response = await fetch(
    `https://puterbench.vercel.app/api/products/deleteProduct/${id}`,
    {
      method: "DELETE",
    }
  );
  if (!response.ok) throw new Error("Failed to delete product");
  return response.json();
};

export const deleteProductImage = async (productId, imageIndex) => {
  const response = await fetch(
    `https://puterbench.vercel.app/api/products/${productId}/images/${imageIndex}`,
    {
      method: "DELETE",
    }
  );
  if (!response.ok) throw new Error("Failed to delete image");
  return response.json();
};

// Category API functions
export const fetchCategories = async () => {
  const response = await fetch(`${API_LINK}/categories/getCategory`);
  if (!response.ok) throw new Error("Failed to fetch categories");
  return response.json();
};

export const createCategory = async (formData) => {
  const response = await fetch(`${API_LINK}/categories/createCategory`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) throw new Error("Failed to create category");
  return response.json();
};

export const deleteCategory = async (id) => {
  const response = await fetch(
    `https://puterbench.vercel.app/api/categories/deleteCategory/${id}`,
    {
      method: "POST",
    }
  );
  if (!response.ok) throw new Error("Failed to delete category");
  return response.json();
};
