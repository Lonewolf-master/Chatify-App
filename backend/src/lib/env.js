import "dotenv/config"

export const ENV = {

    PORT:process.env.PORT,
    MONGO_URL:process.env.MONGO_URL,
    NODE_ENV:process.env.NODE_ENV,
    JWT_SECRET_KEY:process.env.JWT_SECRET_KEY,
    RESEND_API_KEY:process.env.RESEND_API_KEY,
    EMAIL_DEV:process.env.EMAIL_DEV,
    APP_NAME:process.env.APP_NAME,
    URL:process.env.URL,
    CLOUDINARY_CLOUD_NAME:process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY:process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET:process.env.CLOUDINARY_API_SECRET,
    ARCJET_ENV:process.env.ARCJET_ENV,
    ARCJET_KEY:process.env.ARCJET_KEY
}