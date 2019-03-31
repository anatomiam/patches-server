function builder(root, args, context) {
  return context.db
    .knob({
      id: root.id
    })
    .builder();
}

module.exports = {
  builder
};
