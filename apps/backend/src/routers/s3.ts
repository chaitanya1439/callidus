import { Router } from 'express';
import multer from 'multer';
import passport from 'passport';
import { uploadFile, downloadFile, deleteFile } from '../services/s3Service'; // Remove unused getSignedUrl import
import { authMiddleware } from '../middleware/authenticate'; // Adjust the import path to be relative to the current file
import { S3Client } from '@aws-sdk/client-s3'; // Import GetObjectCommand // Import getSignedUrl
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';


const prisma = new PrismaClient();
const router = Router();
const upload = multer();
const JWT_SECRET = process.env.JWT_SECRET!;
// Initialize S3 client
const s3Client = new S3Client({ region: process.env.AWS_REGION });

router.post('/signin', async (req, res) => {
  const { email } = req.body;
  const existinguser = await prisma.user.findFirst({
    where: {
      email,
    }
  })
  if (existinguser) {
    const token = jwt.sign({
      userId: existinguser.id
    }, JWT_SECRET)
    res.json({ token })
  }
});
const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME!;

router.get('/presignedUrl', authMiddleware, async (req, res) => {
  const userId = req.user; // Make sure to extract userId from the request
  const { url, fields } = await createPresignedPost(s3Client, {
    Bucket: BUCKET_NAME,
    Key: `auth/${userId}/${Math.random()}/image.png`,
    Conditions: [
      ['content-length-range', 0, 5 * 1024 * 1024] // 5 MB max
    ],
    Fields: {
      'Content-Type': 'image/png'
    },
    Expires: 3600
  });
  console.log(url,fields)
  res.json({ presignedUrl:url});

})

// Upload file to S3
router.post('/upload', passport.authenticate('jwt', { session: false }), upload.single('file'), uploadFile);

// Download file from S3
router.get('/download/:filePath', passport.authenticate('jwt', { session: false }), downloadFile);

// Delete file from S3
router.delete('/delete/:filePath', passport.authenticate('jwt', { session: false }), deleteFile);

export default router;
