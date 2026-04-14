import axios from "axios";

// 🔹 Create API instance
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔹 Simple error handler
function getError(error) {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message;

    if (typeof message === "string") return message;
    if (Array.isArray(message) && message.length > 0) return message[0];
  }

  return "Something went wrong";
}

// 🔐 Login with username
export async function loginUser(username, password) {
  try {
    const res = await API.post("/auth/login", { username, password });
    return res.data;
  } catch (err) {
    throw new Error(getError(err));
  }
}

// 🔍 Find user by email (helper)
async function findUserByEmail(email) {
  const res = await API.get("/users/search", {
    params: { q: email },
  });

  return res.data.users.find(
    (user) => user.email.toLowerCase() === email.toLowerCase()
  );
}

// 🔐 Login with email OR username
export async function loginWithEmail(emailOrUsername, password) {
  try {
    const input = emailOrUsername.trim();

    // If input is email → convert to username
    if (input.includes("@")) {
      const user = await findUserByEmail(input);

      if (!user) {
        throw new Error("User not found for this email");
      }

      return await loginUser(user.username, password);
    }

    // If already username → direct login
    return await loginUser(input, password);
  } catch (err) {
    if (err instanceof Error) throw err;
    throw new Error(getError(err));
  }
}

// 👤 Get current user
export async function getCurrentUser(token) {
  try {
    const res = await API.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    throw new Error(getError(err));
  }
}

// 🛒 Get products (with pagination)
export async function getProducts(page = 1, limit = 10) {
  try {
    const skip = (page - 1) * limit;

    const res = await API.get("/products", {
      params: { limit, skip },
    });

    return res.data;
  } catch (err) {
    throw new Error(getError(err));
  }
}

// 📄 Get single product
export async function getProductById(id) {
  try {
    const res = await API.get(`/products/${id}`);
    return res.data;
  } catch (err) {
    throw new Error(getError(err));
  }
}

// 🔹 Export API instance (optional use)
export default API;