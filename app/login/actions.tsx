'use client'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { notifications } from '@mantine/notifications'
import { X } from 'lucide-react'

import { createClient } from '@/utils/supabase/supabase-client'

export async function login (formData: FormData) {
  const supabase = await createClient()
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    notifications.show({
      icon: <X/>,
      color: 'red',
      title: 'Validation Error',
      message: 'Email or password were invalid.'
    });
    return { success: false, message: error.message };
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup (formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string
  }
  console.log(data)

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    return { success: false, message: error.message };
  }

  revalidatePath('/', 'layout')
  redirect('/verify')
}
