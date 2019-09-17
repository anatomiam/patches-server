function knobs(root, args, context) {
  return context.db.pedal({ id: root.id }).knobs();
}

module.exports = {
  knobs
};
