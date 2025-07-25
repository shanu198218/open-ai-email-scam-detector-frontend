export const loginUser = async (email: string, password: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error || "Login failed");
    }

    return data;
  } catch (err: any) {
    throw new Error(err.message || "Something went wrong");
  }
};

export async function registerUser(
  name: string,
  email: string,
  password: string,
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`,
      {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
    );

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data?.error || "Registration failed");
    }

    return await response.json();
  } catch (error: any) {
    throw new Error(
      error.message || "something went wrong during registration ",
    );
  }
}

export const logoutUser = async () => {
  await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
};
