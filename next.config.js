module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['koleeum-aws-bucket.s3.eu-west-3.amazonaws.com'],
  },
  async redirects() {
    return [
      {
        source: '/visite/investisseurs',
        destination: '/investisseurs',
        permanent: true
      },
      {
        source: '/visite/espace-client',
        destination: '/espace-client',
        permanent: true
      }
    ];
  }
}
