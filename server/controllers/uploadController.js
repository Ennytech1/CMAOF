const cloudinary = require('../config/cloudinary');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

// Helper function to stream a memory buffer to Cloudinary
const uploadBufferToCloudinary = (buffer, folder = 'cmaof/uploads') => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'auto',
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(buffer);
  });
};

// @desc    Upload single image to Cloudinary
// @route   POST /api/upload
// @access  Public / Admin
exports.uploadImage = asyncHandler(async (req, res, next) => {
  // Option 1: File uploaded via multipart/form-data
  if (req.file) {
    try {
      const folder = req.body.folder || 'cmaof/uploads';
      const result = await uploadBufferToCloudinary(req.file.buffer, folder);

      return res.status(200).json({
        success: true,
        data: {
          url: result.secure_url,
          public_id: result.public_id,
          format: result.format,
          width: result.width,
          height: result.height,
        },
      });
    } catch (err) {
      console.error('Cloudinary upload error:', err);
      return next(new ErrorResponse(`Image upload failed: ${err.message}`, 500));
    }
  }

  // Option 2: Base64 data string in request body (e.g. data:image/jpeg;base64,...)
  if (req.body && req.body.image) {
    try {
      const folder = req.body.folder || 'cmaof/uploads';
      const result = await cloudinary.uploader.upload(req.body.image, {
        folder,
        resource_type: 'auto',
      });

      return res.status(200).json({
        success: true,
        data: {
          url: result.secure_url,
          public_id: result.public_id,
          format: result.format,
          width: result.width,
          height: result.height,
        },
      });
    } catch (err) {
      console.error('Cloudinary base64 upload error:', err);
      return next(new ErrorResponse(`Image upload failed: ${err.message}`, 500));
    }
  }

  return next(new ErrorResponse('Please provide an image file or base64 image data', 400));
});

// @desc    Upload multiple images to Cloudinary
// @route   POST /api/upload/multiple
// @access  Admin
exports.uploadMultipleImages = asyncHandler(async (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return next(new ErrorResponse('Please upload at least one image file', 400));
  }

  try {
    const folder = req.body.folder || 'cmaof/gallery';
    const uploadPromises = req.files.map((file) => uploadBufferToCloudinary(file.buffer, folder));
    const results = await Promise.all(uploadPromises);

    const data = results.map((r) => ({
      url: r.secure_url,
      public_id: r.public_id,
      format: r.format,
      width: r.width,
      height: r.height,
    }));

    res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (err) {
    console.error('Cloudinary multiple upload error:', err);
    return next(new ErrorResponse(`Multiple upload failed: ${err.message}`, 500));
  }
});

