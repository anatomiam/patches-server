function knobs(root, args, context) {
  return context.db
    .user({
      id: root.id
    })
    .knobs();
}

module.exports = {
  knobs
};
