"use server";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: {
    color: string;
    type: string;
  };
  ip: string;
  address: {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    country: string;
  };
  macAddress: string;
  university: string;
  bank: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  };
  company: {
    department: string;
    name: string;
    title: string;
    address: {
      address: string;
      city: string;
      state: string;
      stateCode: string;
      postalCode: string;
      coordinates: {
        lat: number;
        lng: number;
      };
      country: string;
    };
  };
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: {
    coin: string;
    wallet: string;
    network: string;
  };
  role: string;
}

export interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

export interface GetUsersParams {
  limit?: number;
  skip?: number;
  search?: string;
  sortBy?: string;
  order?: "asc" | "desc";
}

export async function getUsers(
  params: GetUsersParams = {}
): Promise<UsersResponse> {
  const { limit = 30, skip = 0, search, sortBy, order = "asc" } = params;

  try {
    let url = `https://dummyjson.com/users`;

    if (search) {
      // Use the search endpoint
      url = `https://dummyjson.com/users/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`;
    } else {
      url = `https://dummyjson.com/users?limit=${limit}&skip=${skip}`;
    }

    // Add sorting if specified
    if (sortBy) {
      url += `&sortBy=${sortBy}&order=${order}`;
    }

    const response = await fetch(url, { cache: "no-store" });

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export async function getUserById(id: number): Promise<User> {
  try {
    const response = await fetch(`https://dummyjson.com/users/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}
