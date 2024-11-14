"use strict";

/** @type {import('next').NextConfig} */
//require('dotenv').config();
var nextConfig = {
  images: {
    domains: ['cdn.myanimelist.net', 'lh3.googleusercontent.com']
  }
};
module.exports = nextConfig;