import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFile = path.join(process.cwd(), 'data.json');

function readData() {
  try {
    const data = fs.readFileSync(dataFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function writeData(data) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}

export async function GET() {
  const items = readData();
  return NextResponse.json(items);
}

export async function POST(request) {
  const body = await request.json();
  const items = readData();
  
  const newItem = {
    id: Date.now().toString(),
    text: body.text,
    createdAt: new Date().toISOString(),
  };
  
  items.push(newItem);
  writeData(items);
  
  return NextResponse.json(newItem, { status: 201 });
}