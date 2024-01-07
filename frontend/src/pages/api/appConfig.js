const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getProducts = async (lang) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/products/services?lang=${lang}`
    );
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getOneProduct = async (productId, lang) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/products/${productId}?lang=${lang}`
    );
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const reserverProduct = async (reservationData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/reservation/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservationData),
    });
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const createMessage = async (messageData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/contact/addMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageData),
    });
    if (response.status !== 201) throw new Error("Failed to create message");
    return await response.json();
  } catch (error) {
    throw error;
  }
};
