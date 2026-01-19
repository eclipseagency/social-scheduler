import { NextRequest, NextResponse } from "next/server";

// Mock user data
const users = [
  { id: "1", email: "john@example.com", name: "John Doe", password: "hashed_password" },
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, email, password, name } = body;

    if (action === "login") {
      if (!email || !password) {
        return NextResponse.json(
          { success: false, error: "Email and password are required" },
          { status: 400 }
        );
      }

      const user = users.find((u) => u.email === email);
      if (!user) {
        return NextResponse.json(
          { success: false, error: "Invalid credentials" },
          { status: 401 }
        );
      }

      // In a real app, verify password hash here
      return NextResponse.json({
        success: true,
        data: {
          user: { id: user.id, email: user.email, name: user.name },
          token: "mock_jwt_token_" + Date.now(),
        },
      });
    }

    if (action === "register") {
      if (!email || !password || !name) {
        return NextResponse.json(
          { success: false, error: "Email, password, and name are required" },
          { status: 400 }
        );
      }

      const existingUser = users.find((u) => u.email === email);
      if (existingUser) {
        return NextResponse.json(
          { success: false, error: "User already exists" },
          { status: 409 }
        );
      }

      const newUser = {
        id: String(users.length + 1),
        email,
        name,
        password: "hashed_" + password, // In a real app, hash the password
      };

      users.push(newUser);

      return NextResponse.json({
        success: true,
        data: {
          user: { id: newUser.id, email: newUser.email, name: newUser.name },
          token: "mock_jwt_token_" + Date.now(),
        },
      }, { status: 201 });
    }

    return NextResponse.json(
      { success: false, error: "Invalid action. Use 'login' or 'register'" },
      { status: 400 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body" },
      { status: 400 }
    );
  }
}
