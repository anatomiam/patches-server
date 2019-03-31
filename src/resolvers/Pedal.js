function knobs(root, args, context) {
  return context.db
    .pedal({
      id: root.id
    })
    .knobs();
}

function dimensions(root, args, context) {
  return context.db
    .pedal({
      id: root.id
    })
    .dimensions();
}

module.exports = {
  knobs,
  dimensions
};
