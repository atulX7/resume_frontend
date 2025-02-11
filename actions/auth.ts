'use server'

import { prisma } from "@/lib/prisma"

export async function createOrUpdateUser(userData: {
  email: string
  name?: string | null
  image?: string | null
}) {
  try {
    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: {
        name: userData.name,
        image: userData.image,
      },
      create: {
        email: userData.email,
        name: userData.name,
        image: userData.image,
      },
    })
    return user
  } catch (error) {
    console.error('Error creating/updating user:', error)
    throw new Error('Failed to create or update user')
  }
} 