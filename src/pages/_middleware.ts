import { NextResponse } from 'next/server'
import type { NextRequest, NextFetchEvent } from 'next/server'

export async function middleware(req: NextRequest, ev: NextFetchEvent) {

    return NextResponse.next()
}