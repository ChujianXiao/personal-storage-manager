// gadget.server.js (in your Gadget app)
import { defineFunction } from '@gadget-framework/server';
import { db } from './gadget';

export const registerUser = defineFunction(async (event) => {
  const { email, password, name, gender, age } = event.payload;

  // Check if all required fields are provided
  if (!email || !password || !name || !gender || !age) {
    return {
      statusCode: 400,
      body: { message: "All fields are required" }
    };
  }

  // Create a new user in Gadget database
  try {
    const user = await db.user.create({
      data: {
        email,
        password, // Ensure this is securely hashed in production
        name,
        gender,
        age,
      },
    });

    return {
      statusCode: 200,
      body: { message: "User registered successfully", user },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: { message: "Error registering user", error },
    };
  }
});
