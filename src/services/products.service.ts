export async function getProducts(limit = 40) {
        try {
            const res = await fetch(`${process.env.API_BASE_URL}/api/v1/products?limit=${limit}`,
                {
                    cache: "no-cache"
                }
            );

            if (!res.ok) throw new Error(res.statusText || "Failed to fetch products");
            
            const data = await res.json();
            return data;

        } catch (error) {
            return {error: error as string};
    }

}



export async function getProductsDetails(id: string) {
        try {
            const res = await fetch(`${process.env.API_BASE_URL}/api/v1/products/${id}`,
                {
                    cache: "no-cache"
                }
            );

            if (!res.ok) throw new Error(res.statusText || "Failed to fetch products");
            
            const data = await res.json();
            return data;

        } catch (error) {
            return {error: error as string};
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

