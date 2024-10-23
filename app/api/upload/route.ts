// /app/api/upload/route.ts
import { NextResponse } from 'next/server';
import { Storage } from '@google-cloud/storage';
import { v4 as uuidv4 } from 'uuid';

const storage = new Storage({
  projectId: 'your-project-id',
  keyFilename: './path-to-your-service-account-key.json',
});

const bucketName = 'your-bucket-name';

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const file = form.get('file') as Blob;
    const fileName = `${uuidv4()}-${file.name}`;
    const bucket = storage.bucket(bucketName);
    const fileUpload = bucket.file(fileName);

    await fileUpload.save(Buffer.from(await file.arrayBuffer()));

    return NextResponse.json({ success: true, fileName });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
