export const getQueryDb = async (path) => {
  try {
    const resp = await fetch(`http://localhost:8001/api/v1${path}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!resp.ok) return { success: false, data: null };

    const data = await resp.json();
    console.log(data);

    return { success: true, data };
  } catch (error) {
    console.log("There was an error", error);
    return { success: false, data: null };
  }
};

export const cookieTestingFunc = async () => {
  try {
    const resp = await fetch("http://localhost:8001/set-cookie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const response = await resp.json();

    console.log(response);
  } catch (error) {
    console.log("There was an error in testing cookies: ", error);
    return;
  }
};

export const postPutQueryDb = async (path, method, body) => {
  console.log(JSON.stringify(body));
  try {
    const resp = await fetch(`http://localhost:8001/api/v1${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
    });

    const data = await resp.json();
    console.log(data);

    if (!resp.ok) return { success: false, error };
    return { success: true, data };
  } catch (error) {
    console.log(error);
    return { success: false, data: null };
  }
};

export const deleteQueryDb = async (path) => {
  try {
    const resp = await fetch(`http://localhost:8001/api/v1${path}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!resp.ok) return { success: false, data: null };

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, data: null };
  }
};
