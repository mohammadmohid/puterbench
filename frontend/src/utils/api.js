export const API_LINK =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const getHeaders = (token, isFormData = false) => {
  const headers = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }
  return headers;
};

// User API
export const fetchUserProfile = async (token) => {
  const response = await fetch(`${API_LINK}/user/profile`, {
    headers: getHeaders(token),
  });
  if (!response.ok) throw new Error("Failed to fetch profile");
  return response.json();
};

export const updateUserProfile = async (userData, token) => {
  const response = await fetch(`${API_LINK}/user/profile`, {
    method: "PUT",
    headers: getHeaders(token),
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error("Failed to update profile");
  return response.json();
};

// Product API
export const fetchProducts = async () => {
  const response = await fetch(`${API_LINK}/products/getProducts`);
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
};

export const fetchProductById = async (id) => {
  const response = await fetch(`${API_LINK}/products/getProduct/${id}`);
  if (!response.ok) throw new Error("Failed to fetch product");
  return response.json();
};

export const createProduct = async (formData, token) => {
  const response = await fetch(`${API_LINK}/products/addProduct`, {
    method: "POST",
    headers: getHeaders(token, true),
    body: formData,
  });
  if (!response.ok) throw new Error("Failed to create product");
  return response.json();
};

export const updateProduct = async (id, formData, token) => {
  const response = await fetch(`${API_LINK}/products/updateProduct/${id}`, {
    method: "PUT",
    headers: getHeaders(token, true),
    body: formData,
  });
  if (!response.ok) throw new Error("Failed to update product");
  return response.json();
};

export const deleteProduct = async (id, token) => {
  const response = await fetch(`${API_LINK}/products/deleteProduct/${id}`, {
    method: "DELETE",
    headers: getHeaders(token),
  });
  if (!response.ok) throw new Error("Failed to delete product");
  return response.json();
};

export const deleteProductImage = async (productId, imageIndex, token) => {
  const response = await fetch(
    `${API_LINK}/products/${productId}/images/${imageIndex}`,
    {
      method: "DELETE",
      headers: getHeaders(token),
    }
  );
  if (!response.ok) throw new Error("Failed to delete image");
  return response.json();
};

// Category API
export const fetchCategories = async () => {
  const response = await fetch(`${API_LINK}/categories/getCategory`);
  if (!response.ok) throw new Error("Failed to fetch categories");
  return response.json();
};

export const fetchCategoryById = async (id) => {
  const response = await fetch(`${API_LINK}/categories/getCategory/${id}`);
  if (!response.ok) throw new Error("Failed to fetch category");
  return response.json();
};

export const createCategory = async (formData, token) => {
  const response = await fetch(`${API_LINK}/categories/createCategory`, {
    method: "POST",
    headers: getHeaders(token, true),
    body: formData,
  });
  if (!response.ok) throw new Error("Failed to create category");
  return response.json();
};

export const updateCategory = async (id, formData, token) => {
  const response = await fetch(`${API_LINK}/categories/updateCategory/${id}`, {
    method: "PUT",
    headers: getHeaders(token, true),
    body: formData,
  });
  if (!response.ok) throw new Error("Failed to update category");
  return response.json();
};

export const deleteCategory = async (id, token) => {
  const response = await fetch(`${API_LINK}/categories/deleteCategory/${id}`, {
    method: "DELETE",
    headers: getHeaders(token),
  });
  if (!response.ok) throw new Error("Failed to delete category");
  return response.json();
};

// Cart API
export const fetchCart = async (userId, token) => {
  const response = await fetch(`${API_LINK}/cart/${userId}`, {
    headers: getHeaders(token),
  });
  if (!response.ok) throw new Error("Failed to fetch cart");
  return response.json();
};

export const addToCart = async (userId, productId, quantity, token) => {
  const response = await fetch(`${API_LINK}/cart/addToCart`, {
    method: "POST",
    headers: getHeaders(token),
    body: JSON.stringify({ userId, productId, quantity }),
  });
  if (!response.ok) throw new Error("Failed to add to cart");
  return response.json();
};

export const updateCartItem = async (userId, productId, quantity, token) => {
  const response = await fetch(`${API_LINK}/cart/updateCart`, {
    method: "PUT",
    headers: getHeaders(token),
    body: JSON.stringify({ userId, productId, quantity }),
  });
  if (!response.ok) throw new Error("Failed to update cart");
  return response.json();
};

export const removeFromCart = async (userId, productId, token) => {
  const response = await fetch(`${API_LINK}/cart/removeFromCart`, {
    method: "DELETE",
    headers: getHeaders(token),
    body: JSON.stringify({ userId, productId }),
  });
  if (!response.ok) throw new Error("Failed to remove item");
  return response.json();
};

// Order API
export const createOrder = async (orderData, token) => {
  const response = await fetch(`${API_LINK}/orders`, {
    method: "POST",
    headers: getHeaders(token),
    body: JSON.stringify(orderData),
  });
  if (!response.ok) throw new Error("Failed to create order");
  return response.json();
};

export const fetchMyOrders = async (token) => {
  const response = await fetch(`${API_LINK}/orders/myorders`, {
    headers: getHeaders(token),
  });
  if (!response.ok) throw new Error("Failed to fetch orders");
  return response.json();
};

export const fetchAllOrders = async (token) => {
  const response = await fetch(`${API_LINK}/orders`, {
    headers: getHeaders(token),
  });
  if (!response.ok) throw new Error("Failed to fetch orders");
  return response.json();
};

// Review API
export const createProductReview = async (productId, reviewData, token) => {
  const response = await fetch(`${API_LINK}/products/${productId}/reviews`, {
    method: "POST",
    headers: getHeaders(token),
    body: JSON.stringify(reviewData),
  });
  if (!response.ok) throw new Error(await response.text());
  return response.json();
};
