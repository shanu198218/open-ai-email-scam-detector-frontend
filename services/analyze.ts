export const analyzeScamEmail = async (text: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/analyze`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ text }),
    },
  );

  if (!response.ok) {
    const err = await response.json;
    console.log(err);
  }

  return response.json();
};
