export async function getCategories(limit = 40) {
  try {
    const res = await fetch(
      `${process.env.API_BASE_URL}/api/v1/categories?limit=${limit}`,
      { cache: "no-cache" }
    );

    if (!res.ok) throw new Error(res.statusText || "Failed to fetch categories");

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return { error: error as string };
  }
}

export async function getCategoryDetails(id: string) {
  try {
    const res = await fetch(
      `${process.env.API_BASE_URL}/api/v1/categories/${id}`,
      { cache: "no-cache" }
    );

    if (!res.ok) throw new Error(res.statusText || "Failed to fetch category");

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return { error: error as string };
  }
}


export async function getProductsByCategory(categoryId: string, limit = 40) {
  try {
    const res = await fetch(
      `${process.env.API_BASE_URL}/api/v1/products?category[in]=${categoryId}&limit=${limit}`,
      { cache: "no-cache" }
    );

    if (!res.ok)
      throw new Error(res.statusText || "Failed to fetch category products");

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return { error: error as string };
  }
}
