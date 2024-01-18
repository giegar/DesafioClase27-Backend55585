import dotenv from 'dotenv'

dotenv.config()

export default {
    port: process.env.PORT ,

    mongoURL: process.env.MONGO_URL,
    mongoDBName: process.env.MONGO_DB_NAME,

    githubId: process.env.GITHUB_CLIENT_ID,
    githubSecret: process.env.GITHUB_CLIENT_SECRET
}