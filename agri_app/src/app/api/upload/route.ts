import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { uploadBufferToCloudinary } from "@/lib/cloudinary";
import { getTranslations } from "@/lib/i18n/server";

export async function POST(request: Request) {
  const [{ t }, session] = await Promise.all([
    getTranslations(),
    getServerSession(authOptions),
  ]);

  if (!session?.user) {
    return new NextResponse(t.backend.loginRequired, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return new NextResponse(t.backend.missingFile, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const uploaded = await uploadBufferToCloudinary(buffer, "agri_app");

  return NextResponse.json({ url: uploaded.secure_url });
}
