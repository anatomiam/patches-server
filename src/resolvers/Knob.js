function builder(root, args, context) {
  console.log(root);
  return context.db
    .knob({
      id: root.id
    })
    .builder();
}

module.exports = {
  builder
};
