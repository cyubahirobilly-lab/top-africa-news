function buildSeo(title, description) {
  return {
    title: title || 'Top Africa News',
    description: description || 'Coverage of the latest stories across Africa.'
  };
}

module.exports = { buildSeo };
