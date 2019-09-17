function preset(root, args, context) {
  return context.db.patch({ id: root.id }).preset();
}

function knob(root, args, context) {
  return context.db.patch({ id: root.id }).knob();
}

module.exports = {
  preset,
  knob
};
