function pedal(root, args, context) {
  return context.db
    .knob({
      id: root.id
    })
    .pedal();
}

module.exports = {
  pedal
};
