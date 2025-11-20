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

export async function PUT(request, { params }) {
  const { id } = params;
  const body = await request.json();
  const items = readData();
  
  const index = items.findIndex(item => item.id === id);
  if (index === -1) {
    return NextResponse.json({ error: 'Item not found' }, { status: 404 });
  }
  
  items[index] = { ...items[index], text: body.text };
  writeData(items);
  
  return NextResponse.json(items[index]);
}

export async function DELETE(request, { params }) {
  const { id } = params;
  const items = readData();
  
  const filtered = items.filter(item => item.id !== id);
  if (filtered.length === items.length) {
    return NextResponse.json({ error: 'Item not found' }, { status: 404 });
  }
  
  writeData(filtered);
  
  return NextResponse.json({ success: true });
}