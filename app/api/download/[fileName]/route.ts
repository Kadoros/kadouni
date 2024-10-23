// /app/api/download/[fileName]/route.ts
import { NextResponse } from 'next/server';
import { Storage } from '@google-cloud/storage';

const storage = new Storage({
  projectId: 'your-project-id',
  keyFilename: './path-to-your-service-account-key.json',
});

const bucketName = 'your-bucket-name';

export async function GET(req: Request, { params }: { params: { fileName: string } }) {
  try {
    const fileName = params.fileName;
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(fileName);

    const [exists] = await file.exists();
    if (!exists) {
      return NextResponse.json({ success: false, error: 'File not found' });
    }

    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: '03-09-2500',
    });

    return NextResponse.json({ success: true, url });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
