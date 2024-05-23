"use server";

export async function ThrowError() {
  throw new Error("Product group or category is not set");
}
