/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        MAPBOX_ACCESS_TOKEN: 'pk.eyJ1IjoiY2NlZXIiLCJhIjoiY2wxcW9oOWhlMWx1cjNjbzJ0a2xubmU3MiJ9.gVI6tN7x5hDSYkpvwOq0og',
        BASE_URL: 'http://localhost:8000/api/',
    },
};

module.exports = nextConfig;
