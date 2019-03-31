function builder(root, args, context) {
  return context.db
    .knob({
      id: root.id
    })
    .builder();
}

function pedal(root, args, context) {
  return context.db
    .knob({
      id: root.id
    })
    .pedal();
}

module.exports = {
  builder,
  pedal
};
