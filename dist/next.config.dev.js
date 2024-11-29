"use strict";

/** @type {import('next').NextConfig} */
var nextConfig = {
  images: {
    remotePatterns: [{
      protocol: "https",
      hostname: "cdn.myanimelist.net"
    }, {
      protocol: "https",
      hostname: "lh3.googleusercontent.com"
    }]
  }
};
module.exports = nextConfig;