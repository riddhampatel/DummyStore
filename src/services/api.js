import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
  },
});

function getErrorMessage(error) {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message;
    if (typeof message === "string") {
      return message;
    }
    if (Array.isArray(message) && message.length > 0) {
      return message[0];
    }
  }

  return "Something went wrong. Please try again.";
}

export async function loginUser(credentials) {
  try {
    const response = await API.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

async function findUserByEmail(email) {
  const response = await API.get("/users/search", {
    params: {
      q: email,
    },
  });

  return response.data.users.find(
    (user) => user.email.toLowerCase() === email.toLowerCase(),
  );
}

export async function loginWithEmail(email, password) {
  try {
    const identifier = email.trim();
    let matchedUser = null;
    let username = identifier;

    if (identifier.includes("@")) {
      matchedUser = await findUserByEmail(identifier);

      if (!matchedUser) {
        throw new Error("User not found for this email. Try demo username below.");
      }

      username = matchedUser.username;
    }

    const loginData = await loginUser({ username, password });

    return {
      ...loginData,
      user: matchedUser,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(getErrorMessage(error));
  }
}

export async function getCurrentUser(token) {
  try {
    const response = await API.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function getProducts(page = 1, limit = 10) {
  const skip = (page - 1) * limit;

  try {
    const response = await API.get("/products", {
      params: {
        limit,
        skip,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function getProductById(id) {
  try {
    const response = await API.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export default API;