function user(root, args, context) {
  return context.db.preset({ id: root.id }).user();
}

function pedal(root, args, context) {
  return context.db.preset({ id: root.id }).pedal();
}

function patches(root, args, context) {
  return context.db.preset({ id: root.id }).patches();
}

module.exports = {
  user,
  pedal,
  patches
};
