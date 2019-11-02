function pedals(root, args, context) {
  return context.db.user({ id: root.id }).pedals();
}

function presets(root, args, context) {
  return context.db.user({ id: root.id }).presets();
}

module.exports = {
  pedals,
  presets
};
