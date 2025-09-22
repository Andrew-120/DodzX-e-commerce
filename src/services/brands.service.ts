export async function getBrands(limit = 40) {
        try {
            const res = await fetch(`${process.env.API_BASE_URL}/api/v1/brands?limit=${limit}`,
                {
                    cache: "no-cache"
                }
            );

            if (!res.ok) throw new Error(res.statusText || "Failed to fetch brands");
            
            const data = await res.json();
            return data;

        } catch (error) {
            console.log(error);
            return {error: error as string};
    }

}



export async function getBrandDetails(id: string) {
        try {
            const res = await fetch(`${process.env.API_BASE_URL}/api/v1/brands/${id}`,
                {
                    cache: "no-cache"
                }
            );

            if (!res.ok) throw new Error(res.statusText || "Failed to fetch brands");
            
            const data = await res.json();
            return data;

        } catch (error) {
            console.log(error);
            return {error: error as string};
    }

}


export async function getProductsByBrand(brandId: string, limit = 40) {
  try {
    const res = await fetch(
      `${process.env.API_BASE_URL}/api/v1/products?category[in]=${brandId}&limit=${limit}`,
      { cache: "no-cache" }
    );

    if (!res.ok)
      throw new Error(res.statusText || "Failed to fetch brand products");

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return { error: error as string };
  }
}