'use server'

import { cookies } from 'next/headers'

type Cookie = {
    name: string
    value: string
}


export async function createCookie(data: Cookie) {
    cookies().set(data.name, data.value)
    // or
    //   cookies().set('name', 'lee', { secure: true })
    //   // or
    //   cookies().set({
    //     name: 'name',
    //     value: 'lee',
    //     httpOnly: true,
    //     path: '/',
    //   })
}