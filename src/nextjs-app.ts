import next from "next";

export default next({dev: true, hostname: process.env.HOST!, port: process.env.PORT!, dir: './src/nextjs-app'});