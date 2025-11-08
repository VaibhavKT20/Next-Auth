import {connectDB} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest,NextResponse } from 'next/server'

connectDB()

export async function POST(request:NextRequest){
    
}
